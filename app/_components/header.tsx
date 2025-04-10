"use client";
import { usePlausible } from "next-plausible";

import { useState } from "react";

import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  NewspaperIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Banner from "components/banner";
import NewsModal from "./NewsModal";
import { NewsItem } from "utils/news";
import MysverseLogo from "./MysverseLogo";
import DarkModeToggle from "./DarkModeToggle";

const navigation = [
  {
    name: "Blog",
    href: "https://blog.mysver.se"
  },
  {
    name: "Sentral",
    href: "https://sentral.mysver.se"
  }
];

const pageNavigation = [
  {
    name: "Brand Kit",
    href: "/brand-kit"
  },
  {
    name: "Projects",
    href: "/#projects"
  },
  {
    name: "Contact",
    href: "/#contact"
  }
];

function NewsButton({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <button onClick={() => setIsOpen(true)} className="mx-3 px-2 xl:mx-0">
      <NewspaperIcon
        onClick={() => setIsOpen(true)}
        className="size-9 stroke-gray-400 transition hover:cursor-pointer hover:opacity-50 xl:stroke-black dark:xl:stroke-white"
      />
    </button>
  );
}

export default function Header({ initialNews }: { initialNews?: NewsItem[] }) {
  const plausible = usePlausible();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Banner />
      <nav
        className="relative flex items-center justify-between p-6 xl:px-8"
        aria-label="Global"
      >
        <div className="flex xl:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition hover:opacity-80">
            <span className="sr-only">MYSverse</span>
            <MysverseLogo className="mx-auto h-12 w-auto fill-[#272727] sm:h-14 dark:fill-white" />
          </Link>
        </div>
        <div className="flex xl:hidden">
          <NewsButton setIsOpen={setNewsOpen} />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden text-gray-800 xl:flex xl:gap-x-12 dark:text-white">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className="text-sm leading-6 font-semibold opacity-100 hover:opacity-50"
              onClick={() =>
                plausible("navClicked", {
                  props: {
                    name: item.name
                  }
                })
              }
            >
              {item.name}
            </Link>
          ))}
          {pageNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm leading-6 font-semibold opacity-100 hover:opacity-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden gap-3 xl:flex xl:flex-1 xl:justify-end">
          <DarkModeToggle />
          <NewsButton setIsOpen={setNewsOpen} />
        </div>
      </nav>
      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 transition sm:max-w-sm sm:ring-1 sm:ring-white/10 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">MYSverse</span>
              <MysverseLogo className="mx-auto h-12 w-auto fill-white" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-800 hover:bg-gray-100 dark:text-white"
                    target="_blank"
                    onClick={() => {
                      plausible("navClicked", {
                        props: {
                          name: item.name
                        }
                      });
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                {pageNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    prefetch={false}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-800 hover:bg-gray-100 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-6 flex flex-row items-center justify-between">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <NewsModal
        isOpen={newsOpen}
        setIsOpen={setNewsOpen}
        initialNews={initialNews}
      />
    </header>
  );
}
