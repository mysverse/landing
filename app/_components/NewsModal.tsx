"use client";

import type { KeyboardEvent, ReactNode, WheelEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  NewspaperIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";
import type { PanInfo } from "motion/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import type { NewsItem } from "utils/news";
import { cardSurface } from "app/_components/ui/Card";
import {
  deckVariants,
  deckVariantsReduced
} from "app/_components/Motion/transitions";
import { LocalTime } from "./LocalTime";

/** Fallback for the ~70% of payload items that don't declare one; they're all
 * 16:9 banners in practice. */
const DEFAULT_ASPECT_RATIO = 16 / 9;

/** px of drag distance (plus velocity) needed to commit to a card change. */
const SWIPE_COMMIT = 60;
/** How much a fast flick counts for: 400px/s ≈ 100px of virtual travel. */
const SWIPE_VELOCITY_WEIGHT = 0.25;

/** px of accumulated wheel delta that commits one step. */
const WHEEL_COMMIT = 60;
/** ms of quiet that ends a wheel gesture. */
const WHEEL_DECAY = 180;
/** ms to ignore the wheel after a commit. */
const WHEEL_LOCK = 420;
/** |delta| under this is trackpad/momentum rather than a discrete wheel notch. */
const WHEEL_FINE_DELTA = 30;

export default function NewsModal({
  items,
  updatedAt,
  isOpen,
  setIsOpen
}: {
  items: NewsItem[];
  updatedAt: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        // NewsDialog holds all deck state and only exists while open, so the
        // deck resets on open without an effect and without flickering during
        // the exit animation.
        <NewsDialog
          items={items}
          updatedAt={updatedAt}
          onClose={() => setIsOpen(false)}
        />
      )}
    </AnimatePresence>
  );
}

