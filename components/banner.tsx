"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import useDismissableBanner from "./useDismissableBanner";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import clsx from "clsx";

export default function Banner() {
  const { isVisible, isLoading, dismissBanner } =
    useDismissableBanner("Merdeka24");

  return (
    <Transition show={isVisible && !isLoading}>
      <div
        className={clsx(
          "transition data-[transition]:duration-700",
          "data-[enter]:duration-700 data-[enter]:delay-1000",
          "data-[closed]:opacity-0 data-[closed]:translate-y-36 data-[closed]:scale-80",
          " pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8"
        )}
      >
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-gradient-to-r from-blue-800  to-yellow-600 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm leading-6 text-white">
            <Link href="https://www.roblox.com/games/977876625" target="_blank">
              <strong className="font-semibold">Merdeka &apos;24</strong>
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline h-0.5 w-0.5 fill-current "
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              Join us virtually on Roblox to celebrate 67 years of Malaysian
              independence, starting 12pm MYT!&nbsp;
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
      </div>
    </Transition>
  );
}
