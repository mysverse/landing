"use client";

import { PostsOrPages } from "@tryghost/content-api";
import React, { useEffect, useState } from "react";
import api from "utils/ghost";
import Image from "next/image";
// import Link from "next/link";

// Helper function to truncate text
// const truncateText = (text: string, length: number) => {
//   if (text.length <= length) return text;
//   return text.substring(0, length) + "...";
// };

const Blog = () => {
  const [posts, setPosts] = useState<PostsOrPages>();

  useEffect(() => {
    api.posts
      .browse({ limit: 4, include: ["tags", "authors"] })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Delve deeper into the world of MYSverse with our latest blog posts.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts?.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <Image
                alt={post.feature_image_alt!}
                src={post.feature_image!}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                width={1024}
                height={1024}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={post.published_at!} className="mr-8">
                  {new Date(post.published_at!).toLocaleDateString()}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    {post.authors && post.authors[0].profile_image && (
                      <Image
                        alt=""
                        src={post.authors[0].profile_image}
                        className="h-6 w-6 flex-none rounded-full bg-white/10"
                        width={32}
                        height={32}
                      />
                    )}
                    {post.authors![0].name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={post.url}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
