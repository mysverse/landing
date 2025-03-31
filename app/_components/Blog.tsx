"use client";

import type { PointerEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { PostsOrPages, PostOrPage } from "@tryghost/content-api";
import { motion, useSpring } from "motion/react";
import Image from "next/image";

import { api, api_nws } from "utils/ghost";

// BlogPostCard component to handle the tilt effect
const BlogPostCard = ({ post }: { post: PostOrPage }) => {
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);
  const z = useSpring(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const calculateTilt = (event: PointerEvent<HTMLElement>) => {
    if (!cardRef.current) return { rotateX: 0, rotateY: 0 };

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert coordinates to percentages
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    // Max tilt of 10 degrees
    return {
      rotateX: 10 * (0.5 - yPercent),
      rotateY: 10 * (xPercent - 0.5)
    };
  };

  return (
    <motion.article
      ref={cardRef}
      key={post.id}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 aspect-video"
      style={{
        rotateX,
        rotateY,
        z,
        transformPerspective: 1000
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onPointerMove={(e) => {
        const tilt = calculateTilt(e);
        rotateX.set(tilt.rotateX);
        rotateY.set(tilt.rotateY);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        z.set(0);
      }}
      onPointerEnter={() => {
        z.set(-10);
      }}
    >
      <Image
        alt={post.feature_image_alt ?? "Image of blog post"}
        src={post.feature_image ?? ""}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={1024}
        height={1024}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/30" />
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
                alt="Image of author"
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
    </motion.article>
  );
};

export default function Blog({ blogType }: { blogType: "MYSverse" | "NWS" }) {
  const [posts, setPosts] = useState<PostsOrPages>();
  const ghostApi = blogType === "MYSverse" ? api : api_nws;

  useEffect(() => {
    ghostApi.posts
      .browse({ limit: 4, include: ["tags", "authors"] })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [ghostApi]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From{" "}
          {blogType === "MYSverse" ? "our real-world blog" : " MYSverse Sim"}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {blogType === "MYSverse"
            ? "Delve deeper into the world of MYSverse with our latest blog posts."
            : "Explore in-universe news by our virtual media service NWS."}
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        {posts?.map((post) => <BlogPostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
