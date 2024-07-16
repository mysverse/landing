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
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

import { Public_Sans } from "next/font/google";
import { PropsWithChildren } from "react";

const font = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider
          domain="mysver.se"
          customDomain="https://plausible.yan.gg"
        />
      </head>
      <body className={`${font.className} bg-gray-900 h-full`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
