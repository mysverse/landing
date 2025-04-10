import type { JSX } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import MafFeaturePic from "public/img/feature_mys_tentera.webp";
import PolisFeaturePic from "public/img/feature_mys_polis.webp";
import BombaFeaturePic from "public/img/feature_mys_bomba.webp";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";

import IntersectionTransition from "./IntersectionTransition";

export default function ProjectList() {
  interface Project {
    name: string;
    tagline: string | JSX.Element;
    wip?: boolean;
    launched?: string;
    type: "MYSverse" | "Sim";
    image?: string | StaticImport;
    link?: string;
  }

  const projects: Project[] = [
    {
      name: "Lebuhraya Refreshed",
      launched: "Released 2020, Refreshed 2023",
      image: LebuhrayaFeaturePic,
      type: "MYSverse",
      tagline:
        "The most relaxing game in the MYSverse lineup lets players drive around in a variety of vehicles, and socialise with fellow drivers along a sprawling highway, in addition to police and firefighter roleplays."
      // image: FeaturePic
    },
    {
      name: "Ruumah v3",
      launched: "Released April 2024",
      tagline: (
        <>
          Iterating upon our annual tradition of virtual Raya celebrations,
          experience a festive open house set in an entirely new suburban
          locale, featuring food, culture and plenty of MYSverse community
          references!
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
          An authentic <i>kampung</i> setting, replete with seaside, open house
          (tasty food!), and traditional celebrations, this exquisite embodiment
          of Malaysian culture unites every community member to gather during
          periods of festivities.
        </>
      ),
      image: RumahFeaturePic,
      type: "MYSverse"
    },
    {
      name: "Daerah",
      launched: "Coming 2025",
      tagline:
        "Taking place in a rural area inspired by the Sabahan district of Beaufort, this never-before-explored experience will be the basis of MYSverse's first significant step in offering gameplay freedom to all players, even those outside the community.",
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
        "A faithful, detailed and entertaining rendition of Kuala Lumpur redeveloped, redesigned and expanded in-house as MYSverse's major roleplay hub with city gameplay."
    },
    {
      name: "Tentera",
      launched: "Since 2016",
      tagline:
        "One of the original MYSverse roleplay agencies, the military community offers heavily-researched, authentic recreations of Malaysian Armed Forces assets and procedures utilised in dedicated mil-sim experiences.",
      image: MafFeaturePic,
      type: "Sim"
    },
    {
      name: "Polis",
      launched: "Since 2017",
      tagline:
        "The police roleplay community enforces virtual laws in MYSverse Sim experiences such as Bandaraya, conducting duties across disciplines in traffic, community policing, and high risk crime interventions.",
      image: PolisFeaturePic,
      type: "Sim"
    },
    {
      name: "Bomba",
      launched: "Since 2024",
      tagline:
        "The roleplay firefighters of MYSverse Sim use one of the platforms most detailed complement of fire equipment and vehicles to put out fires and perform rescue operations.",
      image: BombaFeaturePic,
      type: "Sim"
    }
  ];

  function ItemList({ type }: { type: "MYSverse" | "Sim" }) {
    return (
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
      >
        {projects
          .filter((item) => item.type === type)
          .map((project) => (
            <li key={project.name}>
              {project.image ? (
                <Image
                  className="mb-6 aspect-3/2 w-full rounded-2xl object-cover"
                  width={500}
                  height={250}
                  src={project.image}
                  alt="Project image"
                />
              ) : null}
              <div className="gap-x-4 sm:flex sm:flex-row">
                <h3 className="text-black-100 text-xl leading-8 font-semibold tracking-tight dark:text-white">
                  {project.name}
                </h3>
                {project.wip ? (
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset dark:text-white">
                    <svg
                      className="size-1.5 fill-red-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {project.launched}
                  </span>
                ) : project.launched ? (
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset dark:text-white">
                    <svg
                      className="size-1.5 fill-green-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {project.launched}
                  </span>
                ) : null}
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
    <div className="py-12 text-gray-800 sm:py-32 dark:text-white" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <IntersectionTransition>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-black-100 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Our projects
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              {`MYSverse developers started off as volunteers passionate about delivering authentic roleplay experiences to the equally dedicated sets of the community. We aim to preserve that same concept moving forward, with the added focus on making those top tier efforts available to all players.`}
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
      </div>
    </div>
  );
}
