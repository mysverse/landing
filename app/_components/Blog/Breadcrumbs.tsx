"use client";

import type { Tag } from "@tryghost/content-api";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { blogData, type BlogType } from "utils/ghost";
import { isExternalUrl } from "utils/isExternalUrl";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Name =
  | {
      name: string;
      shortName?: string;
    }
  | string;

export function Breadcrumbs({
  blogType,
  primaryTag,
  className
}: {
  blogType: BlogType;
  primaryTag?: Tag;
  className?: string;
}) {
  const pathname = usePathname();
  const blogInfo = blogData.find((blog) => blog.slug === blogType);

  if (!blogInfo) {
    throw new Error("Blog not found");
  }

  const pages: {
    name: Name;
    href?: string;
    current: boolean;
  }[] = [
    {
      name: {
        name: blogInfo.name,
        shortName: blogInfo.shortName
      },
      href: blogInfo.url,
      current: false
    }
  ];

  if (primaryTag && primaryTag.slug && primaryTag.name) {
    pages.push({
      name: primaryTag.name,
      href: `${blogInfo.externalUrl}/tag/${primaryTag.slug}`,
      current: false
    });
  }

  pages.forEach((page) => {
    if (pathname === page.href) {
      page.current = true;
    }
  });

  return (
    <nav aria-label="Breadcrumb" className={clsx("not-prose flex", className)}>
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        <li>
          <div>
            <Link
              href="/"
              className="text-gray-400 transition hover:text-gray-500"
            >
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page, index) => {
          const name =
            typeof page.name === "string" ? page.name : page.name.name;
          const shortName =
            typeof page.name === "string" ? undefined : page.name.shortName;
          const content =
            index === pages.length - 1 ? (
              <span>{name}</span>
            ) : (
              <>
                <span className="hidden sm:inline">{name}</span>
                <span className="inline sm:hidden">{shortName ?? name}</span>
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
                    target={isExternalUrl(page.href) ? "_blank" : undefined}
                    className="ml-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 sm:ml-4"
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="ml-2 text-sm font-medium text-gray-500 sm:ml-4">
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
