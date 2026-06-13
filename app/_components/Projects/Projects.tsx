import { projects } from "data/projects";
import IntersectionTransition from "../IntersectionTransition";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import MYSverseSimLogoWhite from "public/img/MYSverse_Sim_White.svg";
import ItemList from "./ItemList";
import { useTranslations } from "next-intl";

export default function ProjectList() {
  const t = useTranslations("Projects");

  return (
    <div className="py-12 text-gray-800 sm:py-32 dark:text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <IntersectionTransition>
          <div className="mx-auto max-w-5xl lg:mx-0" id="projects">
            <h2 className="text-black-100 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              {t("desc1")}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-800 dark:text-white">
              {t("desc2")}
            </p>
          </div>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              {t("sections.mysverse")}
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
              <span className="sr-only">{t("sections.sim")}</span>
            </h3>
            <p className="mt-6 text-lg leading-8">{t("simDesc")}</p>
            <ItemList
              projects={projects.filter((item) => item.type === "Sim")}
            />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl dark:text-white">
              {t("sections.network")}
            </h3>
            <p className="mt-6 text-lg leading-8">{t("networkDesc")}</p>
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
              {t("sections.outreach")}
            </h3>
            <p className="mt-6 text-lg leading-8">{t("outreachDesc")}</p>
            <ItemList
              projects={projects.filter((item) => item.type === "Outreach")}
            />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}
