import { MotionConfig } from "motion/react";
import IntersectionTransition from "app/_components/IntersectionTransition";
import Container from "app/_components/ui/Container";
import { roles } from "data/contribute";
import ContributeHero from "./_components/ContributeHero";
import ContributeStats from "./_components/ContributeStats";
import OpenPositions from "./_components/OpenPositions";
import BenefitsGrid from "./_components/BenefitsGrid";
import DevHubSection from "./_components/DevHubSection";
import TeamImpact from "./_components/TeamImpact";
import ApplyProcess from "./_components/ApplyProcess";
import RoleCard from "./_components/RoleCard";
import JoinCTA from "./_components/JoinCTA";

import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contribute" });
  return {
    title: t("title"),
    description: t("desc"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDesc"),
      images: [
        {
          url: "/contribute_og.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt")
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDesc"),
      images: ["/contribute_og.png"]
    }
  };
}

export default async function ContributePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contribute");

  const getRoleTitle = (title: string) => {
    const key = title.toLowerCase().replace(/[^a-z0-9_]+/g, "_");
    return t.has(`roles.${key}.title`) ? t(`roles.${key}.title`) : title;
  };

  const getRoleDesc = (title: string, desc: string) => {
    const key = title.toLowerCase().replace(/[^a-z0-9_]+/g, "_");
    return t.has(`roles.${key}.description`)
      ? t(`roles.${key}.description`)
      : desc;
  };

  const getRoleFeatures = (title: string, features: string[]) => {
    const key = title.toLowerCase().replace(/[^a-z0-9_]+/g, "_");
    return features.map((item, index) =>
      t.has(`roles.${key}.features.${index}`)
        ? t(`roles.${key}.features.${index}`)
        : item
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <Container>
        {/* Hero */}
        <IntersectionTransition>
          <ContributeHero />
        </IntersectionTransition>

        {/* Stats */}
        <div className="py-12 sm:py-24">
          <IntersectionTransition>
            <ContributeStats />
          </IntersectionTransition>
        </div>

        {/* Real-world Impact Showcase */}
        <div className="pb-12 sm:pb-24">
          <IntersectionTransition>
            <TeamImpact />
          </IntersectionTransition>
        </div>

        {/* Open Positions - the centerpiece */}
        <IntersectionTransition>
          <OpenPositions />
        </IntersectionTransition>

        {/* Benefits at a glance */}
        <div className="py-12 sm:py-24">
          <IntersectionTransition>
            <BenefitsGrid />
          </IntersectionTransition>
        </div>

        {/* DevHub and incentives detailed overview */}
        <IntersectionTransition>
          <DevHubSection />
        </IntersectionTransition>

        {/* How applying works */}
        <div className="pt-12 sm:pt-24">
          <IntersectionTransition>
            <ApplyProcess />
          </IntersectionTransition>
        </div>

        {/* Volunteer model narrative (trimmed) */}
        <div className="py-12 sm:py-24">
          <IntersectionTransition>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">{t("model.label")}</p>
              <h2 className="heading-2 mt-2">{t("model.title")}</h2>
              <p className="body-lg mt-6">{t("model.desc")}</p>
            </div>
          </IntersectionTransition>
        </div>

        {/* Other ways to contribute (demoted) */}
        <IntersectionTransition>
          <div className="text-center">
            <p className="eyebrow">{t("secondary.label")}</p>
            <h2 className="heading-2 mt-2">{t("secondary.title")}</h2>
            <p className="body-lg mx-auto mt-4 max-w-2xl">
              {t("secondary.desc")}
            </p>
          </div>
        </IntersectionTransition>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <IntersectionTransition key={role.title}>
              <RoleCard
                icon={role.icon}
                title={getRoleTitle(role.title)}
                description={getRoleDesc(role.title, role.description)}
                features={getRoleFeatures(role.title, role.features)}
              />
            </IntersectionTransition>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="py-12 sm:py-24">
          <IntersectionTransition>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-2">{t("questions.title")}</h2>
              <p className="body-lg mt-4">{t("questions.desc")}</p>
            </div>
            <div className="mt-10">
              <JoinCTA />
            </div>
          </IntersectionTransition>
        </div>
      </Container>
    </MotionConfig>
  );
}
