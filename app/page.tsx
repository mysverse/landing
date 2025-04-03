import type { JSX } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Transition, TransitionChild } from "@headlessui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

import RobloxLogo from "public/img/Roblox_Logo.svg";
// import FeaturePic from "public/img/mysverse_feature.webp";
import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import MafFeaturePic from "public/img/feature_mys_tentera.webp";
import PolisFeaturePic from "public/img/feature_mys_polis.webp";
import BombaFeaturePic from "public/img/feature_mys_bomba.webp";

import PlayLebuhraya from "public/img/play_lebuhraya.svg";
import PlayBandaraya from "public/img/play_bandaraya.svg";
import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import WhatsappButton from "public/ChatOnWhatsAppButton/WhatsAppButtonGreenMedium.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBluesky,
  faDiscord,
  faFacebook,
  faGuilded,
  faInstagram,
  faLinkedin,
  faTiktok,
  faWhatsapp,
  faXTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
// import CalButton from "./_components/CalButton";

const PlausibleWrapper = dynamic(
  () => import("./_components/PlausibleWrapper")
);

import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/20/solid";

import Blog from "./_components/Blog";
import Stats from "./_components/Stats";
import IntersectionTransition from "./_components/IntersectionTransition";
import SplitText from "./_components/SplitText";
import VideoPlayer from "./_components/VideoPlayer";
import { fetchMetrics } from "utils/stats";
// import Bento from "./_components/Bento";
// import { ReactNode } from "react";

const socials = [
  {
    name: "Roblox",
    href: "https://roblox.com/groups/1143446",
    icon: <RobloxLogo className="mb-1 inline-flex h-[1em] fill-black" />
  },
  {
    name: "Discord",
    href: "https://discord.com/invite/uPkrYWd",
    icon: <FontAwesomeIcon icon={faDiscord} />
  },
  {
    name: "Guilded",
    href: "https://guilded.gg/mys",
    icon: <FontAwesomeIcon icon={faGuilded} />
  },
  {
    name: "Facebook",
    href: "https://facebook.com/people/MYSverse/61573938995837/",
    icon: <FontAwesomeIcon icon={faFacebook} />
  },
  {
    name: "X",
    href: "https://x.com/mys_verse",
    icon: <FontAwesomeIcon icon={faXTwitter} />
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/mysver.se",
    icon: <FontAwesomeIcon icon={faBluesky} />
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VaqTaIj59PwIN60Zxf1J",
    icon: <FontAwesomeIcon icon={faWhatsapp} />
  },
  {
    name: "Instagram",
    href: "https://instagram.com/mysver.se/",
    icon: <FontAwesomeIcon icon={faInstagram} />
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@mys_verse",
    icon: <FontAwesomeIcon icon={faYoutube} />
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@mysver.se",
    icon: <FontAwesomeIcon icon={faTiktok} />
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mysverse/",
    icon: <FontAwesomeIcon icon={faLinkedin} />
  }
];

