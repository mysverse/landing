import "styles/ghost.css";

import type { Metadata, ResolvingMetadata } from "next";
import parse, { Element } from "html-react-parser";
import Image from "next/image";

import type { BlogType } from "utils/ghost";
import { getPost, getPosts } from "utils/ghost";
import MotionArticle from "./MotionArticle";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

export default async function BlogPost({ params }: Props) {
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);
  const html = parse(post.html!, {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const attributes = domNode.attribs;
        if (attributes.class === "kg-bookmark-thumbnail") {
          attributes.class = "kg-bookmark-thumbnail not-prose";
        }
        if (attributes.onerror) {
          // @ts-expect-error onerror is not a valid prop
          domNode.attribs.onerror = undefined;
        }
      }
    }
  });
  const blogName =
    blogType === "mys" ? "MYSverse Blog" : "National Wire Service";
  const blogUrl = blogType === "mys" ? "/blog/mys" : "/blog/nws";
  const primaryTag = post.tags?.[0];

  const pages = [
    {
      name: blogName,
      href: blogUrl,
      current: false
    }
  ];

  if (primaryTag && primaryTag.slug && primaryTag.name) {
    pages.push({
      name: primaryTag.name,
      href: `${blogUrl}/tag/${primaryTag.slug}`,
      current: false
    });
  }

  pages[pages.length - 1].current = true;

  return (
    <MotionArticle>
      <nav aria-label="Breadcrumb" className="flex">
        <ol role="list" className="flex items-center space-x-1 lg:space-x-4">
          <li>
            <div>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map((page) => (
            <li key={page.name}>
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link
                  href={page.href}
                  // target={"_blank"}
                  aria-current={page.current ? "page" : undefined}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {page.name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
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
