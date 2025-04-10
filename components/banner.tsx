"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import useDismissableBanner from "./useDismissableBanner";
import Link from "next/link";
import * as motion from "motion/react-m";
import { AnimatePresence } from "motion/react";

const enabled = false;

export default function Banner() {
  const { isVisible, dismissBanner } =
    useDismissableBanner("festive-sale-20242");

  if (!enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, translateY: 36 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 36 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
        >
          <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-linear-to-r from-red-600 to-red-500 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
            <p className="text-sm leading-6 text-white">
              <Link
                href="https://blog.mysver.se/festive-sale-2024/"
                target="_blank"
              >
                <strong className="font-semibold">
                  Join our Festive Sale!
                </strong>
                <svg
                  viewBox="0 0 2 2"
                  aria-hidden="true"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                >
                  <circle r={1} cx={1} cy={1} />
                </svg>
                Up to <b>50% discounts</b> on game passes through <b>Dec 31</b>{" "}
                &nbsp;
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
            <button
              type="button"
              className="-m-1.5 flex-none p-1.5"
              onClick={dismissBanner}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
