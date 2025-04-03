import { getPost, getPosts } from "utils/ghost";
import Image from "next/image";

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost("MYSverse", slug);
  return (
    <article key={post.id} className="mx-auto max-w-3xl px-6 py-8">
      <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
      {post.feature_image && (
        <Image
          width={1024}
          height={1024}
          src={post.feature_image}
          alt={post.feature_image_alt ?? post.title ?? "feature_image"}
          className="mb-4 h-auto w-full rounded"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.html! }} />
      <p className="text-sm text-gray-500">
        Published on {new Date(post.published_at!).toLocaleDateString()}
      </p>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts("MYSverse", 20);
  return posts.map((post) => ({
    slug: post.slug
  }));
}
