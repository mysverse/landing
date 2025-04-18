"use client";

import type { JSX } from "react";
import type { Variants } from "motion/react";

import { LinkIcon, PlayIcon, MapPinIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import * as m from "motion/react-m";

import type { VideoSource } from "./VideoPlayer";
import IntersectionTransition from "./IntersectionTransition";
import VideoPlayer from "./VideoPlayer";

import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import Bandarayav4FeaturePic from "public/img/bandaraya_v4_feature.webp";
import MafFeaturePic from "public/img/feature_mys_tentera.webp";
import PolisFeaturePic from "public/img/feature_mys_polis.webp";
import BombaFeaturePic from "public/img/feature_mys_bomba.webp";
import Ruumahv4FeaturePic from "public/img/ruumah_v4_feature.webp";
import KesihatanFeature from "public/img/kesihatan_feature.webp";
import OutreachMercy from "public/img/outreach_mercy.webp";
import OutreachPDRM from "public/img/outreach_pdrm.webp";
import OutreachUITM from "public/img/outreach_uitm.webp";
import OutreachEkelas from "public/img/outreach_ekelas.webp";
import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import MYSverseSimLogoWhite from "public/img/MYSverse_Sim_White.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import RotatingCard from "./RotatingCard";

type ProjectType = "MYSverse" | "Sim" | "Outreach";

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

type ProjectStatus = "active" | "inactive" | "wip";

interface Project {
  type: ProjectType;
  name: string;
  tagline: string | JSX.Element;
  location?: string;
  status?: ProjectStatus;
  launched?: string;
  image?: string | StaticImport;
  videoSrc?: VideoSource[];
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
      "Lebuhraya offers a serene driving experience along an expansive, well-crafted highway system. From vehicle cruising to interactive police and firefighter roleplay, it’s the perfect way to unwind while immersing yourself in everyday Malaysian life.",
    link: "https://www.roblox.com/games/4892731894/Lebuhraya",
    status: "active"
  },
  {
    name: "Ruumah v4",
    launched: "Released April 2025",
    tagline: (
      <>
        The latest chapter in our festive Raya series brings players to{" "}
        <i>Kampung Air</i>, the iconic water villages of Sandakan, Sabah—
        highlighting a truly unique and picturesque Malaysian setting.
      </>
    ),
    image: Ruumahv4FeaturePic,
    type: "MYSverse",
    link: "https://www.roblox.com/games/6789873305/Ruumah",
    status: "active"
  },
  {
    name: "Ruumah v3",
    launched: "Released April 2024",
    tagline: (
      <>
        Celebrate Raya in a vibrant suburban setting, complete with local
        delicacies, cultural landmarks, and references beloved by the MYSverse
        community. A joyful continuation of our annual virtual open house
        tradition.
      </>
    ),
    image: Rumah3FeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    name: "Ruumah v2",
    launched: "Released 2021",
    videoSrc: [
      {
        src: "https://r2.mysver.se/ruumah2Feature.webm",
        type: "video/webm"
      }
    ],
    tagline: (
      <>
        Set in a charming coastal <i>kampung</i>, this edition brings
        traditional festive celebrations to life with heartfelt detail,
        delicious food, and community togetherness.
      </>
    ),
    image: RumahFeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    name: "Daerah",
    launched: "Coming 2025",
    tagline:
      "Inspired by the rural Sabahan district of Beaufort, Daerah is our most ambitious project yet. It introduces open-ended, narrative-rich gameplay that invites all players—new and returning—to discover something entirely fresh within the MYSverse.",
    image: DaerahFeaturePic,
    type: "MYSverse",
    status: "wip"
  },
  {
    name: "Bandaraya v3",
    launched: "Released Sep 2020",
    image: BandarFeaturePic,
    type: "Sim",
    status: "active",
    tagline:
      "An immersive reimagining of Kuala Lumpur designed for roleplay at every level—from daily life to official duties. Serving as MYSverse’s primary city hub, it's detailed, dynamic, and constantly evolving.",
    link: "https://www.roblox.com/games/481538620/Bandaraya"
  },
  {
    name: "Bandaraya v4",
    launched: "Coming 2025",
    status: "wip",
    image: Bandarayav4FeaturePic,
    type: "Sim",
    tagline:
      "Our next major city update pushes into Dataran Merdeka, bringing with it iconic landmarks, enhanced vehicle systems, and expanded roleplay jobs—all while staying true to the city’s heart and heritage."
  },
  {
    name: "Tentera MYSverse",
    launched: "Since 2016",
    tagline:
      "A long-standing pillar of MYSverse Sim, our military roleplay agency features carefully researched equipment, procedures, and training to deliver an authentic and respectful representation of Malaysia’s Armed Forces.",
    image: MafFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/tentera/",
    status: "active"
  },
  {
    name: "Polis MYSverse",
    launched: "Since 2017",
    tagline:
      "From traffic management to tactical operations, our police roleplay community is built around realism, teamwork, and service. It’s a cornerstone of everyday life in MYSverse Sim environments like Bandaraya.",
    image: PolisFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/polis/",
    status: "active"
  },
  {
    name: "Bomba MYSverse",
    launched: "Since 2024",
    tagline:
      "Join the MYSverse firefighting community and respond to emergencies with one of the most advanced sets of virtual fire-rescue equipment available on Roblox.",
    image: BombaFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/bomba/",
    status: "active"
  },
  {
    name: "Kesihatan MYSverse",
    launched: "Since 2025",
    tagline:
      "Our healthcare roleplay community gives players the chance to act as doctors, nurses, and paramedics—engaging in meaningful emergency scenarios and public healthcare outreach within the MYSverse Sim ecosystem.",
    image: KesihatanFeature,
    type: "Sim",
    link: "https://sim.mysver.se/kesihatan/",
    status: "active"
  },
  {
    name: "MERCY Malaysia - IMU",
    launched: "November 2024",
    location: "vOffice Mont Kiara",
    tagline:
      "Together with MERCY Malaysia and IMU, we explored how immersive digital experiences like MYSverse can support their goals around health awareness.",
    image: OutreachMercy,
    type: "Outreach"
  },
  {
    name: "U-Digitaloka",
    launched: "June 2024",
    tagline:
      "Showcased at UiTM Shah Alam in partnership with the Ministry of Digital, this outreach highlighted how MYSverse can promote national identity through cultural and historical storytelling.",
    location: "UiTM Shah Alam",
    image: OutreachUITM,
    type: "Outreach"
  },
  {
    name: "Polis DiRaja Malaysia",
    launched: "January 2024",
    location: "Ibu Pejabat Polis Bukit Aman",
    tagline:
      "Our ongoing engagement with the Royal Malaysia Police focuses on using virtual spaces to foster public awareness, safety, and better understanding of policing in Malaysia.",
    image: OutreachPDRM,
    type: "Outreach"
  },
  {
    name: "Maxis eKelas Minigames",
    launched: "Completed 2022",
    tagline:
      "Independently developed by core MYSverse team members for Maxis eKelas, these educational minigames part of the Kancil Award-winning Misi Jelajah Digital promote STEM learning through fun, interactive experiences.",
    image: OutreachEkelas,
    type: "Outreach",
    link: "https://ekelas-minigames.yan.gg/"
  }
];

