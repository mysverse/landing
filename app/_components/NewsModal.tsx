"use client";

import type { WheelEvent } from "react";
import { useState, useEffect, useRef, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import type { NewsItem, NewsResponse } from "utils/news";
import { getNews } from "utils/news";

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
    <Transition show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        {/* Overlay (semi-transparent) */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-lg" aria-hidden="true" />
        </TransitionChild>

        {/* Center the deck horizontally & vertically */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
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
                          unoptimized
                        />
                      </div>
                    </m.div>
                  );
                })}
              </AnimatePresence>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
