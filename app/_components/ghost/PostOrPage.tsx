import type { PostOrPage } from "@tryghost/content-api";
import type {
  DOMNode,
  Element as DomElement,
  HTMLReactParserOptions
} from "html-react-parser";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import { createElement, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import clsx from "clsx";

import { isExternalUrl } from "utils/isExternalUrl";

import GhostProvider from "../GhostProvider";
import LightboxImage from "../LightboxImage";
import GhostReveal from "./GhostReveal";

interface Props {
  post: PostOrPage;
  children?: React.ReactNode;
  className?: string;
}

interface ClassRule {
  source: string[];
  add: string[];
}

const addClass = (
  attributes: Record<string, string | undefined>,
  classes: string[]
) => {
  const existingClasses = attributes.class?.split(/\s+/).filter(Boolean);
  if (existingClasses) {
    for (const add of classes) {
      if (!existingClasses.includes(add)) {
        existingClasses.push(add);
      }
    }
    attributes.class = existingClasses.join(" ");
  } else {
    attributes.class = classes.join(" ");
  }
};

const getClassList = (className: string | undefined) => {
  return className?.split(/\s+/).filter(Boolean) ?? [];
};

const hasAnyClass = (className: string | undefined, classes: string[]) => {
  const existingClasses = getClassList(className);
  return classes.some((classToFind) => existingClasses.includes(classToFind));
};

const appendClasses = (className: unknown, classes: string[]) => {
  const classNames =
    typeof className === "string" ? getClassList(className) : [];
  for (const add of classes) {
    if (!classNames.includes(add)) {
      classNames.push(add);
    }
  }
  return classNames.join(" ");
};

const isDomElement = (domNode: DOMNode): domNode is DomElement => {
  return domNode.type === "tag" && "name" in domNode && "attribs" in domNode;
};

const isUnsafeHref = (href: string) => {
  const value = href.trim();
  return /^(javascript|vbscript|data):/i.test(value);
};

const isUnsafeAssetSrc = (src: string) => {
  const value = src.trim();
  return /^(javascript|vbscript):/i.test(value);
};

const sanitizeAttributes = (attributes: Record<string, string | undefined>) => {
  for (const [key, value] of Object.entries(attributes)) {
    if (/^on/i.test(key)) {
      Reflect.deleteProperty(attributes, key);
      continue;
    }

    if (!value) continue;

    if ((key === "href" || key === "xlink:href") && isUnsafeHref(value)) {
      Reflect.deleteProperty(attributes, key);
    }

    if ((key === "src" || key === "poster") && isUnsafeAssetSrc(value)) {
      Reflect.deleteProperty(attributes, key);
    }
  }
};

const ghostClassRules: ClassRule[] = [
  {
    source: ["kg-image-card", "kg-gallery-card"],
    add: ["not-prose", "my-8", "overflow-hidden", "rounded-lg"]
  },
  {
    source: ["kg-image", "kg-gallery-image"],
    add: [
      "mx-auto",
      "rounded-lg",
      "transition",
      "duration-300",
      "ease-out",
      "motion-safe:hover:scale-[1.01]"
    ]
  },
  {
    source: ["kg-bookmark-card"],
    add: [
      "not-prose",
      "my-8",
      "rounded-lg",
      "transition",
      "duration-300",
      "ease-out",
      "motion-safe:hover:-translate-y-1",
      "motion-safe:hover:shadow-lg"
    ]
  },
  {
    source: ["kg-bookmark-title"],
    add: ["not-prose"]
  },
  {
    source: ["kg-file-card", "kg-product-card", "kg-cta-card"],
    add: [
      "not-prose",
      "my-8",
      "transition",
      "duration-300",
      "ease-out",
      "motion-safe:hover:-translate-y-1"
    ]
  },
  {
    source: ["kg-callout-card", "kg-toggle-card"],
    add: [
      "not-prose",
      "my-6",
      "rounded-lg",
      "shadow-sm",
      "ring-1",
      "ring-black/5",
      "transition",
      "duration-300",
      "ease-out",
      "dark:ring-white/10"
    ]
  },
  {
    source: ["kg-header-card"],
    add: [
      "not-prose",
      "my-8",
      "overflow-hidden",
      "rounded-2xl",
      "shadow-sm",
      "ring-1",
      "ring-black/5",
      "dark:ring-white/10"
    ]
  },
  {
    source: ["kg-embed-card", "kg-video-card", "kg-audio-card"],
    add: ["not-prose", "my-8", "overflow-hidden", "rounded-lg"]
  },
  {
    source: ["kg-button-card"],
    add: ["not-prose", "my-8"]
  },
  {
    source: ["kg-btn"],
    add: [
      "inline-flex",
      "items-center",
      "justify-center",
      "rounded-lg",
      "px-5",
      "py-3",
      "text-sm",
      "font-semibold",
      "no-underline",
      "shadow-sm",
      "transition",
      "duration-200",
      "ease-out",
      "hover:-translate-y-0.5",
      "hover:shadow-md"
    ]
  }
];

const revealClasses = [
  "kg-audio-card",
  "kg-bookmark-card",
  "kg-button-card",
  "kg-callout-card",
  "kg-cta-card",
  "kg-embed-card",
  "kg-file-card",
  "kg-gallery-card",
  "kg-header-card",
  "kg-image-card",
  "kg-product-card",
  "kg-toggle-card",
  "kg-video-card"
];

const applyGhostClasses = (attributes: Record<string, string | undefined>) => {
  const originalClassName = attributes.class;

  for (const rule of ghostClassRules) {
    if (hasAnyClass(originalClassName, rule.source)) {
      addClass(attributes, rule.add);
    }
  }
};

const appendRel = (rel: unknown, values: string[]) => {
  return appendClasses(typeof rel === "string" ? rel : undefined, values);
};

const shouldOpenInNewTab = (href: string) => {
  return /^(https?:)?\/\//i.test(href);
};

const isGhostComponentLink = (className: string | undefined) => {
  return hasAnyClass(className, [
    "kg-bookmark-container",
    "kg-btn",
    "kg-cta-button",
    "kg-file-card-container",
    "kg-header-card-button",
    "kg-product-card-button",
    "kg-signup-card-button"
  ]);
};

const renderLink = (domNode: DomElement, href: string) => {
  const props = attributesToProps(
    domNode.attribs
  ) as AnchorHTMLAttributes<HTMLAnchorElement>;
  const children = domToReact(domNode.children as DOMNode[], parserOptions);
  const isInternalRoute = !isExternalUrl(href) && href.startsWith("/");
  const target =
    props.target ?? (shouldOpenInNewTab(href) ? "_blank" : undefined);
  const rel =
    target === "_blank"
      ? appendRel(props.rel, ["noopener", "noreferrer"])
      : props.rel;
  const className = isGhostComponentLink(props.className)
    ? appendClasses(props.className, ["transition"])
    : appendClasses(props.className, [
        "text-primary",
        "no-underline",
        "transition",
        "hover:opacity-50"
      ]);
  const linkProps = { ...props, className, rel, target };

  if (isInternalRoute) {
    return (
      <Link {...linkProps} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a {...linkProps} href={href}>
      {children}
    </a>
  );
};

const renderImage = (domNode: DomElement) => {
  const props = attributesToProps(domNode.attribs);
  const src = props.src;
  const width = Number(props.width);
  const height = Number(props.height);

  if (
    typeof src === "string" &&
    Number.isFinite(width) &&
    Number.isFinite(height) &&
    width > 0 &&
    height > 0
  ) {
    const { alt, className } = props;
    const imageProps = { ...props };
    for (const key of [
      "alt",
      "className",
      "height",
      "src",
      "srcSet",
      "width"
    ]) {
      Reflect.deleteProperty(imageProps, key);
    }

    return (
      <LightboxImage
        {...imageProps}
        className={appendClasses(className, ["mx-auto", "rounded-lg"])}
        alt={typeof alt === "string" ? alt : ""}
        src={src}
        width={width}
        height={height}
      />
    );
  }
};

const renderTable = (domNode: DomElement) => {
  const props = attributesToProps(domNode.attribs);
  const className = appendClasses(props.className, [
    "min-w-full",
    "text-left",
    "text-sm"
  ]);

  return (
    <GhostReveal className="not-prose my-8 overflow-x-auto rounded-lg ring-1 ring-black/10 dark:ring-white/10">
      {createElement(
        "table",
        { ...props, className },
        domToReact(domNode.children as DOMNode[], parserOptions)
      )}
    </GhostReveal>
  );
};

const renderAnimatedCard = (domNode: DomElement) => {
  if (!hasAnyClass(domNode.attribs.class, revealClasses)) return;

  const props = attributesToProps(domNode.attribs);
  return (
    <GhostReveal>
      {createElement(
        domNode.name,
        props,
        domToReact(domNode.children as DOMNode[], parserOptions)
      )}
    </GhostReveal>
  );
};

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isDomElement(domNode)) {
      const attributes = domNode.attribs;
      sanitizeAttributes(attributes);
      applyGhostClasses(attributes);

      if (attributes.id) {
        addClass(attributes, ["scroll-mt-24"]);
      }

      if (domNode.name === "video") {
        addClass(attributes, ["rounded-lg", "shadow-sm"]);
      }

      if (domNode.name === "iframe") {
        addClass(attributes, [
          "aspect-video",
          "w-full",
          "rounded-lg",
          "shadow-sm"
        ]);
      }

      if (domNode.name === "figcaption") {
        addClass(attributes, [
          "text-center",
          "not-prose",
          "text-sm",
          "mt-4",
          "xl:text-lg",
          "opacity-80"
        ]);
      }

      if (domNode.name === "a" && attributes.href) {
        return renderLink(domNode, attributes.href);
      }

      if (domNode.name === "img") {
        return renderImage(domNode);
      }

      if (domNode.name === "table") {
        return renderTable(domNode);
      }

      return renderAnimatedCard(domNode);
    }
  }
};

export default async function PostOrPage({ post, children, className }: Props) {
  // console.log(post.html);
  if (!post.html) {
    return <div>Post not found</div>;
  }

  const html = parse(post.html, parserOptions);

  return (
    <GhostProvider>
      <div
        className={clsx(
          "prose lg:prose-xl dark:prose-invert gh-content max-w-full",
          className
        )}
      >
        {children}
        {html}
      </div>
    </GhostProvider>
  );
}