function NewsDialog({
  items,
  updatedAt,
  onClose
}: {
  items: NewsItem[];
  updatedAt: string | null;
  onClose: () => void;
}) {
  const t = useTranslations("Header");
  const reduceMotion = useReducedMotion();

  const count = items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback(
    (delta: 1 | -1) => {
      if (count < 2) return;
      setDirection(delta);
      setIndex((current) => (current + delta + count) % count);
    },
    [count]
  );

  const goTo = useCallback((next: number) => {
    setIndex((current) => {
      if (next === current) return current;
      setDirection(next > current ? 1 : -1);
      return next;
    });
  }, []);

  // --- wheel: signed, with a decay window and a refractory lock -------------
  const wheelAccumulator = useRef(0);
  const wheelLastEvent = useRef(0);
  const wheelLockedUntil = useRef(0);
  const wheelLastDirection = useRef(0);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (count < 2) return;

    // React listens for wheel passively, so preventDefault() here would be a
    // no-op that logs a warning. Headless UI already locks the page scroll.
    const unit =
      event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1; // lines / pages / px
    const raw =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    const delta = raw * unit;
    const now = performance.now();

    if (now < wheelLockedUntil.current) {
      // A reversal is unambiguously new intent — momentum never turns around —
      // so it breaks the lock. Without this, scrolling back within the
      // refractory window is swallowed and the deck only moves one way, which
      // is the bug this rewrite exists to fix.
      if (Math.sign(delta) !== wheelLastDirection.current) {
        wheelLockedUntil.current = 0;
        wheelAccumulator.current = 0;
      } else {
        // Trackpad momentum keeps feeding fine deltas after the flick; re-arming
        // the lock keeps one flick to one card. Coarse notches don't re-arm, so
        // a spun mouse wheel still chains.
        if (Math.abs(delta) < WHEEL_FINE_DELTA) {
          wheelLockedUntil.current = now + WHEEL_LOCK;
        }
        wheelAccumulator.current = 0;
        wheelLastEvent.current = now;
        return;
      }
    }

    if (now - wheelLastEvent.current > WHEEL_DECAY) wheelAccumulator.current = 0;
    if (Math.sign(delta) !== Math.sign(wheelAccumulator.current)) {
      wheelAccumulator.current = 0;
    }
    wheelLastEvent.current = now;
    wheelAccumulator.current += delta;

    if (Math.abs(wheelAccumulator.current) < WHEEL_COMMIT) return;
    const commitDirection = wheelAccumulator.current > 0 ? 1 : -1;
    go(commitDirection);
    wheelAccumulator.current = 0;
    wheelLastDirection.current = commitDirection;
    wheelLockedUntil.current = now + WHEEL_LOCK;
  };

  // --- drag: dominant axis, up or left = next ------------------------------
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const horizontal = Math.abs(info.offset.x) > Math.abs(info.offset.y);
    const offset = horizontal ? info.offset.x : info.offset.y;
    const velocity = horizontal ? info.velocity.x : info.velocity.y;
    const power = offset + velocity * SWIPE_VELOCITY_WEIGHT;

    if (power <= -SWIPE_COMMIT) go(1);
    else if (power >= SWIPE_COMMIT) go(-1);
    // Otherwise dragSnapToOrigin springs it back on its own.
  };

  // --- keyboard: on the Dialog root, so it works wherever focus sits --------
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // preventDefault doesn't stop bubbling, so this is how a descendant that
    // owns an arrow key (none today, but the panel is a natural place to grow
    // one) opts out.
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (count < 2) return;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
        go(1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        go(-1);
        break;
      case "Home":
        goTo(0);
        break;
      case "End":
        goTo(count - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const item = items[index];
  const activeRatio = item?.AspectRatio ?? DEFAULT_ASPECT_RATIO;

  // Neighbours rendered behind the top card: keeps the deck silhouette and
  // warms the browser cache in both directions. The opacity-0 entry is the
  // backward one — Chrome loads it, unlike display:none.
  const plates = (
    count > 1
      ? [
          {
            at: (index + 1) % count,
            className: "translate-y-3 scale-[0.97] opacity-60"
          },
          {
            at: (index + 2) % count,
            className: "translate-y-6 scale-[0.94] opacity-30"
          },
          { at: (index - 1 + count) % count, className: "opacity-0" }
        ]
      : []
  ).filter(
    // At count === 2 all three collapse onto the same item.
    (plate, i, all) => all.findIndex((other) => other.at === plate.at) === i
  );

  return (
    <Dialog
      as="div"
      static
      open
      onClose={onClose}
      onKeyDown={handleKeyDown}
      // The header is z-50 and this used to be z-10, so it painted over the modal.
      className="relative z-100"
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-lg"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          as={m.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onWheel={handleWheel}
          role="group"
          aria-roledescription="carousel"
          className={clsx(
            cardSurface,
            "flex max-h-[88svh] w-[92vw] max-w-3xl flex-col overflow-hidden p-5 shadow-2xl sm:p-6"
          )}
        >
          <div className="flex items-center gap-3">
            <NewspaperIcon
              className="text-primary size-6 shrink-0"
              aria-hidden="true"
            />
            <DialogTitle className="heading-4">{t("news.title")}</DialogTitle>
            <div className="ml-auto flex items-center gap-3">
              {updatedAt && (
                <span className="caption hidden sm:inline">
                  {t("news.updated")}{" "}
                  <LocalTime date={new Date(updatedAt)} type="date" />
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={t("sr.close")}
                className="text-muted hover:bg-surface-raised hover:text-strong focus-visible:outline-primary rounded-lg p-2 transition-colors hover:cursor-pointer focus-visible:outline-2"
              >
                <XMarkIcon className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          {count === 0 ? (
            <p className="body-base my-10 text-center">{t("news.empty")}</p>
          ) : (
            <>
              <div className="relative mt-5 flex h-[min(46vh,24rem)] w-full items-center justify-center">
                <div aria-hidden="true">
                  {plates.map((plate) => (
                    <div
                      key={plate.at}
                      className={clsx(
                        "absolute inset-0 flex items-center justify-center",
                        plate.className
                      )}
                    >
                      {/* Deliberately the *active* card's ratio, not their own:
                          these exist for the deck silhouette, and a neighbour
                          that's wider than the top card would bulge out either
                          side and read as a frame rather than a stack. */}
                      <MediaPlate
                        item={items[plate.at]}
                        alt=""
                        ratio={activeRatio}
                      />
                    </div>
                  ))}
                </div>

                <AnimatePresence initial={false} custom={direction}>
                  <m.div
                    key={index}
                    custom={direction}
                    variants={reduceMotion ? deckVariantsReduced : deckVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={count > 1}
                    dragSnapToOrigin
                    dragDirectionLock
                    onDragEnd={handleDragEnd}
                    style={{ zIndex: 2 }}
                    className={clsx(
                      "absolute inset-0 flex items-center justify-center",
                      count > 1 && "cursor-grab active:cursor-grabbing"
                    )}
                  >
                    <MediaPlate
                      item={item}
                      alt={item.Name}
                      ratio={activeRatio}
                      priority
                    />
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Outside AnimatePresence: swaps synchronously with the index, so
                  there's never a frame with two overlapping captions and the
                  live region survives navigation. Also has to be outside the
                  draggable card, which sets touch-action: none. */}
              {/* Fixed height, contents centred: line-clamp caps what can go in
                  and min-h holds the floor, so the controls below never move
                  between an item with body copy and one without — and a
                  title-only item sits centred rather than leaving a void. */}
              <div
                className="mt-5 flex min-h-34 flex-col justify-center text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="sr-only">
                  {t("news.position", { current: index + 1, total: count })}
                </span>
                <h3 className="heading-4 line-clamp-2 text-balance">
                  {item.Name}
                </h3>
                {item.Content && (
                  <p className="body-sm mt-1 line-clamp-3 text-pretty">
                    {item.Content}
                  </p>
                )}
              </div>

              {count > 1 && (
                <div className="mt-2 flex items-center justify-center gap-3">
                  <DeckButton label={t("news.prev")} onClick={() => go(-1)}>
                    <ChevronLeftIcon className="size-5" aria-hidden="true" />
                  </DeckButton>

                  <div
                    role="group"
                    aria-label={t("news.pick")}
                    className="flex items-center gap-1.5"
                  >
                    {items.map((dot, i) => (
                      <button
                        key={`${dot.Url}#${i}`}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={t("news.goTo", { index: i + 1 })}
                        aria-current={i === index ? "true" : undefined}
                        className="focus-visible:outline-primary group rounded-full p-1.5 hover:cursor-pointer focus-visible:outline-2"
                      >
                        <span
                          className={clsx(
                            "block size-2 rounded-full transition-colors",
                            i === index
                              ? "bg-primary"
                              : "bg-edge group-hover:bg-muted"
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  <DeckButton label={t("news.next")} onClick={() => go(1)}>
                    <ChevronRightIcon className="size-5" aria-hidden="true" />
                  </DeckButton>

                  <p className="caption ml-1 tabular-nums" aria-hidden="true">
                    {index + 1} / {count}
                  </p>
                </div>
              )}
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function MediaPlate({
  item,
  alt,
  ratio,
  priority
}: {
  item: NewsItem;
  alt: string;
  ratio: number;
  priority?: boolean;
}) {
  return (
    // Height is the definite axis, so width follows the ratio: a square item
    // renders as a real square beside a 16:9 one, and the panel never resizes.
    <div
      className="bg-surface-raised relative h-full w-auto max-w-full overflow-hidden rounded-2xl shadow-xl"
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={item.Url}
        alt={alt}
        fill
        priority={priority}
        // The Cloudflare loader is width-only, so sizes is the only lever on
        // how much image actually gets fetched.
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 768px"
        className="object-contain"
        draggable={false}
      />
    </div>
  );
}

function DeckButton({
  label,
  onClick,
  children
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-edge text-body hover:border-primary hover:text-strong focus-visible:outline-primary rounded-full border p-2 transition-colors hover:cursor-pointer focus-visible:outline-2"
    >
      {children}
    </button>
  );
}
