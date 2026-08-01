import { Link } from "i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getTranslations } from "next-intl/server";
import { socials } from "data/socials";
import { legalPages } from "data/legal";
import IntersectionTransition from "app/_components/IntersectionTransition";
import PlausibleWrapper from "app/_components/PlausibleWrapper";

export default async function Footer() {
  const tFooter = await getTranslations("Footer");
  const tLegal = await getTranslations("Legal");

  return (
    <footer className="relative z-10 mx-4 mt-10 flex flex-col gap-10 pb-20 text-center md:mt-0">
      <hr className="border-edge" />
      <IntersectionTransition>
        <div className="mx-8 mt-6 flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 md:gap-x-12">
          {socials.map((item) => {
            const icon = item.icon;
            if (icon) {
              return (
                <PlausibleWrapper
                  key={item.name}
                  eventName="navClicked"
                  eventProps={{
                    props: {
                      name: item.name
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-muted fill-muted text-2xl leading-6 font-semibold transition hover:opacity-50 sm:text-xl"
                  >
                    {icon}
                    {/* sr-only below xl so icon-only links keep an
                        accessible name; visible from xl up. */}
                    <span className="sr-only text-base xl:not-sr-only xl:ml-2 xl:inline-block">
                      {item.name}
                    </span>
                  </Link>
                </PlausibleWrapper>
              );
            }
          })}
        </div>
      </IntersectionTransition>
      <div className="text-muted flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        {legalPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="underline transition hover:opacity-50"
          >
            {tLegal(`${page.key}.title`)}
          </Link>
        ))}
      </div>
      <div className="text-muted text-sm">
        <Link
          href="https://github.com/mysverse/landing"
          target="_blank"
          className="mb-4 block text-sm transition hover:opacity-50 md:text-base"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-1 text-lg" />{" "}
          {tFooter("sourceCode")}
        </Link>
        <span className="mb-1 block">{tFooter("ownedBy")}</span>
        <span className="block">{tFooter("disclaimer")}</span>
      </div>
    </footer>
  );
}
