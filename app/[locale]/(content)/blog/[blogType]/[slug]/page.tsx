import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Link } from "i18n/navigation";

import type { BlogType } from "utils/ghost";
import { blogData, getPost, getPosts, isGhostNotFound } from "utils/ghost";

async function getPostOr404(blogType: BlogType, slug: string) {
  try {
    return await getPost(blogType, slug);
  } catch (error) {
    // Only a Ghost 404 becomes a 404 page; infrastructure failures
    // must propagate so the build fails instead of baking 404s.
    if (isGhostNotFound(error)) notFound();
    throw error;
  }
}
import { getColour } from "utils/themeColour";
import { processBio } from "utils/bio";
import { LocalTime } from "app/_components/LocalTime";
import PostOrPage from "app/_components/ghost/PostOrPage";
import BlogLayout from "app/_components/Layouts/BlogLayout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "i18n/routing";

interface Props {
  params: Promise<{ locale: string; blogType: BlogType; slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { locale, blogType, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostOr404(blogType, slug);
  const t = await getTranslations("Blog");
  const primaryAuthor = post.authors?.[0];
  const publishDate = new Date(post.published_at!);

  return (
    <BlogLayout params={params}>
      <PostOrPage post={post} className="mt-8">
        <div className="not-prose">
          <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center">
            <LocalTime
              date={publishDate}
              className="text-muted block text-sm sm:text-base"
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
                {primaryAuthor.profile_image &&
                  primaryAuthor.profile_image.trim() !== "" && (
                    <Image
                      alt={t("alt.author", { name: primaryAuthor.name ?? "" })}
                      src={primaryAuthor.profile_image}
                      width={32}
                      height={32}
                      className="size-10 rounded-full bg-gray-100 sm:size-7"
                    />
                  )}
                <Link
                  href={primaryAuthor.url!}
                  target="_blank"
                  className="flex flex-col items-baseline text-base/6 transition hover:opacity-50 sm:flex-row sm:gap-3 sm:text-base"
                >
                  <p className="font-medium">{primaryAuthor.name}</p>
                  <p className="text-muted text-xs sm:hidden sm:text-sm">
                    {processBio(primaryAuthor.bio?.toString())}
                  </p>
                </Link>
              </div>
            )}
          </div>
          <h1 className="heading-2 mt-3">{post.title}</h1>
          {primaryAuthor && (
            <div className="relative mt-5 flex items-center gap-x-4 sm:hidden">
              {primaryAuthor.profile_image &&
                primaryAuthor.profile_image.trim() !== "" && (
                  <Image
                    alt={t("alt.author", { name: primaryAuthor.name ?? "" })}
                    src={primaryAuthor.profile_image}
                    width={32}
                    height={32}
                    className="size-10 rounded-full bg-gray-100 sm:size-7"
                  />
                )}
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
            data-vt={`blog-image-${post.slug}`}
            alt={
              post.feature_image_alt ??
              t("alt.feature", { title: post.title ?? "" })
            }
            sizes="(max-width: 896px) 100vw, 896px"
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
  const post = await getPostOr404(blogType, slug);
  // optionally access and extend (rather than replace) parent metadata
  const metadata = await parent;
  const previousImages = metadata.openGraph?.images || [];
  const primaryAuthor = post.authors?.[0].name;

  const blogInfo = blogData.find((blog) => blog.slug === blogType);
  if (!blogInfo) {
    throw new Error("Blog not found");
  }

  const images = post.feature_image ?? previousImages;

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
      images
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ? { absolute: post.title } : undefined,
      description: post.excerpt ?? undefined,
      images
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
  const locales = routing.locales;
  const params: { locale: string; blogType: BlogType; slug: string }[] = [];

  for (const locale of locales) {
    for (const blogType of blogTypes) {
      const posts = await getPosts(blogType, 100);
      for (const post of posts) {
        params.push({ locale, blogType, slug: post.slug });
      }
    }
  }
  return params;
}
