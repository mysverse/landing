import Image from "next/image";

import type { BlogType } from "utils/ghost";
import { getPosts } from "utils/ghost";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MotionArticle from "./[slug]/MotionArticle";

interface Props {
  params: Promise<{ blogType: BlogType }>;
}

export default async function BlogList({ params }: Props) {
  const { blogType } = await params;
  const posts = await getPosts(blogType, 20);
  const blogName =
    blogType === "mys" ? "MYSverse Blog" : "National Wire Service";
  const blogUrl =
    blogType === "mys" ? "https://blog.mysver.se" : "https://nws.mys.gg";

  const pages = [
    {
      name: blogName,
      href: blogUrl,
      current: false
    }
  ];

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
                  target={"_blank"}
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
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${blogType}/${post.slug}`}
          className="group block overflow-hidden rounded-lg"
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
    </MotionArticle>
  );
}

export async function generateStaticParams() {
  const blogTypes: BlogType[] = ["mys", "nws"];
  const params: { blogType: BlogType }[] = [];
  for (const blogType of blogTypes) {
    params.push({ blogType });
  }
  return params;
}
