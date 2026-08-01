import { projects } from "data/projects";
import IntersectionTransition from "../IntersectionTransition";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import MYSverseSimLogoWhite from "public/img/MYSverse_Sim_White.svg";
import ItemList from "./ItemList";
import Container from "app/_components/ui/Container";
import { useTranslations } from "next-intl";

export default function ProjectList() {
  const t = useTranslations("Projects");

  return (
    <section className="py-12 sm:py-24">
      <Container>
        <IntersectionTransition>
          <div className="mx-auto max-w-5xl lg:mx-0" id="projects">
            <h2 className="heading-2">{t("title")}</h2>
            <p className="body-lg mt-6">{t("desc1")}</p>
            <p className="body-lg mt-6">{t("desc2")}</p>
          </div>
          <div className="mt-16">
            <h3 className="heading-3 sm:text-3xl">{t("sections.mysverse")}</h3>
            <ItemList
              projects={projects.filter((item) => item.type === "MYSverse")}
            />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="heading-3 sm:text-3xl">
              <MYSverseSimLogo className="inline-block h-12 w-auto fill-black dark:hidden" />
              <MYSverseSimLogoWhite className="hidden h-12 w-auto fill-white dark:inline-block" />
              <span className="sr-only">{t("sections.sim")}</span>
            </h3>
            <p className="body-lg mt-6">{t("simDesc")}</p>
            <ItemList
              projects={projects.filter((item) => item.type === "Sim")}
            />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="heading-3 sm:text-3xl">{t("sections.network")}</h3>
            <p className="body-lg mt-6">{t("networkDesc")}</p>
            <ItemList
              projects={projects.filter((item) => item.type === "Network")}
            />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="heading-3 sm:text-3xl" id="outreach">
              {t("sections.outreach")}
            </h3>
            <p className="body-lg mt-6">{t("outreachDesc")}</p>
            <ItemList
              projects={projects.filter((item) => item.type === "Outreach")}
            />
          </div>
        </IntersectionTransition>
      </Container>
    </section>
  );
}
