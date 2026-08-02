"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link, usePathname, useRouter } from "i18n/navigation";
import {
  useViewTransitionNavigate,
  type ConfigureTransition
} from "app/_components/Motion/ViewTransitionProvider";
import { warmViewTransition } from "app/_components/Motion/viewTransition";
import { springSoft } from "app/_components/Motion/transitions";

type LinkProps = ComponentProps<typeof Link>;

export interface SharedElement {
  /** Matches a `data-vt` attribute present on both the outgoing and incoming page. */
  key: string;
  /**
   * Clip + `object-fit: cover` + animated corner radii. Right for an image
   * changing aspect ratio; wrong for text, which gets clipped as the box grows.
   */
  crop?: boolean;
}

interface Props extends LinkProps {
  /**
   * Carry one or more elements across the navigation as shared-element morphs.
   * Each key must match exactly one element per page, so the pairing between
   * the outgoing and incoming snapshots is unambiguous.
   */
  sharedElement?: SharedElement | SharedElement[];
}

/**
 * Decides whether we take over a click or leave it to the browser. Anything
 * that isn't a plain left-click onto a different internal route falls through
 * to default behaviour.
 */
function shouldIntercept(
  event: MouseEvent<HTMLAnchorElement>,
  href: LinkProps["href"],
  target: string | undefined,
  pathname: string
): href is string {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }
  if (target && target !== "_self") return false;
  if (typeof href !== "string") return false;
  // Internal, locale-relative paths only.
  if (!href.startsWith("/")) return false;
  // Hash navigation moves scroll inside the transition's update callback, and
  // Motion does not yet cancel scroll deltas out — the page would slide by the
  // delta. These stay on the browser's own anchor handling.
  if (href.includes("#")) return false;
  if (href === pathname) return false;
  return true;
}

/**
 * Locale-aware Link that runs the navigation inside a view transition.
 *
 * Drop-in for next-intl's `Link`; degrades to it exactly where transitions are
 * unavailable or reduced motion is requested.
 */
export default function TransitionLink({
  href,
  sharedElement,
  target,
  onClick,
  onPointerEnter,
  onFocus,
  ...rest
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const navigate = useViewTransitionNavigate();

  // Only internal, non-hash targets can ever transition, so don't pull the
  // motion chunk in on hovering an outbound link.
  const warmable =
    typeof href === "string" && href.startsWith("/") && !href.includes("#");

  const shared = sharedElement
    ? Array.isArray(sharedElement)
      ? sharedElement
      : [sharedElement]
    : [];

  const configure: ConfigureTransition | undefined = shared.length
    ? (builder) => {
        for (const element of shared) {
          builder
            .add(`[data-vt="${element.key}"]`)
            // Same physical feel as the card reveals and tilts elsewhere.
            .layout(springSoft)
            .crop(element.crop ?? false)
            // Stay a flat top-level layer so the element can lift out of a
            // card whose overflow would otherwise clip it mid-flight.
            .group(false);
        }
      }
    : undefined;

  return (
    <Link
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);
        if (!shouldIntercept(event, href, target, pathname)) return;
        event.preventDefault();
        navigate(() => router.push(href), configure);
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        if (warmable) warmViewTransition();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        if (warmable) warmViewTransition();
      }}
      {...rest}
    />
  );
}
