"use client";
import { usePlausible } from "next-plausible";
import { useState, Fragment } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import {
  Bars3Icon,
  NewspaperIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "i18n/navigation";
import Link from "app/_components/ui/TransitionLink";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "i18n/routing";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/react";
import {
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/20/solid";
import clsx from "clsx";

import NewsModal from "./NewsModal";
import { springSnappy } from "app/_components/Motion/transitions";
import { NewsFeed } from "utils/news";
import { useNewsSeen } from "hooks/useNewsSeen";
import MysverseLogo from "./MysverseLogo";
import MYSverseLogoWhite from "public/img/MYSverse_White.svg";
import DarkModeToggle from "./DarkModeToggle";
import { isExternalUrl } from "utils/isExternalUrl";

interface NavigationItem {
  name: string;
  href: string;
  prefetch?: boolean;
  local?: boolean;
}

const navigation: NavigationItem[] = [
  {
    name: "Blog",
    href: "https://blog.mysver.se"
  },
  {
    name: "Wiki",
    href: "https://mys.wiki"
  },
  {
    name: "Sentral",
    href: "https://sentral.mysver.se"
  },
  // Both are prerendered, and the payload needs to be warm or the view
  // transition holds a frozen snapshot while it fetches.
  {
    name: "Brand Kit",
    href: "/brand-kit"
  },
  {
    name: "Contribute",
    href: "/contribute"
  },
  {
    name: "Projects",
    href: "/#projects"
  },
  {
    name: "Outreach",
    href: "/#outreach"
  },
  {
    name: "Contact",
    href: "/#contact"
  }
].map((item) => ({
  ...item,
  local: !isExternalUrl(item.href)
}));

const localeNames = {
  en: "English",
  ms: "Bahasa Malaysia",
  zh: "中文",
  ta: "தமிழ்"
};

function LanguageSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <MenuButton className="text-strong focus-visible:outline-primary inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg p-2 transition hover:bg-black/20 focus-visible:outline-2 dark:hover:bg-white/20">
            <GlobeAltIcon className="size-6" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide uppercase">
              {currentLocale}
            </span>
          </MenuButton>

          <AnimatePresence>
            {open && (
              <MenuItems static as={Fragment}>
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={springSnappy}
                  className={clsx(
                    "bg-surface-card absolute z-50 mt-2 w-44 rounded-xl p-1 shadow-lg ring-1 ring-black/5 dark:ring-white/5",
                    align === "right"
                      ? "right-0 origin-top-right"
                      : "left-0 origin-top-left"
                  )}
                >
                  {routing.locales.map((locale) => (
                    <MenuItem key={locale}>
                      <button
                        type="button"
                        onClick={() => handleLocaleChange(locale)}
                        className={clsx(
                          "group flex w-full items-center rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                          locale === currentLocale
                            ? "bg-surface-raised text-strong"
                            : "text-body hover:bg-surface-raised hover:text-strong"
                        )}
                      >
                        {localeNames[locale as keyof typeof localeNames]}
                      </button>
                    </MenuItem>
                  ))}
                </m.div>
              </MenuItems>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}

function NewsButton({
  onOpen,
  unreadCount
}: {
  onOpen: () => void;
  unreadCount: number;
}) {
  const t = useTranslations("Header");
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={
        unreadCount > 0
          ? t("news.buttonWithCount", { count: unreadCount })
          : t("sr.news")
      }
      className="focus-visible:outline-primary relative mx-3 rounded-lg px-2 focus-visible:outline-2"
    >
      <NewspaperIcon
        aria-hidden="true"
        className="size-9 stroke-gray-400 transition hover:cursor-pointer hover:opacity-50 xl:stroke-black dark:xl:stroke-white"
      />
      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          className="bg-primary absolute top-0 right-0 min-w-5 rounded-full px-1.5 text-[10px]/5 font-semibold text-white"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}

export default function Header({ news }: { news: NewsFeed }) {
  const plausible = usePlausible();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const t = useTranslations("Header");
  const { unread, markSeen } = useNewsSeen(news.updatedAt, news.notify);

  const hasNews = news.items.length > 0;
  const unreadCount = unread ? news.notifyCount : 0;
  const openNews = () => {
    markSeen();
    setNewsOpen(true);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      {/* <Banner /> */}
      <nav
        className="relative flex items-center justify-between p-6 xl:px-8"
        aria-label={t("sr.primaryNav")}
      >
        <div className="flex xl:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition hover:opacity-80">
            <span className="sr-only">{t("sr.logo")}</span>
            <MysverseLogo className="mx-auto h-12 w-auto fill-[#272727] sm:h-14 dark:hidden" />
            <MYSverseLogoWhite className="mx-auto hidden h-11 w-auto fill-white px-1 py-0.5 sm:h-12.5 dark:block" />
          </Link>
        </div>
        <div className="flex xl:hidden">
          {hasNews && (
            <NewsButton onOpen={openNews} unreadCount={unreadCount} />
          )}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">{t("sr.openMenu")}</span>
            <Bars3Icon className="size-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden text-gray-800 xl:flex xl:gap-x-12 dark:text-white">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-visible:outline-primary inline-flex items-center gap-1.5 rounded-sm text-sm leading-6 font-semibold transition hover:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"
              target={item.local ? undefined : "_blank"}
              prefetch={item.prefetch}
              onClick={
                !item.local || item.name === "Contribute"
                  ? () =>
                      plausible("navClicked", {
                        props: {
                          name: item.name
                        }
                      })
                  : undefined
              }
            >
              {t(`nav.${item.name}`)}{" "}
              {!item.local && (
                <ArrowTopRightOnSquareIcon className="inline size-4" />
              )}
            </Link>
          ))}
        </div>
        <div className="hidden gap-3 xl:flex xl:flex-1 xl:justify-end">
          <LanguageSwitcher />
          <DarkModeToggle />
          {hasNews && (
            <NewsButton onOpen={openNews} unreadCount={unreadCount} />
          )}
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            static
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            aria-label={t("sr.mobileNav")}
            className="relative z-50 xl:hidden"
          >
            <DialogPanel as={Fragment}>
              <m.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-card fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="-m-1.5 p-1.5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t("sr.logo")}</span>
                    <MysverseLogo className="mx-auto h-11 w-auto fill-gray-800 dark:hidden" />
                    <MYSverseLogoWhite className="mx-auto hidden h-10 w-auto fill-white dark:inline-block" />
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-400 dark:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">{t("sr.closeMenu")}</span>
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/25">
                    <nav
                      className="space-y-2 py-6"
                      aria-label={t("sr.mobileNav")}
                    >
                      {navigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-strong hover:bg-surface-raised -mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold"
                          target={item.local ? undefined : "_blank"}
                          prefetch={item.prefetch}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            if (!item.local) {
                              plausible("navClicked", {
                                props: {
                                  name: item.name
                                }
                              });
                            }
                          }}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {t(`nav.${item.name}`)}{" "}
                            {!item.local && (
                              <ArrowTopRightOnSquareIcon className="inline size-4" />
                            )}
                          </span>
                        </Link>
                      ))}
                      <div className="mt-6 flex flex-row items-center justify-between gap-4">
                        <LanguageSwitcher align="left" />
                        <DarkModeToggle />
                      </div>
                    </nav>
                  </div>
                </div>
              </m.div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
      <NewsModal
        isOpen={newsOpen}
        setIsOpen={setNewsOpen}
        items={news.items}
        updatedAt={news.updatedAt}
      />
    </header>
  );
}
