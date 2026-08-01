import type { Metadata, ResolvingMetadata, Viewport } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { getPage, getPages, isGhostNotFound } from "utils/ghost";

async function getPageOr404(slug: string) {
  try {
    return await getPage(slug);
  } catch (error) {
    // Only a Ghost 404 becomes a 404 page; infrastructure failures
    // must propagate so the build fails instead of baking 404s.
    if (isGhostNotFound(error)) notFound();
    throw error;
  }
}

import PostOrPage from "app/_components/ghost/PostOrPage";
import { getColour } from "utils/themeColour";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "i18n/routing";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPageOr404(slug);
  const t = await getTranslations("Blog");

  return (
    <PostOrPage post={post}>
      <h1>{post.title}</h1>
      {post.feature_image && (
        <Image
          width={1920}
          height={1080}
          src={post.feature_image}
          alt={
            post.feature_image_alt ??
            t("alt.feature", { title: post.title ?? "" })
          }
          sizes="(max-width: 896px) 100vw, 896px"
          className="mb-4 h-auto w-full rounded-lg"
        />
      )}
    </PostOrPage>
  );
}

export const viewport: Viewport = {
  themeColor: getColour("mys")
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;
  const post = await getPageOr404(slug);
  // optionally access and extend (rather than replace) parent metadata
  const metadata = await parent;
  const previousImages = metadata.openGraph?.images || [];
  const primaryAuthor = post.authors?.[0].name;

  const images = post.feature_image ?? previousImages;

  return {
    title: post.title ?? metadata.title,
    description: post.excerpt ?? metadata.description,
    keywords: post.tags?.map((tag) => tag.name).join(", "),
    applicationName: "MYSverse",
    authors: [
      {
        name: primaryAuthor
      }
    ],
    openGraph: {
      siteName: "MYSverse",
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

export async function generateStaticParams() {
  const pages = await getPages();
  const locales = routing.locales;

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      locale,
      slug: page.slug
    }))
  );
}
