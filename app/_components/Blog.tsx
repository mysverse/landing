"use client";

import { PostsOrPages } from "@tryghost/content-api";
import React, { useEffect, useState } from "react";
import api from "utils/ghost";
import Image from "next/image";
import Link from "next/link";

// Helper function to truncate text
const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

const Blog = () => {
  const [posts, setPosts] = useState<PostsOrPages>();

  useEffect(() => {
    api.posts
      .browse({ limit: 3, include: ["tags", "authors"] })
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="py-12 sm:py-16 text-gray-300" id="blog_posts">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            Our blog posts
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {`Yes, we write too. The MYSverse Blog hosts some of the group's best writing talents and provides valuable insights into MYSverse history, and offers both a free and premium email newsletter to help keep everyone updated.`}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={post.url || "#"}
              target="_blank"
              className="block bg-gray-800 rounded-lg overflow-hidden hover:shadow-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <>
                {post.feature_image ? (
                  <Image
                    src={post.feature_image}
                    alt={
                      post.feature_image_alt ??
                      post.feature_image_caption ??
                      "Feature image"
                    }
                    width={1024}
                    height={512}
                    unoptimized
                    className="w-full h-auto rounded-t-lg"
                  />
                ) : null}
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {post.title}
                  </h2>
                  <p className="font-medium text-white mb-1">
                    {post.created_at
                      ? `Posted ${new Date(post.created_at).toLocaleDateString()}`
                      : null}
                  </p>

                  {post.excerpt ? (
                    <p className="text-gray-100">
                      {truncateText(post.excerpt, 150)}
                    </p>
                  ) : null}
                </div>
              </>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
