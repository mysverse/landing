import "../styles/globals.css";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

import type { AppProps } from "next/app";
// import { useEffect } from "react";
import PlausibleProvider from "next-plausible";
import { useRouter } from "next/router";

// const elementHasClasses = (element: Element | null, classes: string[]) =>
//   classes.every((value) => element?.classList.contains(value));

// const classes = [
//   // {
//   //   tag: "html",
//   //   classList: ["bg-slate-200", "h-full"],
//   //   routes: [
//   //     "/app/mecs",
//   //     "/app/mecs/staff",
//   //     "/app/gentag",
//   //     "/app/growth",
//   //     "/app/invote",
//   //     "/app/privacy-policy",
//   //     "/app"
//   //   ]
//   // },
//   // {
//   //   tag: "html",
//   //   classList: ["bg-slate-800", "h-full"],
//   //   routes: ["/"]
//   // },
//   // {
//   //   tag: "html",
//   //   classList: ["h-full"],
//   //   routes: ["/_offline"]
//   // },
//   // {
//   //   tag: "body",
//   //   classList: ["h-full"],
//   //   routes: [
//   //     "/_offline",
//   //     "/app/mecs",
//   //     "/app/mecs/staff",
//   //     "/app/gentag",
//   //     "/app/growth",
//   //     "/app/invote",
//   //     "/app/privacy-policy",
//   //     "/app"
//   //   ]
//   // }
// ];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // useEffect(() => {
  //   for (const value of classes) {
  //     const element = document.querySelector(value.tag);
  //     if (element) {
  //       const classNames = value.classList;
  //       const hasClasses = elementHasClasses(element, classNames);
  //       if (value.routes.includes(router.pathname)) {
  //         if (!hasClasses) {
  //           for (const className of classNames) {
  //             element.classList.add(className);
  //           }
  //         }
  //       } else if (hasClasses) {
  //         for (const className of classNames) {
  //           element.classList.remove(className);
  //         }
  //       }
  //     }
  //   }
  // });

  return (
    <PlausibleProvider
      domain="mysver.se"
      customDomain="https://plausible.yan.gg"
      // selfHosted
    >
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}

export default MyApp;
