import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

import type { BlogType } from "utils/ghost";
import { blogData, getPost, getPosts } from "utils/ghost";
import { getColour } from "utils/themeColour";
import { processBio } from "utils/bio";
import { LocalTime } from "app/_components/LocalTime";
import PostOrPage from "app/_components/ghost/PostOrPage";
import BlogLayout from "app/_components/Layouts/BlogLayout";

interface Props {
  params: Promise<{ blogType: BlogType; slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { blogType, slug } = await params;
  const post = await getPost(blogType, slug);
  const primaryAuthor = post.authors?.[0];
  const publishDate = new Date(post.published_at!);

  return (
    <BlogLayout params={params}>
      <PostOrPage post={post} className="mt-8">
        <div className="not-prose">
          <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center">
            <LocalTime
              date={publishDate}
              className="block text-sm text-gray-500 sm:text-base dark:text-white"
              type="date"
            />
            <svg
              className="hidden size-0.5 fill-gray-400 sm:block"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {primaryAuthor && (
              <div className="relative hidden items-center gap-x-4 sm:flex">
                <Image
                  alt={primaryAuthor.name ?? "Image of author"}
                  src={primaryAuthor.profile_image!}
                  width={32}
                  height={32}
                  className="size-10 rounded-full bg-gray-100 sm:size-7"
                />
                <Link
                  href={primaryAuthor.url!}
                  target="_blank"
                  className="flex flex-col items-baseline text-base/6 transition hover:opacity-50 sm:flex-row sm:gap-3 sm:text-base"
                >
                  <p className="font-medium">{primaryAuthor.name}</p>
                  <p className="text-xs text-gray-500 sm:hidden sm:text-sm dark:text-white">
                    {processBio(primaryAuthor.bio?.toString())}
                  </p>
                </Link>
              </div>
            )}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
            {post.title}
          </h2>
          {primaryAuthor && (
            <div className="relative mt-5 flex items-center gap-x-4 sm:hidden">
              <Image
                alt={primaryAuthor.name ?? "Image of author"}
                src={primaryAuthor.profile_image!}
                width={32}
                height={32}
                className="size-10 rounded-full bg-gray-100 sm:size-7"
              />
              <Link
                href={primaryAuthor.url!}
                target="_blank"
                className="flex flex-col items-baseline text-base/6 transition hover:opacity-50 sm:flex-row sm:gap-3 sm:text-base"
              >
                <p className="font-medium">{primaryAuthor.name}</p>
                <p className="text-xs text-gray-500 sm:hidden sm:text-sm dark:text-white">
                  {processBio(primaryAuthor.bio?.toString())}
                </p>
              </Link>
            </div>
          )}
        </div>
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
    </BlogLayout>
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

  const blogInfo = blogData.find((blog) => blog.slug === blogType);
  if (!blogInfo) {
    throw new Error("Blog not found");
  }

  return {
    title: post.title ?? metadata.title,
    description: post.excerpt ?? metadata.description,
    keywords: post.tags?.map((tag) => tag.name).join(", "),
    applicationName: blogInfo.name,
    authors: [
      {
        name: primaryAuthor
      }
    ],
    openGraph: {
      siteName: blogInfo.name,
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
  const blogTypes = blogData.map((blog) => blog.slug);
  const params: { blogType: BlogType; slug: string }[] = [];
  for (const blogType of blogTypes) {
    const posts = await getPosts(blogType, 100);
    for (const post of posts) {
      params.push({ blogType, slug: post.slug });
    }
  }
  return params;
}
