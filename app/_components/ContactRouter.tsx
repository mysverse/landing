"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import * as m from "motion/react-m";
import { AnimatePresence, type Variants } from "motion/react";
import { usePlausible } from "next-plausible";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  enquiryCategories,
  type EnquiryCategory,
  type EnquiryDestination
} from "data/enquiry";

const MotionLink = m.create(Link);

const stepTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2, ease: "easeOut" }
} as const;

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.35 }
  }
};

function DestinationCta({
  destination,
  onNavigate
}: {
  destination: EnquiryDestination;
  onNavigate: (destination: EnquiryDestination) => void;
}) {
  const sharedProps = {
    onClick: () => onNavigate(destination),
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.97 },
    className: clsx(
      "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      destination.primary
        ? "bg-primary text-white shadow-lg hover:brightness-110"
        : "border border-gray-200 bg-white text-gray-900 shadow-sm hover:border-primary dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:border-primary"
    )
  };

  if (destination.href.startsWith("/")) {
    return (
      <MotionLink href={destination.href} {...sharedProps}>
        {destination.label}
        {destination.icon}
      </MotionLink>
    );
  }

  return (
    <m.a
      href={destination.href}
      {...(destination.external && {
        target: "_blank",
        rel: "noopener noreferrer"
      })}
      {...sharedProps}
    >
      {destination.icon}
      {destination.label}
    </m.a>
  );
}

export default function ContactRouter({ className }: { className?: string }) {
  const plausible = usePlausible();
  const headingId = useId();
  const [selected, setSelected] = useState<EnquiryCategory | null>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  const showingResult = selected !== null;

  useEffect(() => {
    if (!hasInteracted.current) return;
    const target = selected ? resultRef.current : optionsRef.current;
    target?.focus({ preventScroll: true });
  }, [selected]);

  function selectCategory(category: EnquiryCategory) {
    hasInteracted.current = true;
    setSelected(category);
    plausible("enquiryCategorySelected", { props: { category: category.id } });
  }

  function goBack() {
    setSelected(null);
  }

  function trackDestination(destination: EnquiryDestination) {
    plausible("contactClicked", {
      props: { type: destination.plausibleType, category: selected?.id }
    });
  }

  return (
    <div
      className={clsx(
        "flex h-full flex-col rounded-2xl bg-white p-10 dark:bg-slate-800",
        className
      )}
    >
      <div aria-live="polite" className="relative grow">
        {/* Always mounted so it defines the card height on both steps */}
        <m.div
          ref={optionsRef}
          tabIndex={-1}
          inert={showingResult}
          animate={
            showingResult
              ? { x: -24, opacity: 0, visibility: "hidden" }
              : { x: 0, opacity: 1, visibility: "visible" }
          }
          transition={stepTransition}
          className="outline-none"
        >
          <h3
            id={headingId}
            className="text-black-100 text-base leading-7 font-semibold dark:text-white"
          >
            What can we help you with?
          </h3>
          <h4 className="text-black-100 text-sm leading-7 font-normal opacity-80 dark:text-white">
            Pick a topic and we&apos;ll point you to the right channel.
          </h4>
          <m.ul
            aria-labelledby={headingId}
            className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {enquiryCategories.map((category, index) => (
              <m.li
                key={category.id}
                variants={itemVariants}
                className={clsx(
                  index === enquiryCategories.length - 1 && "sm:col-span-2"
                )}
              >
                <m.button
                  type="button"
                  onClick={() => selectCategory(category)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group hover:border-primary focus-visible:outline-primary dark:hover:border-primary flex h-full w-full items-center gap-x-3 rounded-xl border border-gray-100 bg-gray-50 p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-white/10 dark:bg-white/5"
                >
                  <span className="bg-primary/10 text-primary flex size-9 flex-none items-center justify-center rounded-lg">
                    {category.icon}
                  </span>
                  <span className="flex-auto">
                    <span className="text-black-100 block text-sm font-semibold dark:text-white">
                      {category.label}
                    </span>
                    <span className="block text-xs leading-5 text-gray-600 dark:text-white/60">
                      {category.description}
                    </span>
                  </span>
                  <ChevronRightIcon className="size-5 flex-none text-gray-400 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none dark:text-white/40" />
                </m.button>
              </m.li>
            ))}
          </m.ul>
        </m.div>
        <AnimatePresence>
          {selected && (
            <m.div
              key={selected.id}
              ref={resultRef}
              tabIndex={-1}
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0, pointerEvents: "none" }}
              transition={stepTransition}
              onKeyDown={(event) => {
                if (event.key === "Escape") goBack();
              }}
              className="absolute inset-0 outline-none"
            >
              <button
                type="button"
                onClick={goBack}
                className="hover:text-primary focus-visible:outline-primary inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-white/60 dark:hover:text-white"
              >
                <ArrowLeftIcon className="size-4" />
                Back
              </button>
              <h3 className="text-black-100 mt-4 text-base leading-7 font-semibold dark:text-white">
                {selected.resultHeading}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white/70">
                {selected.resultBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {selected.destinations.map((destination) => (
                  <DestinationCta
                    key={destination.label}
                    destination={destination}
                    onNavigate={trackDestination}
                  />
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-6 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500 dark:border-white/10 dark:text-white/60">
        MYSverse is run entirely by volunteers and we get a lot of messages. We
        read everything, but replies can take a few days, so serious enquiries
        are best sent by email.
      </p>
    </div>
  );
}
