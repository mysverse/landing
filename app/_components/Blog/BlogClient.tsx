"use client";

// import { useEffect, useState } from "react";
import { PostsOrPages } from "@tryghost/content-api";

import type { BlogType } from "utils/ghost";
// import { getPosts } from "utils/ghost";
import { BlogPostCard } from "./BlogPostCard";

export default function BlogClient({
  blogType,
  initialPosts
}: {
  blogType: BlogType;
  initialPosts?: PostsOrPages;
}) {
  // const [posts, setPosts] = useState<PostsOrPages | undefined>(initialPosts);

  // useEffect(() => {
  //   getPosts(blogType)
  //     .then((posts) => {
  //       setPosts(posts);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [blogType]);

  return initialPosts?.map((post) => {
    post.url = `/blog/${blogType}/${post.slug}`;
    return <BlogPostCard key={post.id} post={post} />;
  });
}
