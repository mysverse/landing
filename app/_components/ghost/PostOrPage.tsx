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
import Image from "next/image";

interface Props {
  post: PostOrPage;
  children?: React.ReactNode;
  className?: string;
}

const addClass = (
  attributes: Record<string, string | undefined>,
  classes: string[]
) => {
  const existingClasses = attributes.class?.split(" ");
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
          source: ["kg-embed-card"],
          add: ["not-prose"]
        },
        {
          source: ["kg-video-card"],
          add: ["not-prose", "my-8", "sm:my-12"]
        },
        {
          source: ["kg-card-hascaption"],
          add: ["text-center"]
        }
      ];

      if (domNode.name === "video") {
        addClass(attributes, ["rounded-lg"]);
      }

      for (const pattern of patterns) {
        const sources = pattern.source;
        if (sources.some((source) => attributes.class?.includes(source))) {
          const classes = pattern.add;
          if (attributes.class) {
            addClass(attributes, classes);
          } else {
            attributes.class = classes.join(" ");
          }
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

      // Replace <img> with next/image <Image>
      if (domNode.name === "img") {
        const props = attributesToProps(attributes);
        const src = props.src;
        if (typeof src === "string" && props.width) {
          return (
            <Image
              className={clsx("mx-auto rounded-lg", props.className)}
              alt={typeof props.alt === "string" ? props.alt : ""}
              src={src}
              {...props}
            />
          );
        }
      }
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
