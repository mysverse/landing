import { projects } from "data/projects";
import IntersectionTransition from "../IntersectionTransition";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import MYSverseSimLogoWhite from "public/img/MYSverse_Sim_White.svg";
import ItemList from "./ItemList";

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
            <ItemList
              projects={projects.filter((item) => item.type === "MYSverse")}
            />
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
            <ItemList
              projects={projects.filter((item) => item.type === "Sim")}
            />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              MYSverse Network
            </h3>
            <p className="mt-6 text-lg leading-8">
              A collaborative platform that brings together Malaysian-themed
              projects and communities on Roblox, from MYSverse and other
              creators. By sharing resources, knowledge, and experiences, we aim
              to create a vibrant ecosystem across multiple genres that
              celebrates Malaysian culture and creativity.
            </p>
            <ItemList
              projects={projects.filter((item) => item.type === "Network")}
            />
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
              {`MYSverse is more than just a game; it's a platform for outreach and education. In addition to making an impact in the real world, we introduce ourselves to various organisations and institutions to explore how MYSverse can be used to achieve their goals, from education to community engagement.`}
            </p>
            <ItemList
              projects={projects.filter((item) => item.type === "Outreach")}
            />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}
