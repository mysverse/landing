import type { BlogType } from "utils/ghost";
import { getPosts } from "utils/ghost";
import BlogClient from "./BlogClient";
import { Link } from "i18n/navigation";
import { NewspaperIcon } from "@heroicons/react/20/solid";
import { getTranslations } from "next-intl/server";

export default async function Blog({ blogType }: { blogType: BlogType }) {
  const initialPosts = await getPosts(blogType);
  const t = await getTranslations("Blog");

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {blogType === "mys" ? t("mys.title") : t("nws.title")}
        </h2>
        <p className="mt-2 mb-4 text-lg leading-8 text-gray-600 dark:text-white">
          {blogType === "mys" ? t("mys.desc") : t("nws.desc")}
        </p>
        <Link
          href={`/blog/${blogType}`}
          prefetch={false}
          className="inline-flex items-center gap-1 text-sm leading-6 font-medium text-gray-500 transition hover:opacity-50 dark:text-white"
        >
          <NewspaperIcon className="mr-1 size-5" />
          {t("viewMore")}
        </Link>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <BlogClient blogType={blogType} initialPosts={initialPosts} />
      </div>
    </div>
  );
}
