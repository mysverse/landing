"use client";

import type { WheelEvent } from "react";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { NewspaperIcon } from "@heroicons/react/24/outline";

interface NewsItem {
  Name: string;
  Image: string;
  Url: string;
  Content?: string;
  AspectRatio?: number;
}

interface NewsResponse {
  NotifyCount: number;
  Timestamp: string;
  LastUpdated: string;
  Notify: boolean;
  Announcements: any[];
  News: NewsItem[];
  Event: {
    Name: string;
    Date: string;
    BackgroundImage: string;
    EventImage: string;
  };
}

export default function NewsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [deck, setDeck] = useState<NewsItem[]>([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch("https://mysverse-news.yan3321.workers.dev/")
      .then((res) => res.json())
      .then((data: NewsResponse) => {
        setDeck(data.News);
        // setIsOpen(true); // Automatically open modal after fetching
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Handle mouse wheel (desktop)
  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    // Scroll down triggers the top card to animate out
    if (event.deltaY > 0 && !animating && deck.length > 0) {
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
    <>
      {/* Optional manual trigger */}
      <button onClick={() => setIsOpen(true)} className="px-2 lg:mx-0 mx-3">
        <NewspaperIcon
          onClick={() => setIsOpen(true)}
          className="lg:stroke-black stroke-black/30 transition hover:opacity-50 size-9"
        />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          {/* Overlay (semi-transparent) */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>

          {/* Center the deck horizontally & vertically */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* 
                Use Dialog.Panel so that clicking outside this panel
                automatically closes the dialog 
              */}
              <Dialog.Panel
                // Catch wheel events here
                onWheel={handleWheel}
                className="relative h-[70vh] max-h-[90vh] w-[90vw] max-w-3xl overflow-hidden"
              >
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
                        // For mobile "swipe" or "drag" support:
                        drag={index === 0 ? "y" : false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={(e, info) => {
                          // If user drags the top card down far enough, animate out
                          if (info.offset.y > DRAG_THRESHOLD && !animating) {
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
                            width={600} // use the actual image width
                            height={200} // use the actual image height
                            className="rounded-xl shadow-lg"
                            unoptimized
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
