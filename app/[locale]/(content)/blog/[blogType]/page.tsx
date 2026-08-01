import Image from "next/image";
import { Link } from "i18n/navigation";

import type { BlogType } from "utils/ghost";
import { blogData, getPosts } from "utils/ghost";
import { processBio } from "utils/bio";
import { LocalTime } from "app/_components/LocalTime";
import BlogLayout from "app/_components/Layouts/BlogLayout";
import RotatingCard from "app/_components/RotatingCard";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "i18n/routing";

interface Props {
  params: Promise<{ locale: string; blogType: BlogType }>;
}

export default async function BlogList({ params }: Props) {
  const { locale, blogType } = await params;
  setRequestLocale(locale);

  const posts = await getPosts(blogType, 20);
  const t = await getTranslations("Blog");
  const blogInfo = blogData.find((blog) => blog.slug === blogType);

  return (
    <BlogLayout params={params}>
      {blogInfo && <h1 className="heading-2 mt-8">{blogInfo.name}</h1>}
      <div className="mx-auto mt-8 grid grid-cols-1 gap-x-8 gap-y-20 sm:mt-16">
        {posts.map((post) => {
          const primaryTag = post.tags?.[0];
          const primaryAuthor = post.authors?.[0];
          const publishDate = new Date(post.published_at!);
          return (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <RotatingCard>
                <Link
                  href={`/blog/${blogType}/${post.slug}`}
                  className="relative w-full"
                >
                  <Image
                    alt={
                      post.feature_image_alt ??
                      t("alt.feature", { title: post.title ?? "" })
                    }
                    src={post.feature_image!}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="w-full rounded-2xl bg-gray-100 object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                </Link>
              </RotatingCard>

              <div>
                <div className="mt-8 flex items-center gap-x-4 text-sm">
                  <LocalTime
                    date={publishDate}
                    type="distance"
                    className="text-muted"
                  />
                  {primaryTag && (
                    <Link
                      href={primaryTag.url!}
                      target="_blank"
                      className="bg-surface-raised text-body hover:bg-primary/10 hover:text-primary relative z-10 rounded-full px-3 py-1.5 font-medium transition"
                    >
                      {primaryTag?.name}
                    </Link>
                  )}
                </div>
                <div className="group relative">
                  <h3 className="text-strong group-hover:text-primary mt-3 text-xl/6 font-semibold transition">
                    <Link href={`/blog/${blogType}/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-body mt-5 line-clamp-3 text-base/6">
                    {post.excerpt}
                  </p>
                </div>
                {primaryAuthor && (
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {primaryAuthor.profile_image &&
                      primaryAuthor.profile_image.trim() !== "" && (
                        <Image
                          alt={t("alt.author", {
                            name: primaryAuthor.name ?? ""
                          })}
                          src={primaryAuthor.profile_image}
                          width={32}
                          height={32}
                          className="size-10 rounded-full bg-gray-100"
                        />
                      )}
                    <div className="text-base/6">
                      <p className="text-strong font-semibold">
                        <Link href={primaryAuthor.url!} target="_blank">
                          <span className="absolute inset-0" />
                          {primaryAuthor.name}
                        </Link>
                      </p>
                      <p className="text-body text-xs sm:text-sm">
                        {processBio(primaryAuthor.bio?.toString())}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </BlogLayout>
  );
}

export async function generateStaticParams() {
  const blogTypes = blogData.map((blog) => blog.slug);
  const locales = routing.locales;

  return locales.flatMap((locale) =>
    blogTypes.map((blogType) => ({
      locale,
      blogType
    }))
  );
}
