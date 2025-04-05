import { Transition, TransitionChild } from "@headlessui/react";

import Link from "next/link";

import PlayLebuhraya from "public/img/play_lebuhraya.svg";
import PlayBandaraya from "public/img/play_bandaraya.svg";

// Reusable components
import IntersectionTransition from "./_components/IntersectionTransition";
import SplitText from "./_components/SplitText";
import VideoPlayer from "./_components/VideoPlayer";

// Content components
import Blog from "./_components/Blog/Blog";
import Stats from "./_components/Stats";
import Contact from "./_components/Contact";
import ProjectList from "./_components/Projects";

// Misc
import { socials } from "data/socials";
import { fetchMetrics } from "utils/stats";
import PlausibleWrapper from "./_components/PlausibleWrapper";

export default async function Main() {
  const initialStats = await fetchMetrics();
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SplitText>Step into our faithfully Malaysian metaverse.</SplitText>
          <Transition
            enter="transform transition duration-500 delay-200"
            enterFrom="opacity-0 -translate-y-36 scale-80"
            enterTo="opacity-100 translate-y-0 scale-100"
            show
            appear
          >
            <p className="mt-6 text-lg leading-8 text-gray-800 sm:mt-5">
              Embark on an extraordinary journey with MYSverse, where <b>fun</b>
              , <b>education</b>, and Malaysian <b>culture</b> converge in our
              Roblox and beyond experiences.
            </p>
          </Transition>

          <Transition
            enter="transform transition duration-500 delay-300"
            enterFrom="opacity-0 -translate-y-36 scale-80"
            enterTo="opacity-100 translate-y-0 scale-100"
            show
            appear
          >
            <div className="mt-6 flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 sm:gap-x-6 md:gap-x-7">
              {socials.map((item) => {
                const icon = item.icon;
                if (icon) {
                  return (
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
                        className="text-black-100 fill-gray-800 text-2xl leading-6 font-semibold text-gray-800 opacity-100 hover:opacity-50"
                      >
                        {icon}
                      </Link>
                    </PlausibleWrapper>
                  );
                }
              })}
            </div>
          </Transition>

          <Transition
            as="div"
            enter="transform transition duration-500 delay-500"
            enterFrom="opacity-0 -translate-y-36 scale-80"
            enterTo="opacity-100 translate-y-0 scale-100"
            show
            appear
          >
            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <TransitionChild
                as="div"
                enter="transform transition duration-700 delay-700"
                enterFrom="opacity-0 -translate-x-48"
                enterTo="opacity-100 translate-x-0"
              >
                <PlausibleWrapper
                  eventName="ctaClicked"
                  eventProps={{
                    props: {
                      name: "Bandar"
                    }
                  }}
                >
                  <Link
                    href="https://www.roblox.com/games/481538620/Bandaraya"
                    className="group bandaraya-button rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    <PlayBandaraya className="inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out group-hover:fill-[#476075]" />
                  </Link>
                </PlausibleWrapper>
              </TransitionChild>
              <TransitionChild
                as="div"
                enter="transform transition duration-700 delay-1000"
                enterFrom="opacity-0 translate-x-48"
                enterTo="opacity-100 translate-x-0"
              >
                <PlausibleWrapper
                  eventName="ctaClicked"
                  eventProps={{
                    props: {
                      name: "Lebuhraya"
                    }
                  }}
                >
                  <Link
                    href="https://www.roblox.com/games/4892731894/Lebuhraya"
                    className="group lebuhraya-button rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    <PlayLebuhraya className="inline-flex h-[3em] fill-white px-1 transition duration-300 ease-out group-hover:fill-[#65ad56]" />
                  </Link>
                </PlausibleWrapper>
              </TransitionChild>
            </div>
            <p
              // href="#"
              className="mt-4 text-sm leading-6 tracking-wide text-black italic opacity-80"
            >
              ...and more open experiences for everyone, coming soon!
            </p>
          </Transition>
        </div>
      </div>

      <Transition
        as="div"
        enter="transform transition duration-1000 delay-300"
        enterFrom="opacity-0 translate-y-72 scale-80"
        enterTo="opacity-100 translate-y-0 scale-100"
        show
        appear
      >
        <VideoPlayer
          src={[
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
          className="mx-auto mt-12 mb-12 w-full shadow-2xl xl:max-w-7xl xl:rounded-xl"
        />
      </Transition>

      <IntersectionTransition>
        <Stats initialStats={initialStats} />
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
    </>
  );
}
