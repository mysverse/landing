import { Link } from "i18n/navigation";
import * as m from "motion/react-m";
import PlayLebuhraya from "public/img/play_lebuhraya.svg";
import PlayBandaraya from "public/img/play_bandaraya.svg";
import PlaySumaya from "public/img/play_sumaya.svg";

// Reusable components
import IntersectionTransition from "app/_components/IntersectionTransition";
import SplitText from "app/_components/SplitText";
import MotionVideoPlayer from "app/_components/MotionVideoPlayer";

// Content components
import Blog from "app/_components/Blog/Blog";
import Stats from "app/_components/Stats/Stats";
import Contact from "app/_components/Contact";
import ProjectList from "app/_components/Projects/Projects";
import JoinTeam from "app/_components/JoinTeam/JoinTeam";

// Misc
import { socials } from "data/socials";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
import { MotionConfig } from "motion/react";
import { EASE_OUT } from "app/_components/Motion/transitions";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { languageAlternates } from "utils/alternates";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateMetadata() {
  return { alternates: languageAlternates("") };
}

export default async function Main({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <MotionConfig transition={{ ease: EASE_OUT }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SplitText className="heading-1 w-full items-center justify-center text-center">
            {t("hero.title")}
          </SplitText>
          <m.p
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="body-base mt-4 sm:mt-6 sm:text-lg sm:leading-8"
          >
            {t.rich("hero.tagline", {
              b: (chunks) => <b>{chunks}</b>
            })}
          </m.p>
          <m.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 sm:mt-7 sm:gap-x-6 md:gap-x-7"
          >
            {socials
              .filter((item) => item.icon)
              .map((item) => (
                <PlausibleWrapper
                  key={item.name}
                  eventName="navClicked"
                  eventProps={{
                    props: { name: item.name }
                  }}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-strong fill-strong text-2xl leading-6 font-semibold opacity-100 transition hover:opacity-50"
                  >
                    {item.icon}
                    {/* Icon-only link needs an accessible name. */}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </PlausibleWrapper>
              ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 1 }}
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <PlausibleWrapper
                eventName="ctaClicked"
                eventProps={{
                  props: {
                    name: "Sumaya"
                  }
                }}
              >
                <m.a
                  initial={{ opacity: 0, y: 32, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  href="https://www.roblox.com/games/137577526370180"
                  className="group sumaya-button shadow-sumaya-deep/20 focus-visible:outline-sumaya relative w-full max-w-md rounded-2xl px-6 py-3.5 text-sm font-semibold text-black shadow-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:min-w-96 dark:text-white"
                >
                  <PlaySumaya className="group-hover:fill-sumaya-deep inline-flex h-[3.2em] fill-white px-1 transition duration-300 ease-out" />
                  {/* Logo-only CTA needs an accessible name. */}
                  <span className="sr-only">
                    {t("hero.playGame", { game: "Sumaya" })}
                  </span>
                  <m.span
                    initial={{ opacity: 0, y: -8, scale: 0.92 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.06, 1]
                    }}
                    transition={{
                      opacity: { duration: 0.25, delay: 1.45 },
                      y: { duration: 0.25, delay: 1.45 },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 0.35,
                        ease: "easeInOut"
                      }
                    }}
                    className="text-sumaya-deep absolute -top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.65rem] leading-none font-bold tracking-wide uppercase shadow-lg ring-1 ring-black/5"
                  >
                    <span className="relative flex size-2">
                      <span className="bg-sumaya absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                      <span className="bg-sumaya relative inline-flex size-2 rounded-full" />
                    </span>
                    {t("hero.sumayaBadge")}
                  </m.span>
                </m.a>
              </PlausibleWrapper>

              <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-6">
                <PlausibleWrapper
                  eventName="ctaClicked"
                  eventProps={{
                    props: {
                      name: "Bandar"
                    }
                  }}
                >
                  <m.a
                    initial={{ opacity: 0, x: -128 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.25 }}
                    href="https://www.roblox.com/games/481538620/Bandaraya"
                    className="group bandaraya-button focus-visible:outline-bandaraya w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-black shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto dark:text-white"
                  >
                    <PlayBandaraya className="group-hover:fill-bandaraya inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out" />
                    {/* Logo-only CTA needs an accessible name. */}
                    <span className="sr-only">
                      {t("hero.playGame", { game: "Bandaraya" })}
                    </span>
                  </m.a>
                </PlausibleWrapper>
                <PlausibleWrapper
                  eventName="ctaClicked"
                  eventProps={{
                    props: {
                      name: "Lebuhraya"
                    }
                  }}
                >
                  <m.a
                    initial={{ opacity: 0, x: 128 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.35 }}
                    href="https://www.roblox.com/games/4892731894/Lebuhraya"
                    className="group lebuhraya-button focus-visible:outline-lebuhraya w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-black shadow-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto dark:text-white"
                  >
                    <PlayLebuhraya className="group-hover:fill-lebuhraya inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out" />
                    {/* Logo-only CTA needs an accessible name. */}
                    <span className="sr-only">
                      {t("hero.playGame", { game: "Lebuhraya" })}
                    </span>
                  </m.a>
                </PlausibleWrapper>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 tracking-wide text-black italic opacity-80 dark:text-white">
              {t("hero.comingSoon")}
            </p>
          </m.div>
        </div>
      </div>

      <MotionVideoPlayer
        videoSrc={[
          {
            src: "https://r2.mysver.se/websiteFeature.webm",
            type: "video/webm"
          },
          {
            src: "https://r2.mysver.se/websiteFeature-vp9.webm",
            type: "video/webm"
          },
          {
            src: "https://r2.mysver.se/websiteFeature.mp4",
            type: "video/mp4"
          }
        ]}
        initial={{ opacity: 0, y: 72 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="mx-auto mt-12 mb-12 w-full shadow-2xl xl:max-w-7xl xl:rounded-xl"
        preload="auto"
      />

      <IntersectionTransition>
        <Stats />
      </IntersectionTransition>

      <IntersectionTransition>
        <JoinTeam />
      </IntersectionTransition>

      <ProjectList />

      <IntersectionTransition>
        <Blog blogType="mys" />
      </IntersectionTransition>

      <IntersectionTransition>
        <Blog blogType="nws" />
      </IntersectionTransition>

      <IntersectionTransition>
        <Contact />
      </IntersectionTransition>
    </MotionConfig>
  );
}
