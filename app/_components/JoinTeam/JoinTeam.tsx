import { Link } from "i18n/navigation";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { openPositions, benefits } from "data/contribute";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
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
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-primary text-base/7 font-semibold">{t("label")}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/80">
          {t("desc")}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {benefits
            .filter((benefit) => !benefit.headDevOnly)
            .map((benefit) => (
              <li
                key={benefit.title}
                className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium"
              >
                {getBenefitLabel(benefit.title)}
              </li>
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
          <Link
            href="/contribute"
            className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
          >
            {t("cta")}
            <ArrowRightIcon className="size-4" />
          </Link>
        </PlausibleWrapper>
      </div>
    </div>
  );
}
