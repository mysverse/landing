import "public/external-assets/cards.min.css";
import "styles/ghost.css";

import type { PropsWithChildren } from "react";
import ReloadingScript from "./ReloadingScript";
import GhostProviderClient from "./GhostProviderClient";

const baseUrl = "";

function GhostIncludes() {
  return (
    <>
      <ReloadingScript src={`${baseUrl}/external-assets/cards.min.js`} />
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
