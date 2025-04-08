import type { Metadata, ResolvingMetadata, Viewport } from "next";
import Image from "next/image";

import { getPage, getPages } from "utils/ghost";

import PostOrPage from "app/_components/ghost/PostOrPage";
import { getColour } from "utils/themeColour";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPage(slug);

  return (
    <PostOrPage post={post}>
      <h2>{post.title}</h2>
      {post.feature_image && (
        <Image
          width={1920}
          height={1080}
          src={post.feature_image}
          alt={post.feature_image_alt ?? post.title ?? "feature_image"}
          className="mb-4 h-auto w-full rounded-lg"
        />
      )}
    </PostOrPage>
  );
}

export const viewport: Viewport = {
  themeColor: getColour("mys")
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const post = await getPage(slug);
  // optionally access and extend (rather than replace) parent metadata
  const metadata = await parent;
  const previousImages = metadata.openGraph?.images || [];
  const primaryAuthor = post.authors?.[0].name;

  return {
    title: post.title ?? metadata.title,
    description: post.excerpt ?? metadata.description,
    keywords: post.tags?.map((tag) => tag.name).join(", "),
    applicationName: "MYSverse",
    authors: [
      {
        name: primaryAuthor
      }
    ],
    openGraph: {
      siteName: "MYSverse",
      type: "website",
      images: post.feature_image ?? previousImages
    }
  };
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug
  }));
}
