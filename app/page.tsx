import Link from "next/link";
import * as m from "motion/react-m";
import PlayLebuhraya from "public/img/play_lebuhraya.svg";
import PlayBandaraya from "public/img/play_bandaraya.svg";

// Reusable components
import IntersectionTransition from "./_components/IntersectionTransition";
import SplitText from "./_components/SplitText";
import MotionVideoPlayer from "./_components/MotionVideoPlayer";

// Content components
import Blog from "./_components/Blog/Blog";
import Stats from "./_components/Stats/Stats";
import Contact from "./_components/Contact";
import ProjectList from "./_components/Projects";

// Misc
import { socials } from "data/socials";
import PlausibleWrapper from "./_components/PlausibleWrapper";
import { MotionConfig } from "motion/react";

export default async function Main() {
  return (
    <MotionConfig transition={{ ease: [0, 0.71, 0.2, 1.01] }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SplitText className="invisible w-full items-center justify-center text-center text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl dark:text-white">
            Step into our faithfully Malaysian metaverse.
          </SplitText>
          <m.p
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-base leading-relaxed text-gray-800 sm:mt-6 sm:text-lg sm:leading-8 dark:text-white/90"
          >
            Embark on an extraordinary journey with MYSverse, where <b>fun</b>,{" "}
            <b>education</b>, and Malaysian <b>culture</b> converge in our
            virtual experiences, on Roblox and beyond.
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
                    className="text-black-100 fill-gray-800 text-2xl leading-6 font-semibold text-gray-800 opacity-100 hover:opacity-50 dark:fill-white/90 dark:text-white/90"
                  >
                    {item.icon}
                  </Link>
                </PlausibleWrapper>
              ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: 1 }}
          >
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-6">
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
                  transition={{ duration: 0.5, delay: 1.1 }}
                  href="https://www.roblox.com/games/481538620/Bandaraya"
                  className="group bandaraya-button w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-black shadow-xs transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:w-auto dark:text-white"
                >
                  <PlayBandaraya className="inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out group-hover:fill-[#476075]" />
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
                  transition={{ duration: 0.5, delay: 1.3 }}
                  href="https://www.roblox.com/games/4892731894/Lebuhraya"
                  className="group lebuhraya-button w-full rounded-xl px-5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:w-auto dark:text-white"
                >
                  <PlayLebuhraya className="inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out group-hover:fill-[#65ad56]" />
                </m.a>
              </PlausibleWrapper>
            </div>
            <p className="mt-4 text-sm leading-6 tracking-wide text-black italic opacity-80 dark:text-white">
              ...and more open experiences for everyone, coming soon!
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

      <ProjectList />

      <IntersectionTransition>
        <Blog blogType="mys" />
      </IntersectionTransition>

      <div className="mt-16">
        <IntersectionTransition>
          <Blog blogType="nws" />
        </IntersectionTransition>
      </div>

      <IntersectionTransition>
        <Contact />
      </IntersectionTransition>
    </MotionConfig>
  );
}
