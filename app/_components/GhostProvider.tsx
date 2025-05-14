"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";

import { usePathname } from "next/navigation";
import ReloadingScript from "./ReloadingScript";

const GHOST = "https://blog.mysver.se";

function GhostIncludes() {
  const pathname = usePathname();
  return (
    <>
      {/* Styles */}
      {/* <link rel="stylesheet" href={`${GHOST}/assets/built/screen.css`} /> */}
      <link rel="stylesheet" href={`${GHOST}/public/cards.min.css`} />
      {/* Must run before hydration */}
      <ReloadingScript src={`${GHOST}/assets/built/imagesloaded.pkgd.min.js`} />
      <ReloadingScript src={`${GHOST}/assets/built/photoswipe.min.js`} />
      {/* Core theme logic */}
      <ReloadingScript src={`${GHOST}/assets/built/main.js`} />
      <ReloadingScript src={`${GHOST}/assets/built/dropdown.js`} />
      <ReloadingScript src={`${GHOST}/assets/built/pagination.js`} />
      <ReloadingScript src={`${GHOST}/assets/built/lightbox.js`} />
      <ReloadingScript src={`${GHOST}/assets/built/reframe.min.js`} />
      {/* Optional extras; let them load whenever */}
      <ReloadingScript
        src={`${GHOST}/public/cards.min.js`}
        key={pathname}
        defer
      />
      <ReloadingScript src={`${GHOST}/public/comment-counts.min.js`} />
      <ReloadingScript src={`${GHOST}/public/member-attribution.min.js`} />
    </>
  );
}

export default function GhostProvider(props: PropsWithChildren) {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return (
    <>
      <GhostIncludes key={pathname} />
      {props.children}
    </>
  );
}
