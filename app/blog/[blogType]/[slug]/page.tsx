import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import parse from "html-react-parser";

import type { BlogType } from "utils/ghost";
import { getPost, getPosts } from "utils/ghost";
import MotionArticle from "./MotionArticle";

interface Props {
  params: Promise<{ blogType: BlogType; slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);
  const html = parse(post.html!);
  return (
    <MotionArticle>
      <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{post.title}</h2>
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
  const previousImages = (await parent).openGraph?.images || [];
  const primaryAuthor = post.authors?.[0].name;

  return {
    title: post.title,
    publisher: blogType === "mys" ? "MYSverse" : "NWS",
    authors: [
      {
        name: primaryAuthor
      }
    ],
    openGraph: {
      images: post.feature_image ?? previousImages
    }
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
