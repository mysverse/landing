import "../styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";

import PlausibleProvider from "next-plausible";
import { Metadata } from "next";
import { env } from "process";

const APP_NAME = "MYSverse";
const APP_DEFAULT_TITLE = "MYSverse";
const APP_TITLE_TEMPLATE = "%s - MYSverse";
const APP_DESCRIPTION =
  "The original Malaysian metaverse project and roleplay community. Your gateway into our unique brand of fun, culture and education like no other.";

export const metadata: Metadata = {
  metadataBase: env.CF_PAGES_URL ? new URL(env.CF_PAGES_URL) : undefined,
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

import { Public_Sans } from "next/font/google";
import { PropsWithChildren } from "react";
import Header from "./_components/header";
import { getNews } from "utils/news";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { socials } from "data/socials";
import IntersectionTransition from "./_components/IntersectionTransition";
import PlausibleWrapper from "./_components/PlausibleWrapper";
import { ThemeProvider } from "next-themes";
import LazyMotionLayout from "./_components/Motion/LazyMotionLayout";

const font = Public_Sans({ subsets: ["latin"] });

export default async function RootLayout({ children }: PropsWithChildren) {
  const news = await getNews();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain="mysver.se"
          customDomain="https://plausible.yan.gg"
        />
      </head>
      <body
        className={`${font.className} h-full bg-gray-100 transition dark:bg-gray-900`}
      >
        <ThemeProvider attribute="class">
          <LazyMotionLayout>
            <Header initialNews={news.News} />
            <main>
              <div className="isolate pt-14">
                <div
                  className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#6459ff69] to-[#ff0000] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-[#6459ff69] dark:to-[#ffffff]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                  />
                </div>
                <div className="overflow-hidden py-12 sm:py-32 lg:pb-40">
                  {children}
                </div>
                <div
                  className="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                  />
                </div>
              </div>
            </main>
            <footer className="mx-4 mt-10 flex flex-col gap-10 pb-20 text-center md:mt-0">
              <hr className="dark:border-white/5 dark:bg-white/5" />
              <IntersectionTransition>
                <div className="mx-8 mt-6 flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 md:gap-x-12">
                  {socials.map((item) => {
                    const icon = item.icon;
                    if (icon) {
                      return (
                        <PlausibleWrapper
                          key={item.name}
                          eventName="navClicked"
                          eventProps={{
                            props: {
                              name: item.name
                            }
                          }}
                        >
                          <Link
                            href={item.href}
                            target="_blank"
                            className="fill-gray-500 text-2xl leading-6 font-semibold text-gray-500 opacity-100 transition hover:opacity-50 sm:text-xl dark:fill-white dark:text-white"
                          >
                            {icon}
                            <span className="ml-2 hidden text-base xl:inline-block">
                              {item.name}
                            </span>
                          </Link>
                        </PlausibleWrapper>
                      );
                    }
                  })}
                </div>
              </IntersectionTransition>
              <div className="text-sm text-black opacity-50 dark:text-white">
                <Link
                  href="https://github.com/mysverse/landing"
                  target="_blank"
                  className="mb-4 block text-sm transition hover:opacity-50 md:text-base"
                >
                  <FontAwesomeIcon icon={faGithub} className="mr-1 text-lg" />{" "}
                  Source code available with &lt;3
                </Link>
                <span className="mb-1 block">
                  Owned and operated by MYSverse Digital Ventures (AS0469188-M).
                </span>
                <span className="block">
                  All assets used are property of their respective owners.
                </span>
              </div>
            </footer>
          </LazyMotionLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
