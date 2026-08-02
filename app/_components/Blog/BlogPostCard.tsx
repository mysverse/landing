"use client";

import type { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "app/_components/ui/TransitionLink";
import { useTranslations } from "next-intl";
import RotatingCard from "../RotatingCard";
import { LocalTime } from "../LocalTime";

// BlogPostCard component to handle the tilt effect
export const BlogPostCard = ({ post }: { post: PostOrPage }) => {
  const t = useTranslations("Blog");
  // Shared with the post's hero image, so the card's feature image morphs into
  // it across the navigation. Home cards link straight to the detail page, so
  // this key has to match the one on the blog index too.
  const sharedKey = `blog-image-${post.slug}`;
  return (
    <RotatingCard className="group relative isolate flex flex-col justify-end overflow-hidden sm:aspect-video sm:rounded-2xl sm:px-8 sm:pb-8">
      <Link
        href={post.url ?? "#"}
        sharedElement={{ key: sharedKey, crop: true }}
        className={post.url ? "" : "pointer-events-none"}
      >
        <Image
          alt={
            post.feature_image_alt ??
            t("alt.feature", { title: post.title ?? "" })
          }
          src={post.feature_image ?? ""}
          data-vt={sharedKey}
          className="relative inset-0 -z-10 aspect-video rounded-lg object-cover transition duration-300 sm:absolute sm:h-full sm:w-full sm:rounded-none sm:group-hover:scale-[1.03]"
          width={1920}
          height={1080}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="relative inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/30 sm:absolute" />
        <div className="relative inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset sm:absolute" />

        <div className="mt-6 flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-black/40 sm:mt-0 sm:text-white/70 dark:text-white">
          <LocalTime
            date={new Date(post.published_at!)}
            className="mr-8"
            type="distance"
          />
          <div className="-ml-4 flex items-center gap-x-4">
            <svg
              viewBox="0 0 2 2"
              className="-ml-0.5 h-0.5 w-0.5 flex-none fill-black/50 sm:fill-white/50"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <div className="flex gap-x-2.5">
              {post.authors &&
                post.authors[0].profile_image &&
                post.authors[0].profile_image.trim() !== "" && (
                  <Image
                    alt={t("alt.author", {
                      name: post.authors[0].name ?? ""
                    })}
                    src={post.authors[0].profile_image}
                    className="size-6 flex-none rounded-full bg-black/10 sm:bg-white dark:bg-white/10"
                    width={32}
                    height={32}
                  />
                )}
              {post.authors![0].name}
            </div>
          </div>
        </div>
        <h3 className="mt-3 text-lg leading-6 font-semibold text-black underline-offset-4 group-hover:underline sm:text-white dark:text-white">
          <span className="absolute inset-0" />
          {post.title}
        </h3>
      </Link>
    </RotatingCard>
  );
};
