"use client";

import type { WheelEvent } from "react";
import { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";
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

  useEffect(() => {
    getNews()
      .then((data: NewsResponse) => {
        setDeck(data.News);
        // setIsOpen(true); // Automatically open modal after fetching
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Handle mouse wheel (desktop)
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    // Scroll in any direction triggers the top card to animate out
    if (Math.abs(event.deltaY) > 0 && !animating && deck.length > 0) {
      setAnimating(true);
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
            {/* 
                Use DialogPanel so that clicking outside this panel
                automatically closes the dialog 
              */}
            <DialogPanel
              // Catch wheel events here
              onWheel={handleWheel}
              className="relative h-[70vh] max-h-[90vh] w-[90vw] max-w-3xl overflow-hidden"
            >
              {/* Close button - repositioned to bottom center */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-black/20 p-2 backdrop-blur-sm transition-colors hover:cursor-pointer hover:bg-black/40"
                aria-label="Close"
              >
                <XMarkIcon className="size-8 text-white" />
              </button>

              <AnimatePresence initial={false}>
                {deck.slice(0, 3).map((card, index) => {
                  // Each card's default offset & scale
                  const offsetY = index * CARD_OFFSET;
                  const scale = 1 - index * SCALE_FACTOR;

                  // Progressive transparency for cards after the first one
                  const baseOpacity =
                    index === 0 ? 1 : 1 - index * OPACITY_STEP;

                  // If top card is animating, it slides up & fades out
                  const animateProps =
                    index === 0 && animating
                      ? { y: ANIMATION_Y, opacity: 0 }
                      : { y: offsetY, scale, opacity: baseOpacity };

                  return (
                    <motion.div
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
                        // When the top card finishes animating out, move it to the back
                        if (index === 0 && animating) {
                          setDeck((prev) => {
                            const [first, ...rest] = prev;
                            return [...rest, first];
                          });
                          setAnimating(false);
                        }
                      }}
                      // Allow dragging in any direction, not just vertical
                      drag={index === 0 ? true : false}
                      dragConstraints={{
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                      }}
                      onDragEnd={(e, info) => {
                        // Detect swipes in any direction by checking both x and y offsets
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
                      {/* 
                          Each card is a full bounding box, with the image 
                          contained so it won't be cut off. Different aspect 
                          ratios will letterbox/pillarbox automatically. 
                        */}
                      <div className="relative">
                        <Image
                          src={card.Url}
                          alt={card.Name}
                          width={1920} // use the actual image width
                          height={1080} // use the actual image height
                          className="rounded-xl shadow-lg"
                          unoptimized
                        />
                      </div>
                    </motion.div>
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
