import "styles/ghost.css";

import type { Metadata, ResolvingMetadata } from "next";
import parse, {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions
} from "html-react-parser";
import Image from "next/image";

import type { BlogType } from "utils/ghost";
import { getPost, getPosts } from "utils/ghost";
import MotionArticle from "./MotionArticle";
import Link from "next/link";
import { Breadcrumbs } from "app/_components/Blog/Breadcrumbs";

interface Props {
  params: Promise<{ blogType: BlogType; slug: string }>;
}

const getColour = (blogType: BlogType) => {
  switch (blogType) {
    case "mys":
      return "#FF2A2A";
    case "nws":
      return "#2527B5";
    default:
      return "#000000";
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
        // @ts-expect-error onerror is not a valid prop
        attributes.onerror = undefined;
      }

      if (domNode.name === "a" && attributes.href) {
        const props = attributesToProps(attributes);
        return (
          <Link href={attributes.href} target="_blank" {...props}>
            {domToReact(domNode.children as DOMNode[], parserOptions)}
          </Link>
        );
      }
    }
  }
};

export default async function BlogPost({ params }: Props) {
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);
  if (!post.html) {
    return <div>Post not found</div>;
  }
  const html = parse(post.html, parserOptions);

  return (
    <MotionArticle>
      <Breadcrumbs blogType={blogType} primaryTag={post.tags?.[0]} />
      <h2 className="mt-6 mb-4 text-3xl font-bold lg:text-4xl">{post.title}</h2>
      <p className="mb-4 text-base text-gray-500 xl:text-lg">
        Published on {new Date(post.published_at!).toLocaleDateString()}
      </p>
      {post.feature_image && (
        <Image
          width={1920}
          height={1080}
          src={post.feature_image}
          alt={post.feature_image_alt ?? post.title ?? "feature_image"}
          className="mb-4 h-auto w-full rounded-lg"
        />
      )}
      <div className="prose lg:prose-xl mx-auto mt-8">{html}</div>
    </MotionArticle>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);
  // optionally access and extend (rather than replace) parent metadata
  const metadata = await parent;
  const previousImages = metadata.openGraph?.images || [];
  const primaryAuthor = post.authors?.[0].name;

  return {
    title: post.title ?? metadata.title,
    description: post.excerpt ?? metadata.description,
    keywords: post.tags?.map((tag) => tag.name).join(", "),
    applicationName:
      blogType === "mys" ? "MYSverse Blog" : "National Wire Service",
    authors: [
      {
        name: primaryAuthor
      }
    ],
    openGraph: {
      siteName: blogType === "mys" ? "MYSverse" : "NWS",
      type: "website",
      images: post.feature_image ?? previousImages
    }
  };
}

export async function generateViewport({ params }: Props) {
  const { blogType } = await params;
  return {
    themeColor: getColour(blogType)
  };
}

export async function generateStaticParams() {
  const blogTypes: BlogType[] = ["mys", "nws"];
  const params: { blogType: BlogType; slug: string }[] = [];
  for (const blogType of blogTypes) {
    const posts = await getPosts(blogType, 20);
    for (const post of posts) {
      params.push({ blogType, slug: post.slug });
    }
  }
  return params;
}
