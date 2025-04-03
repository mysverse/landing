"use client";

import { useEffect, useState } from "react";
import { PostsOrPages } from "@tryghost/content-api";

import { getPosts } from "utils/ghost";
import { BlogPostCard } from "./BlogPostCard";

export default function BlogClient({
  blogType,
  initialPosts
}: {
  blogType: "MYSverse" | "NWS";
  initialPosts?: PostsOrPages;
}) {
  const [posts, setPosts] = useState<PostsOrPages | undefined>(initialPosts);

  useEffect(() => {
    getPosts(blogType)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [blogType]);

  return posts?.map((post) => {
    if (blogType === "MYSverse") {
      post.url = `/blog/${post.slug}`;
    }
    return <BlogPostCard key={post.id} post={post} />;
  });
}