function Contact() {
  return (
    <div className="py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight text-black"
                id="contact"
              >
                Get in touch
              </h2>
              <p className="mt-4 leading-7 text-gray-800">
                For legal, commercial, collaborations, and other general
                enquiries. Our in-house development studio Hornbill Interactive
                is also open to any other metaverse-style projects on Roblox,
                with battle-tested community and development skills.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10">
                <h3 className="text-black-100 text-base leading-7 font-semibold">
                  MYSverse Digital Ventures
                </h3>
                <h4 className="text-sm leading-5 font-medium text-red-600">
                  <Link href="/ssm_cert.pdf" target="_blank">
                    202303234965 (AS0469188-M)
                  </Link>
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6">
                  {/* <div>
                    <dt className="sr-only">Registration</dt>
                    <dd>202303234965 (AS0469188-M)</dd>
                  </div> */}
                  <div className="flex flex-col gap-y-2">
                    <dt className="sr-only">Address</dt>
                    <dd>
                      <div className="flex items-center gap-x-2">
                        <MapIcon className="h-4 flex-none" />
                        <span className="leading-5">
                          A-5-10 Empire Tower SS16/1, 47500 Subang Jaya,
                          Selangor, Malaysia
                        </span>
                      </div>
                    </dd>
                    <dt className="sr-only">Address</dt>
                    <dd>
                      <PlausibleWrapper
                        eventName="contactClicked"
                        eventProps={{
                          props: {
                            type: "email"
                          }
                        }}
                      >
                        <div className="font-semibold text-red-600">
                          <Link
                            className="flex items-center gap-x-2"
                            href="mailto:yan@mysver.se"
                          >
                            <EnvelopeIcon className="h-4" />
                            <span>yan@mysver.se</span>
                          </Link>
                        </div>
                      </PlausibleWrapper>
                    </dd>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <PlausibleWrapper
                        eventName="contactClicked"
                        eventProps={{
                          props: {
                            type: "phone"
                          }
                        }}
                      >
                        <div className="font-semibold text-red-600">
                          <Link
                            className="flex items-center gap-x-2"
                            href="tel:0350219170"
                          >
                            <PhoneIcon className="h-4" />
                            <span className="tracking-wide">03-50219170</span>
                          </Link>
                        </div>
                      </PlausibleWrapper>
                    </dd>
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10">
                <h3 className="text-black-100 text-base leading-7 font-semibold">
                  Shoot us a message
                </h3>
                <h4 className="text-black-100 text-sm leading-7 font-normal opacity-80">
                  For businesses and organisations
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6">
                  <div className="flex flex-col gap-y-4">
                    <dt className="sr-only">WhatsApp</dt>
                    <dd>
                      <Link href="https://wa.me/601154156978" target="_blank">
                        <WhatsappButton />
                      </Link>
                    </dd>
                    <dt className="sr-only">Cal.com</dt>
                    {/* <dd>
                      <CalButton />
                    </dd> */}
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10">
                <h3 className="text-black-100 text-base leading-7 font-semibold">
                  Join the community
                </h3>
                <h4 className="text-black-100 text-sm leading-7 font-normal opacity-80">
                  For game-related matters
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6">
                  <div className="flex flex-row gap-x-4">
                    <dt className="sr-only">Discord</dt>
                    <dd>
                      <Link
                        href="https://discord.com/invite/uPkrYWd"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faDiscord} size="xl" />
                      </Link>
                    </dd>
                    <dt className="sr-only">Guilded</dt>
                    <dd>
                      <Link href="https://guilded.gg/mys" target="_blank">
                        <FontAwesomeIcon icon={faGuilded} size="xl" />
                      </Link>
                    </dd>
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectList() {
  interface Project {
    name: string;
    tagline: string | JSX.Element;
    wip?: boolean;
    launched?: string;
    type: "MYSverse" | "Sim";
    image?: string | StaticImport;
    link?: string;
  }

  const projects: Project[] = [
    {
      name: "Lebuhraya Refreshed",
      launched: "Released 2020, Refreshed 2023",
      image: LebuhrayaFeaturePic,
      type: "MYSverse",
      tagline:
        "The most relaxing game in the MYSverse lineup lets players drive around in a variety of vehicles, and socialise with fellow drivers along a sprawling highway, in addition to police and firefighter roleplays."
      // image: FeaturePic
    },
    {
      name: "Ruumah v3",
      launched: "Released April 2024",
      tagline: (
        <>
          Iterating upon our annual tradition of virtual Raya celebrations,
          experience a festive open house set in an entirely new suburban
          locale, featuring food, culture and plenty of MYSverse community
          references!
        </>
      ),
      image: Rumah3FeaturePic,
      type: "MYSverse",
      wip: false
    },
    {
      name: "Ruumah v2",
      launched: "Released 2021",
      tagline: (
        <>
          An authentic <i>kampung</i> setting, replete with seaside, open house
          (tasty food!), and traditional celebrations, this exquisite embodiment
          of Malaysian culture unites every community member to gather during
          periods of festivities.
        </>
      ),
      image: RumahFeaturePic,
      type: "MYSverse"
    },
    {
      name: "Daerah",
      launched: "Coming 2025",
      tagline:
        "Taking place in a rural area inspired by the Sabahan district of Beaufort, this never-before-explored experience will be the basis of MYSverse's first significant step in offering gameplay freedom to all players, even those outside the community.",
      image: DaerahFeaturePic,
      type: "MYSverse",
      wip: true
    },
    {
      name: "Bandaraya",
      launched: "Released Sep 2020",
      image: BandarFeaturePic,
      type: "Sim",
      tagline:
        "A faithful, detailed and entertaining rendition of Kuala Lumpur redeveloped, redesigned and expanded in-house as MYSverse's major roleplay hub with city gameplay."
    },
    {
      name: "Tentera",
      launched: "Since 2016",
      tagline:
        "One of the original MYSverse roleplay agencies, the military community offers heavily-researched, authentic recreations of Malaysian Armed Forces assets and procedures utilised in dedicated mil-sim experiences.",
      image: MafFeaturePic,
      type: "Sim"
    },
    {
      name: "Polis",
      launched: "Since 2017",
      tagline:
        "The police roleplay community enforces virtual laws in MYSverse Sim experiences such as Bandaraya, conducting duties across disciplines in traffic, community policing, and high risk crime interventions.",
      image: PolisFeaturePic,
      type: "Sim"
    },
    {
      name: "Bomba",
      launched: "Since 2024",
      tagline:
        "The roleplay firefighters of MYSverse Sim use one of the platforms most detailed complement of fire equipment and vehicles to put out fires and perform rescue operations.",
      image: BombaFeaturePic,
      type: "Sim"
    }
  ];

  function ItemList({ type }: { type: "MYSverse" | "Sim" }) {
    return (
      <ul
        role="list"
        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
      >
        {projects
          .filter((item) => item.type === type)
          .map((project) => (
            <li key={project.name}>
              {project.image ? (
                <Image
                  className="mb-6 aspect-3/2 w-full rounded-2xl object-cover"
                  width={500}
                  height={250}
                  src={project.image}
                  alt="Project image"
                />
              ) : null}
              <div className="gap-x-4 sm:flex sm:flex-row">
                <h3 className="text-black-100 text-xl leading-8 font-semibold tracking-tight">
                  {project.name}
                </h3>
                {project.wip ? (
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset">
                    <svg
                      className="h-1.5 w-1.5 fill-red-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {project.launched}
                  </span>
                ) : project.launched ? (
                  <span className="text-black-100 my-0.5 inline-flex items-center gap-x-1.5 rounded-md px-2 py-2 text-xs font-medium ring-1 ring-gray-300 ring-inset">
                    <svg
                      className="h-1.5 w-1.5 fill-green-400"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    {project.launched}
                  </span>
                ) : null}
              </div>

              <p className="text-base leading-7 text-black opacity-70">
                {project.tagline}
              </p>
            </li>
          ))}
      </ul>
    );
  }
  return (
    <div className="py-12 text-gray-800 sm:py-32" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <IntersectionTransition>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-black-100 text-3xl font-bold tracking-tight sm:text-4xl">
              Our projects
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-800">
              {`MYSverse developers started off as volunteers passionate about delivering authentic roleplay experiences to the equally dedicated sets of the community. We aim to preserve that same concept moving forward, with the added focus on making those top tier efforts available to all players.`}
            </p>
          </div>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl">
              MYSverse
            </h3>
            <ItemList type="MYSverse" />
          </div>
        </IntersectionTransition>
        <IntersectionTransition>
          <div className="mt-16">
            <h3 className="text-black-100 text-2xl font-bold tracking-tight sm:text-3xl">
              <MYSverseSimLogo className="inline-block h-12 w-auto fill-black" />
              <span className="sr-only">MYSverse Sim</span>
            </h3>
            <p className="mt-6 text-lg leading-8">
              {`A sophisticated and realistic virtual experience, MYSverse Sim offers serious roleplay with an educational twist. Engage in disciplined activities, requiring off-platform training and certification for a deeper immersive experience.`}
            </p>
            <ItemList type="Sim" />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}

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
            <p className="mt-6 text-lg leading-8 text-gray-800">
              Embark on an extraordinary journey with MYSverse, where <b>fun</b>
              , <b>education</b>, and Malaysian <b>culture</b> converge in our
              Roblox and beyond experiences. <br />
              Dive into our diverse world of virtual adventures today!
            </p>
          </Transition>

          <Transition
            enter="transform transition duration-500 delay-300"
            enterFrom="opacity-0 -translate-y-36 scale-80"
            enterTo="opacity-100 translate-y-0 scale-100"
            show
            appear
          >
            <div className="mt-6 flex flex-row flex-wrap justify-center gap-x-4 gap-y-4 sm:gap-x-5 md:gap-x-6">
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
                        className="text-black-100 fill-gray-100 text-xl leading-6 font-semibold opacity-100 hover:opacity-50"
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

        {/* <Image
              src={MAFfeaturePic}
              alt="Screenshot of a rural area in Beaufort"
              width={4224}
              height={2376}
              className="mt-16 rounded-md bg-black/5 shadow-2xl sm:mt-24"
            /> */}
      </div>
      <Transition
        as="div"
        enter="transform transition duration-1000 delay-300"
        enterFrom="opacity-0 translate-y-72 scale-80"
        enterTo="opacity-100 translate-y-0 scale-100"
        show
        appear
      >
        {/* <Image
              src={FeaturePic}
              alt="Screenshot of MYSverse experiences"
              width={1024}
              height={512}
              className="mt-12 rounded-md bg-black/5 shadow-2xl sm:mt-24 mx-auto mb-12"
            /> */}
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

      {/* <Bento /> */}
      <IntersectionTransition>
        <Contact />
      </IntersectionTransition>
      <IntersectionTransition>
        <div className="mt-6 flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 md:gap-x-12">
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
                    className="fill-gray-300 text-xl leading-6 font-semibold text-gray-800 opacity-100 hover:opacity-50"
                  >
                    {icon}
                    <span className="ml-2 hidden text-base xl:inline-block">
                      {item.name}
                    </span>
                  </Link>
                </PlausibleWrapper>
              );
            }
          })}
        </div>
      </IntersectionTransition>
    </>
  );
}
