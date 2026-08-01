import type { BlogType } from "utils/ghost";
import { getPosts } from "utils/ghost";
import BlogClient from "./BlogClient";
import { Link } from "i18n/navigation";
import { NewspaperIcon } from "@heroicons/react/20/solid";
import Container from "app/_components/ui/Container";
import { getTranslations } from "next-intl/server";

export default async function Blog({ blogType }: { blogType: BlogType }) {
  const initialPosts = await getPosts(blogType);
  const t = await getTranslations("Blog");

  return (
    <section className="py-12 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-2">
            {blogType === "mys" ? t("mys.title") : t("nws.title")}
          </h2>
          <p className="body-lg mt-2 mb-4">
            {blogType === "mys" ? t("mys.desc") : t("nws.desc")}
          </p>
          <Link
            href={`/blog/${blogType}`}
            prefetch={false}
            className="text-muted hover:text-primary inline-flex items-center gap-1 text-sm leading-6 font-medium transition"
          >
            <NewspaperIcon className="mr-1 size-5" />
            {t("viewMore")}
          </Link>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <BlogClient blogType={blogType} initialPosts={initialPosts} />
        </div>
      </Container>
    </section>
  );
}
