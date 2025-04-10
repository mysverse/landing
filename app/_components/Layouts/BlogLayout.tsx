import { PostOrPage } from "@tryghost/content-api";

import type { BlogType } from "utils/ghost";
import { getPost } from "utils/ghost";
import { Breadcrumbs } from "app/_components/Blog/Breadcrumbs";
import PageAnimation from "app/_components/PageAnimation";

export default async function BlogLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ blogType: BlogType; slug?: string }>;
}) {
  const { blogType, slug } = await params;
  let post: PostOrPage | undefined;
  if (blogType && slug) {
    post = await getPost(blogType, slug);
  }
  return (
    <PageAnimation>
      {blogType && (
        <Breadcrumbs
          blogType={blogType}
          primaryTag={post?.tags?.[0]}
          className="mb-4"
        />
      )}
      {children}
    </PageAnimation>
  );
}
