"use client";

import type { PostOrPage } from "@tryghost/content-api";
import Image from "next/image";
import Link from "next/link";
import RotatingCard from "../RotatingCard";
import { LocalTime } from "../LocalTime";

// BlogPostCard component to handle the tilt effect
export const BlogPostCard = ({ post }: { post: PostOrPage }) => {
  return (
    <RotatingCard className="relative isolate flex flex-col justify-end overflow-hidden sm:aspect-video sm:rounded-2xl sm:px-8 sm:pb-8">
      <Link
        prefetch={false}
        href={post.url ?? "#"}
        className={post.url ? "" : "pointer-events-none"}
      >
        <Image
          alt={post.feature_image_alt ?? "Image of blog post"}
          src={post.feature_image ?? ""}
          className="relative inset-0 -z-10 aspect-video rounded-lg object-cover sm:absolute sm:h-full sm:w-full sm:rounded-none"
          width={1920}
          height={1080}
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
              {post.authors && post.authors[0].profile_image && (
                <Image
                  alt="Image of author"
                  src={post.authors[0].profile_image}
                  className="size-6 flex-none rounded-full bg-black/10 sm:bg-white dark:bg-slate-800/10"
                  width={32}
                  height={32}
                />
              )}
              {post.authors![0].name}
            </div>
          </div>
        </div>
        <h3 className="mt-3 text-lg leading-6 font-semibold text-black sm:text-white dark:text-white">
          <span className="absolute inset-0" />
          {post.title}
        </h3>
      </Link>
    </RotatingCard>
  );
};
