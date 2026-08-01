import "styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";

import PlausibleProvider from "next-plausible";
import { Metadata, Viewport } from "next";
import { env } from "process";
import { BRAND_COLOR } from "data/brand";

const APP_NAME = "MYSverse";
const APP_DEFAULT_TITLE = "MYSverse";
const APP_TITLE_TEMPLATE = "%s - MYSverse";
const APP_DESCRIPTION =
  "The original Malaysian metaverse project and roleplay community. Your gateway into our unique brand of fun, culture and education like no other.";

export const metadata: Metadata = {
  metadataBase: env.CF_PAGES_URL
    ? new URL(env.CF_PAGES_URL)
    : new URL("https://mysver.se"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: [
      { url: "/img/favicons/favicon-32x32.png", sizes: "32x32" },
      { url: "/img/favicons/favicon-16x16.png", sizes: "16x16" },
      { url: "/img/favicons/favicon-192x192.png", sizes: "192x192" }
    ],
    apple: [{ url: "/img/favicons/favicon-180x180.png", sizes: "180x180" }]
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "MYSverse"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    images: ["/opengraph-image.png"]
  }
};

export const viewport: Viewport = {
  themeColor: BRAND_COLOR
};

import Script from "next/script";
import { Public_Sans } from "next/font/google";
import { ReactNode } from "react";
import Header from "app/_components/header";
import Footer from "app/_components/Footer";
import { getNews } from "utils/news";
import { ThemeProvider } from "app/_components/ThemeProvider";
import LazyMotionLayout from "app/_components/Motion/LazyMotionLayout";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from "next-intl/server";
import { routing } from "i18n/routing";

const font = Public_Sans({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const news = await getNews();
  const messages = await getMessages();
  const tHeader = await getTranslations("Header");

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <PlausibleProvider
          src="https://plausible.yan.gg/js/script.js"
          scriptProps={{ "data-domain": "mysver.se" } as Record<string, string>}
        />
      </head>
      <body className={`${font.className} bg-surface-page h-full transition`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})();`
          }}
        />
        <a
          href="#main-content"
          className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-xl focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          {tHeader("sr.skipToContent")}
        </a>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LazyMotionLayout>
              <Header initialNews={news.News} />
              <main id="main-content">
                <div className="isolate pt-14">
                  <div
                    className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                  >
                    <div
                      className="from-primary/40 to-brand relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:to-white"
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
                      className="from-primary to-brand relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                      style={{
                        clipPath:
                          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                      }}
                    />
                  </div>
                </div>
              </main>
              <Footer />
            </LazyMotionLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
