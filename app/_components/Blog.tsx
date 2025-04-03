import type { BlogType } from "utils/ghost";
import { getPosts } from "utils/ghost";
import BlogClient from "./BlogClient";

export default async function Blog({ blogType }: { blogType: BlogType }) {
  const initialPosts = await getPosts(blogType);
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          From {blogType === "mys" ? "our real-world blog" : " MYSverse Sim"}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {blogType === "mys"
            ? "Delve deeper into the world of MYSverse with our latest blog posts."
            : "Explore in-universe news by our virtual media service NWS."}
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <BlogClient blogType={blogType} initialPosts={initialPosts} />
      </div>
    </div>
  );
}
