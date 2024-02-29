"use client";
import { usePlausible } from "next-plausible";

import { useState } from "react";
import MysverseLogo from "public/img/mysverse_mono.svg";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import Banner from "components/banner";

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
    name: "Projects",
    href: "#projects"
  },
  {
    name: "Contact",
    href: "#contact"
  }
];

export default function Header() {
  const plausible = usePlausible();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* <Banner /> */}
      <nav
        className="flex items-center justify-between p-6 xl:px-8"
        aria-label="Global"
      >
        <div className="flex xl:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">MYSverse</span>
            <MysverseLogo
              alt="MYSverse logo"
              className="mx-auto h-10 w-auto fill-white sm:h-11"
            />
          </a>
        </div>
        <div className="flex xl:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden xl:flex xl:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white opacity-100 hover:opacity-50"
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
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white opacity-100 hover:opacity-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden xl:flex xl:flex-1 xl:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
          Log in <span aria-hidden="true">&rarr;</span>
        </a> */}
        </div>
      </nav>
      <Dialog
        as="div"
        className="xl:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MYSverse</span>
              <MysverseLogo
                alt="MYSverse logo"
                className="mx-auto h-10 w-auto fill-white"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
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
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
              >
                Log in
              </a>
            </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
