import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import type { BlogType } from "utils/ghost";
import { getPost, getPosts } from "utils/ghost";

import { Breadcrumbs } from "app/_components/Blog/Breadcrumbs";
import PostOrPage from "app/_components/ghost/PostOrPage";
import { getColour } from "utils/themeColour";

interface Props {
  params: Promise<{ blogType: BlogType; slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);

  return (
    <PostOrPage post={post}>
      <Breadcrumbs
        blogType={blogType}
        primaryTag={post.tags?.[0]}
        className="not-prose"
      />
      <h2 className="not-prose mt-8 mb-3 text-3xl font-bold lg:text-4xl">
        {post.title}
      </h2>
      <p className="not-prose mb-4 text-base text-gray-500 xl:text-lg">
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
    </PostOrPage>
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
