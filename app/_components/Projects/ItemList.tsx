import type { Variants } from "motion/react";

import {
  LinkIcon,
  PlayIcon,
  MapPinIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import Markdown from "react-markdown";
import * as m from "motion/react-m";

import type { Project } from "data/projects";

import VideoPlayer from "../VideoPlayer";
import RotatingCard from "../RotatingCard";
import { isExternalUrl } from "utils/isExternalUrl";

// parent controls staggering
const listVariants: Variants = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5 // delay between each child
    }
  }
};

// each item animates from below + faded out
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5
    }
  }
};

export default function ItemList({ projects }: { projects: Project[] }) {
  // Inject a "local" variable using the function isExternalUrl
  // to determine if the link is external or not
  const p = projects.map((project) => {
    return {
      ...project,
      local: !isExternalUrl(project.link || "")
    };
  });
  return (
    <m.ul
      role="list"
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
      variants={listVariants} // tells parent how to stagger
      initial={"hidden"} // start from hidden
      whileInView={"visible"}
      viewport={{ once: true, amount: "some" }} // trigger once, when 20% visible
    >
      {p.map((project) => (
        <m.li key={project.name} variants={itemVariants}>
          <RotatingCard
            className="relative mb-6 aspect-3/2 w-full overflow-hidden rounded-xl sm:rounded-2xl"
            // Skip Z transform for videos due to GPU glitchiness on mobile
            skipZ={project.videoSrc ? true : false}
          >
            {project.videoSrc ? (
              <VideoPlayer
                videoSrc={project.videoSrc}
                className="absolute inset-0 size-full object-cover"
              />
            ) : project.image ? (
              <Image
                fill
                src={project.image}
                alt={`Image of ${project.name}`}
                className="absolute inset-0 object-cover"
                //sizes for a 3/2 aspect ratio images, mostly that are 768x512
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, (min-width: 1536px) 16vw"
              />
            ) : null}
          </RotatingCard>
          <div className="mx-1">
            <div className="flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row">
              <h3 className="text-black-100 text-2xl font-bold tracking-tight dark:text-white">
                {project.name}
              </h3>
              <div className="mt-1 flex flex-row items-center gap-x-3 sm:mt-0 sm:flex-row-reverse">
                <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset dark:text-white dark:ring-white/10">
                  <svg
                    className={clsx(
                      "size-1.5",
                      project.status === "wip"
                        ? "fill-orange-400"
                        : project.status === "active"
                          ? "fill-green-400"
                          : "fill-gray-400"
                    )}
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {project.launched}
                </span>
                {project.location && (
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset dark:text-white dark:ring-white/10">
                    <MapPinIcon className="size-4 fill-gray-800 dark:fill-white" />
                    {project.location}
                  </span>
                )}
                {project.link && (
                  <Link
                    href={project.link}
                    target={project.local ? undefined : "_blank"}
                    prefetch={false}
                    className="text-black-100 group my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 transition ring-inset hover:bg-red-400 hover:text-white dark:text-white dark:ring-white/10"
                  >
                    {project.link.includes("roblox.com") ? (
                      project.link.includes("/games") ? (
                        <>
                          <PlayIcon className="size-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                          Play on Roblox
                        </>
                      ) : project.link.includes("/communities") ||
                        project.link.includes("/groups") ? (
                        <>
                          <UserGroupIcon className="size-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                          Join on Roblox
                        </>
                      ) : (
                        <>
                          <LinkIcon className="size-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                          Experience on Roblox
                        </>
                      )
                    ) : (
                      <>
                        <LinkIcon className="size-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                        Learn more
                      </>
                    )}
                    {!project.local && (
                      <ArrowTopRightOnSquareIcon className="inline size-4" />
                    )}
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-3 text-base leading-7 text-black opacity-70 dark:text-white">
              <Markdown>{project.tagline}</Markdown>
            </div>
          </div>
        </m.li>
      ))}
    </m.ul>
  );
}
