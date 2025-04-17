import type { JSX } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PlayIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import MafFeaturePic from "public/img/feature_mys_tentera.webp";
import PolisFeaturePic from "public/img/feature_mys_polis.webp";
import BombaFeaturePic from "public/img/feature_mys_bomba.webp";
import Ruumahv4FeaturePic from "public/img/ruumah_v4_feature.webp";

import KesihatanFeature from "public/img/kesihatan_feature.webp";
import OutreachMercy from "public/img/outreach_mercy.webp";
import OutreachPDRM from "public/img/outreach_pdrm.webp";
import OutreachUITM from "public/img/outreach_uitm.webp";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";

import IntersectionTransition from "./IntersectionTransition";
import VideoPlayer from "./VideoPlayer";

type ProjectType = "MYSverse" | "Sim" | "Outreach";

export default function ProjectList() {
  interface Project {
    name: string;
    tagline: string | JSX.Element;
    wip?: boolean;
    launched?: string;
    type: ProjectType;
    image?: string | StaticImport;
    videoSrc?: {
      src: string;
      type: string;
      loopStart?: number;
      loopEnd?: number;
    }[];
    link?: string;
  }

  const projects: Project[] = [
    {
      name: "Lebuhraya",
      launched: "Released 2020",
      image: LebuhrayaFeaturePic,
      type: "MYSverse",
      videoSrc: [
        {
          src: "https://r2.mysver.se/lebuhrayaFeature.webm",
          type: "video/webm"
        }
      ],
      tagline:
        "Our most relaxing experience yet, Lebuhraya invites players to explore a vast, detailed highway system, drive an array of vehicles, socialise with fellow drivers, and immerse themselves in interactive police and firefighting roleplays."
    },
    {
      name: "Ruumah v4",
      launched: "Released April 2025",
      tagline: (
        <>
          The fourth edition of our beloved series transports players to{" "}
          <i>Kampung Air</i>, Sandakan&apos;s iconic Water Villages in Sabah,
          capturing the essence of this unique locale.
        </>
      ),
      image: Ruumahv4FeaturePic,
      type: "MYSverse",
      wip: false,
      link: "https://www.roblox.com/games/6789873305/Ruumah"
    },
    {
      name: "Ruumah v3",
      launched: "Released April 2024",
      tagline: (
        <>
          Continuing our cherished tradition, join a lively Raya open house set
          in a vibrant suburban neighbourhood filled with delicious food, rich
          culture, and special MYSverse community references!
        </>
      ),
      image: Rumah3FeaturePic,
      type: "MYSverse",
      wip: false
    },
    {
      name: "Ruumah v2",
      launched: "Released 2021",
      tagline: (
        <>
          Set in an authentic <i>kampung</i> by the seaside, this charming
          celebration of Malaysian culture offers an immersive open-house
          experience complete with mouthwatering food and traditional
          festivities, uniting the MYSverse community.
        </>
      ),
      image: RumahFeaturePic,
      type: "MYSverse"
    },
    {
      name: "Daerah",
      launched: "Coming 2025",
      tagline:
        "Explore rural Sabah in our most ambitious project yet, inspired by the district of Beaufort. Daerah marks MYSverse's first major leap into open-ended gameplay, inviting everyone to experience its unique and unexplored setting.",
      image: DaerahFeaturePic,
      type: "MYSverse",
      wip: true
    },
    {
      name: "Bandaraya",
      launched: "Released Sep 2020",
      image: BandarFeaturePic,
      type: "Sim",
      tagline:
        "An authentic, expansive, and lively recreation of Kuala Lumpur—redesigned and developed as the ultimate city roleplay hub within MYSverse.",
      link: "https://www.roblox.com/games/481538620/Bandaraya"
    },
    {
      name: "Tentera",
      launched: "Since 2016",
      tagline:
        "A cornerstone of MYSverse Sim, our military community meticulously recreates Malaysian Armed Forces assets and procedures, providing an unparalleled mil-sim experience.",
      image: MafFeaturePic,
      type: "Sim"
    },
    {
      name: "Polis",
      launched: "Since 2017",
      tagline:
        "Step into virtual law enforcement with our dedicated police roleplay community, performing realistic duties across traffic control, community policing, and high-risk crime scenarios in MYSverse Sim experiences such as Bandaraya.",
      image: PolisFeaturePic,
      type: "Sim"
    },
    {
      name: "Bomba",
      launched: "Since 2024",
      tagline:
        "Join the firefighting community of MYSverse Sim, equipped with one of the platform's most detailed sets of fire-fighting equipment and vehicles, tackling fires and rescue missions with realism and precision.",
      image: BombaFeaturePic,
      type: "Sim"
    },
    {
      name: "Kesihatan",
      launched: "Since 2024",
      tagline:
        "Join our healthcare community in MYSverse Sim, where you can roleplay as a doctor, nurse, or paramedic, providing realistic medical care and emergency response.",
      image: KesihatanFeature,
      type: "Sim"
    },
    {
      name: "MERCY Malaysia - IMU",
      launched: "2024",
      tagline:
        "A discussion with MERCY Malaysia and IMU on how MYSverse can be used to achieve their goals of promoting health and wellness in Malaysia.",
      image: OutreachMercy,
      type: "Outreach"
    },
    {
      name: "U-Digitaloka",
      launched: "2024",
      tagline:
        "Presented by UiTM Shah Alam in collaboration with the Digital Ministry of Malaysia, we were invited to showcase MYSverse, providing an immersive experience of Malaysian culture and history.",
      image: OutreachUITM,
      type: "Outreach"
    },
    {
      name: "Polis DiRaja Malaysia",
      launched: "2024",
      tagline:
        "We discussed how MYSverse can be used to educate the public about the role of the police in Malaysia, and how it can be used to promote community engagement.",
      image: OutreachPDRM,
      type: "Outreach"
    }
  ];

  function ItemList({ type }: { type: ProjectType }) {
    return (
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
      >
        {projects
          .filter((item) => item.type === type)
          .map((project) => (
            <li key={project.name}>
              <div className="relative mb-6 aspect-3/2 w-full overflow-hidden rounded-2xl">
                {project.videoSrc ? (
                  <VideoPlayer
                    videoSrc={project.videoSrc}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : project.image ? (
                  <Image
                    fill
                    src={project.image}
                    alt="Project image"
                    className="absolute inset-0 object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-row gap-x-4">
                <h3 className="text-black-100 text-xl leading-8 font-bold tracking-tight dark:text-white">
                  {project.name}
                </h3>
                <div className="flex items-center gap-x-2">
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset dark:text-white dark:ring-white/10">
                    <svg
                      className={clsx(
                        "size-1.5",
                        project.wip
                          ? "fill-red-400"
                          : project.launched
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
                  {/* Play button if link */}
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="text-black-100 group my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 transition ring-inset hover:bg-red-400 hover:text-white dark:text-white dark:ring-white/10"
                    >
                      <PlayIcon className="h-4 w-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                      Play
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-base leading-7 text-black opacity-70 dark:text-white">
                {project.tagline}
              </p>
            </li>
          ))}
      </ul>
    );
  }
  return (
    <div className="py-12 text-gray-800 sm:py-32 dark:text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <IntersectionTransition>
          <div className="mx-auto max-w-5xl lg:mx-0" id="projects">
            <h2 className="text-black-100 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Our projects
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              Did you know that MYSverse is developed and still fully operated
              by a passionate, volunteer-driven team? What started as a
              dedicated group eager to bring authentic roleplay experiences to
              life has blossomed into a thriving community.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              Today, our mission remains the same—preserving the authenticity
              and passion that started it all, while ensuring our top-tier
              virtual experiences are accessible and enjoyable for everyone!
            </p>
          </div>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              MYSverse
            </h3>
            <ItemList type="MYSverse" />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              <MYSverseSimLogo className="inline-block h-12 w-auto fill-black" />
              <span className="sr-only">MYSverse Sim</span>
            </h3>
            <p className="mt-6 text-lg leading-8">
              {`A sophisticated and realistic virtual experience, MYSverse Sim offers serious roleplay with an educational twist. Engage in disciplined activities, requiring off-platform training and certification for a deeper immersive experience.`}
            </p>
            <ItemList type="Sim" />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3
              className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white"
              id="outreach"
            >
              Outreach
            </h3>
            <p className="mt-6 text-lg leading-8">
              {`MYSverse is more than just a game; it's a platform for outreach and education. We reach out to various organisations and institutions to explore how MYSverse can be used to achieve their goals, from education to community engagement.`}
            </p>
            <ItemList type="Outreach" />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}
