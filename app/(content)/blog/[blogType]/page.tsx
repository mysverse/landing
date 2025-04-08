import Image from "next/image";
import Link from "next/link";

import type { BlogType } from "utils/ghost";
import { blogData, getPosts } from "utils/ghost";
import { Breadcrumbs } from "app/_components/Blog/Breadcrumbs";

interface Props {
  params: Promise<{ blogType: BlogType }>;
}

export default async function BlogList({ params }: Props) {
  const { blogType } = await params;
  const posts = await getPosts(blogType, 20);

  return (
    <>
      <Breadcrumbs blogType={blogType} className="not-prose" />
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${blogType}/${post.slug}`}
          className="group not-prose block overflow-hidden rounded-lg"
        >
          <div className="mt-8">
            <h2 className="mt-6 mb-4 text-3xl font-bold lg:text-4xl">
              {post.title}
            </h2>
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
            <p className="text-base text-gray-500 xl:text-lg">{post.excerpt}</p>
          </div>
        </Link>
      ))}
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
