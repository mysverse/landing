import type { BlogType } from "utils/ghost";
import { getPosts } from "utils/ghost";
import BlogClient from "./BlogClient";
import Link from "app/_components/ui/TransitionLink";
import { NewspaperIcon } from "@heroicons/react/20/solid";
import Section from "app/_components/ui/Section";
import { getTranslations } from "next-intl/server";

export default async function Blog({ blogType }: { blogType: BlogType }) {
  const initialPosts = await getPosts(blogType);
  const t = await getTranslations("Blog");

  return (
    <Section
      title={blogType === "mys" ? t("mys.title") : t("nws.title")}
      description={blogType === "mys" ? t("mys.desc") : t("nws.desc")}
    >
      <div className="mt-4 text-center">
        <Link
          href={`/blog/${blogType}`}
          className="text-muted hover:text-primary inline-flex items-center gap-1 text-sm leading-6 font-medium transition"
        >
          <NewspaperIcon className="mr-1 size-5" />
          {t("viewMore")}
        </Link>
      </div>
      <div className="mx-auto mt-12 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <BlogClient blogType={blogType} initialPosts={initialPosts} />
      </div>
    </Section>
  );
}
