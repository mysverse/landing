import "styles/ghost.css";

import type { PostOrPage } from "@tryghost/content-api";
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import parse, {
  attributesToProps,
  domToReact,
  Element
} from "html-react-parser";
import Link from "next/link";
import GhostProvider from "../GhostProvider";
import clsx from "clsx";

interface Props {
  post: PostOrPage;
  children?: React.ReactNode;
  className?: string;
}

const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      const attributes = domNode.attribs;

      const patterns = [
        {
          source: ["kg-bookmark-card", "kg-bookmark-title"],
          add: ["not-prose"]
        },
        {
          source: ["kg-image"],
          add: ["rounded-lg", "mx-auto"]
        },
        {
          source: ["kg-card-hascaption"],
          add: ["text-center"]
        }
      ];

      for (const pattern of patterns) {
        const sources = pattern.source;
        if (sources.some((source) => attributes.class?.includes(source))) {
          const classes = attributes.class.split(" ");
          for (const add of pattern.add) {
            if (!classes.includes(add)) {
              classes.push(add);
            }
          }
          attributes.class = classes.join(" ");
        }
      }

      if (attributes.onerror) {
        // @ts-expect-error onerror is not a valid prop in React
        attributes.onerror = undefined;
      }

      // Link handling
      if (domNode.name === "a" && attributes.href) {
        const props = attributesToProps(attributes);
        return (
          <Link
            href={attributes.href}
            target="_blank"
            className={clsx(
              "text-primary no-underline transition hover:opacity-50",
              props.className
            )}
            {...props}
          >
            {domToReact(domNode.children as DOMNode[], parserOptions)}
          </Link>
        );
      }
    }
  }
};

export default function PostOrPage({ post, children, className }: Props) {
  if (!post.html) {
    return <div>Post not found</div>;
  }

  const html = parse(post.html, parserOptions);

  return (
    <GhostProvider>
      <div
        className={clsx(
          "prose lg:prose-xl dark:prose-invert max-w-full",
          className
        )}
      >
        {children}
        {html}
      </div>
    </GhostProvider>
  );
}