function ItemList({ type }: { type: ProjectType }) {
  return (
    <m.ul
      role="list"
      className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
      variants={listVariants} // tells parent how to stagger
      initial={"hidden"} // start from hidden
      whileInView={"visible"}
      onViewportEnter={(entry) => console.log(entry?.isIntersecting)}
      viewport={{ once: true, amount: "some" }} // trigger once, when 20% visible
    >
      {projects
        .filter((item) => item.type === type)
        .map((project) => (
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
                      <MapPinIcon className="h-4 w-4 fill-gray-800 dark:fill-white" />
                      {project.location}
                    </span>
                  )}
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="text-black-100 group my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 transition ring-inset hover:bg-red-400 hover:text-white dark:text-white dark:ring-white/10"
                    >
                      {project.link.includes("roblox.com") ? (
                        <>
                          <PlayIcon className="h-4 w-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                          Play on Roblox
                        </>
                      ) : (
                        <>
                          <LinkIcon className="h-4 w-4 fill-gray-800 group-hover:fill-white dark:fill-white" />
                          Learn more
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
              <p className="mt-3 text-base leading-7 text-black opacity-70 dark:text-white">
                {project.tagline}
              </p>
            </div>
          </m.li>
        ))}
    </m.ul>
  );
}

export default function ProjectList() {
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
              <MYSverseSimLogo className="inline-block h-12 w-auto fill-black dark:hidden" />
              <MYSverseSimLogoWhite className="hidden h-12 w-auto fill-white dark:inline-block" />
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
              In real life
            </h3>
            <p className="mt-6 text-lg leading-8">
              {`MYSverse is more than just a game; it's a platform for outreach and education. We introduce ourselves to various organisations and institutions to explore how MYSverse can be used to achieve their goals, from education to community engagement.`}
            </p>
            <ItemList type="Outreach" />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}
