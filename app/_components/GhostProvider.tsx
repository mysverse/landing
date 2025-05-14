import "styles/ghost.css";

import type { PropsWithChildren } from "react";
import { blogData } from "utils/ghost";
import ReloadingScript from "./ReloadingScript";
import GhostProviderClient from "./GhostProviderClient";

const baseUrl = blogData[0].externalUrl;

function GhostIncludes() {
  return (
    <>
      {/* Styles */}
      <link rel="stylesheet" href={`${baseUrl}/public/cards.min.css`} />
      {/* Scripts */}
      {/* <ReloadingScript
        src={`${baseUrl}/assets/built/imagesloaded.pkgd.min.js`}
      />
      <ReloadingScript src={`${baseUrl}/assets/built/photoswipe.min.js`} />
      <ReloadingScript src={`${baseUrl}/assets/built/pagination.js`} />
      <ReloadingScript src={`${baseUrl}/assets/built/lightbox.js`} />
      <ReloadingScript src={`${baseUrl}/assets/built/reframe.min.js`} />
      <ReloadingScript src={`${baseUrl}/assets/built/main.js`} /> */}
      <ReloadingScript src={`${baseUrl}/assets/built/dropdown.js`} />
      <ReloadingScript src={`${baseUrl}/public/cards.min.js`} />
      {/* <ReloadingScript src={`${baseUrl}/public/comment-counts.min.js`} />
      <ReloadingScript src={`${baseUrl}/public/member-attribution.min.js`} /> */}
    </>
  );
}

export default function GhostProvider(props: PropsWithChildren) {
  return (
    <>
      <GhostIncludes />
      <GhostProviderClient>{props.children}</GhostProviderClient>
    </>
  );
}
