import Image from "next/image";
import Link from "next/link";

import type { BlogType } from "utils/ghost";
import { blogData, getPosts } from "utils/ghost";
import { Breadcrumbs } from "app/_components/Blog/Breadcrumbs";
import { formatDistanceToNow } from "date-fns";

interface Props {
  params: Promise<{ blogType: BlogType }>;
}

export default async function BlogList({ params }: Props) {
  const { blogType } = await params;
  const posts = await getPosts(blogType, 20);

  return (
    <>
      <Breadcrumbs blogType={blogType} className="not-prose" />
      <div className="mt-6 flex flex-col gap-10">
        {posts.map((post) => {
          const primaryTag = post.tags?.[0];
          const primaryAuthor = post.authors?.[0];
          const publishDate = new Date(post.published_at!);
          return (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <Link
                href={`/blog/${blogType}/${post.slug}`}
                className="relative w-full"
              >
                <Image
                  alt={post.feature_image_alt ?? post.title ?? "feature_image"}
                  src={post.feature_image!}
                  width={1920}
                  height={1080}
                  className="w-full rounded-2xl bg-gray-100 object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
              </Link>

              <div>
                <div className="mt-8 flex items-center gap-x-4 text-sm">
                  <time
                    dateTime={publishDate.toISOString()}
                    className="text-gray-500"
                    suppressHydrationWarning
                  >
                    {formatDistanceToNow(publishDate, {
                      addSuffix: true,
                      includeSeconds: true
                    })}
                  </time>
                  {primaryTag && (
                    <Link
                      href={primaryTag.url!}
                      target="_blank"
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {primaryTag?.name}
                    </Link>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-xl/6 font-semibold text-gray-900 transition group-hover:text-gray-600">
                    <Link href={`/blog/${blogType}/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-base/6 text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
                {primaryAuthor && (
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <Image
                      alt={primaryAuthor.name ?? "Image of author"}
                      src={primaryAuthor.profile_image!}
                      width={32}
                      height={32}
                      className="size-10 rounded-full bg-gray-100"
                    />
                    <div className="text-base/6">
                      <p className="font-semibold text-gray-900">
                        <Link href={primaryAuthor.url!} target="_blank">
                          <span className="absolute inset-0" />
                          {primaryAuthor.name}
                        </Link>
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        {primaryAuthor.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const blogTypes = blogData.map((blog) => blog.slug);
  const params: { blogType: BlogType }[] = [];
  for (const blogType of blogTypes) {
    params.push({ blogType });
  }
  return params;
}
