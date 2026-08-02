import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { openPositions, benefits } from "data/contribute";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
import Badge from "app/_components/ui/Badge";
import Button from "app/_components/ui/Button";
import Container from "app/_components/ui/Container";
import PositionCard from "app/[locale]/contribute/_components/PositionCard";
import { useTranslations } from "next-intl";

export default function JoinTeam() {
  const t = useTranslations("JoinTeam");
  const tContribute = useTranslations("Contribute");

  const getBenefitLabel = (label: string) => {
    const key = label
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return tContribute.has(`benefitsList.${key}.title`)
      ? tContribute(`benefitsList.${key}.title`)
      : label;
  };

  return (
    <section className="py-12 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("label")}</p>
          <h2 className="heading-2 mt-2">{t("title")}</h2>
          <p className="body-lg mx-auto mt-4 max-w-xl">{t("desc")}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {benefits
              .filter((benefit) => !benefit.headDevOnly)
              .map((benefit) => (
                <Badge as="li" key={benefit.title} variant="accent">
                  {getBenefitLabel(benefit.title)}
                </Badge>
              ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {openPositions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              placement="home"
              compact
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <PlausibleWrapper
            eventName="contributeCtaClicked"
            eventProps={{ props: { location: "homepage" } }}
          >
            <Button
              href="/contribute"
              variant="ghost"
              // The same cards render full-size on /contribute, so they morph
              // into place rather than crossfading with the rest of the page.
              sharedElement={openPositions.map((position) => ({
                key: `position-${position.id}`
              }))}
            >
              {t("cta")}
              <ArrowRightIcon className="size-4" />
            </Button>
          </PlausibleWrapper>
        </div>
      </Container>
    </section>
  );
}
