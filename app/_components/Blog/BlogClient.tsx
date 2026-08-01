"use client";

import { PostsOrPages } from "@tryghost/content-api";
import { useTranslations } from "next-intl";

import type { BlogType } from "utils/ghost";
import Card from "app/_components/ui/Card";
import { BlogPostCard } from "./BlogPostCard";

export default function BlogClient({
  blogType,
  initialPosts
}: {
  blogType: BlogType;
  initialPosts?: PostsOrPages;
}) {
  const t = useTranslations("Blog");

  if (!initialPosts?.length) {
    return (
      <Card padding="lg" className="col-span-full text-center">
        <h3 className="heading-4">{t("empty.title")}</h3>
        <p className="body-sm mt-2">{t("empty.desc")}</p>
      </Card>
    );
  }

  return initialPosts.map((post) => {
    post.url = `/blog/${blogType}/${post.slug}`;
    return <BlogPostCard key={post.id} post={post} />;
  });
}
