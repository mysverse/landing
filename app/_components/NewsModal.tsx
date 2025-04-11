"use client";

import type { WheelEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import * as m from "motion/react-m";

import type { NewsItem, NewsResponse } from "utils/news";
import { getNews } from "utils/news";
import { AnimatePresence } from "motion/react";

export default function NewsModal({
  initialNews,
  isOpen,
  setIsOpen
}: {
  initialNews?: NewsItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [deck, setDeck] = useState<NewsItem[]>(initialNews ?? []);
  const [animating, setAnimating] = useState(false);

  // Using a ref to accumulate scroll delta values
  const scrollAccumulator = useRef(0);
  const SCROLL_THRESHOLD = 50; // Adjust this value as needed

  useEffect(() => {
    getNews()
      .then((data: NewsResponse) => {
        setDeck(data.News);
        // setIsOpen(true); // Automatically open modal after fetching
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Modified handleWheel to accumulate delta values
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    scrollAccumulator.current += event.deltaY;

    if (
      Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD &&
      !animating &&
      deck.length > 0
    ) {
      setAnimating(true);
      // Reset the accumulator after triggering the animation
      scrollAccumulator.current = 0;
    }
  };

  // Constants for the stacked card effect
  const CARD_OFFSET = 10; // px: vertical offset per card
  const SCALE_FACTOR = 0.02; // scale reduction per card
  const ANIMATION_Y = -80; // px: how far the top card moves when animating out
  const DRAG_THRESHOLD = 50; // px: how far you must drag down on mobile to cycle
  const OPACITY_STEP = 0.4; // opacity reduction per card after the first

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="relative z-10"
          open={isOpen}
          static
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay (semi-transparent) */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="fixed inset-0 backdrop-blur-lg"
            aria-hidden="true"
          />
          {/* Center the deck horizontally & vertically */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel
              as={m.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onWheel={handleWheel}
              className="relative h-[70vh] max-h-[90vh] w-[90vw] max-w-3xl overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-black/20 p-2 backdrop-blur-sm transition-colors hover:cursor-pointer hover:bg-black/40"
                aria-label="Close"
              >
                <XMarkIcon className="size-8 text-white" />
              </button>

              <AnimatePresence initial={false}>
                {deck.slice(0, 3).map((card, index) => {
                  const offsetY = index * CARD_OFFSET;
                  const scale = 1 - index * SCALE_FACTOR;
                  const baseOpacity =
                    index === 0 ? 1 : 1 - index * OPACITY_STEP;
                  const animateProps =
                    index === 0 && animating
                      ? { y: ANIMATION_Y, opacity: 0 }
                      : { y: offsetY, scale, opacity: baseOpacity };

                  return (
                    <m.div
                      key={card.Name}
                      layout
                      initial={false}
                      animate={animateProps}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      onAnimationComplete={() => {
                        if (index === 0 && animating) {
                          setDeck((prev) => {
                            const [first, ...rest] = prev;
                            return [...rest, first];
                          });
                          setAnimating(false);
                        }
                      }}
                      drag={index === 0 ? true : false}
                      dragConstraints={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                      }}
                      onDragEnd={(e, info) => {
                        const totalOffset = Math.sqrt(
                          Math.pow(info.offset.x, 2) +
                            Math.pow(info.offset.y, 2)
                        );
                        if (totalOffset > DRAG_THRESHOLD && !animating) {
                          setAnimating(true);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ zIndex: deck.length - index }}
                    >
                      <div className="relative">
                        <Image
                          src={card.Url}
                          alt={card.Name}
                          width={1920}
                          height={1080}
                          className="rounded-xl shadow-lg"
                        />
                      </div>
                    </m.div>
                  );
                })}
              </AnimatePresence>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
