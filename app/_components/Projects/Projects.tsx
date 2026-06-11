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
              by volunteers? What started as a small group making authentic
              Malaysian roleplay experiences has grown into a community of
              thousands.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              Today, our mission remains the same: keeping the authenticity that
              started it all, while making our experiences accessible and
              enjoyable for everyone.
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
              {`MYSverse Sim offers serious, realistic roleplay with an educational twist. Activities are disciplined and structured, with off-platform training and certification for those who want to go deeper.`}
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
              creators. By sharing resources, knowledge and experiences, we hope
              to grow a network of projects across many genres that celebrates
              Malaysian culture and creativity.
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
              {`MYSverse also has a life outside the game. We work with organisations and institutions to explore how MYSverse can support their goals, from education to community engagement.`}
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
