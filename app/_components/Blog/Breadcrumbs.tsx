import type { Tag } from "@tryghost/content-api";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { BlogType } from "utils/ghost";

export function Breadcrumbs({
  blogType,
  primaryTag
}: {
  blogType: BlogType;
  primaryTag?: Tag;
}) {
  type Name =
    | {
        name: string;
        shortName?: string;
      }
    | string;

  const blogName: Name =
    blogType === "mys"
      ? {
          name: "MYSverse Blog",
          shortName: "MYSverse"
        }
      : {
          name: "National Wire Service",
          shortName: "NWS"
        };

  const blogUrl = blogType === "mys" ? "/blog/mys" : "/blog/nws";

  const pages: {
    name: Name;
    href?: string;
    current: boolean;
  }[] = [
    {
      name: blogName,
      href: blogUrl,
      current: false
    }
  ];

  if (primaryTag && primaryTag.slug && primaryTag.name) {
    pages.push({
      name: primaryTag.name,
      // href: `${blogUrl}/tag/${primaryTag.slug}`,
      current: false
    });
  }

  pages[pages.length - 1].current = true;
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-1 lg:space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => {
          const content = (
            <>
              <span className="hidden lg:inline">
                {typeof page.name === "string" ? page.name : page.name.name}
              </span>
              <span className="inline lg:hidden">
                {typeof page.name === "string"
                  ? page.name
                  : (page.name.shortName ?? page.name.name)}
              </span>
            </>
          );
          return (
            <li
              key={typeof page.name === "string" ? page.name : page.name.name}
            >
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                {page.href && !page.current ? (
                  <Link
                    href={page.href}
                    className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 lg:ml-4"
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="ml-1 text-sm font-medium text-gray-500 lg:ml-4">
                    {content}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
