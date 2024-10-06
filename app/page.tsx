import { JSX } from "react";

import Image from "next/image";

import RobloxLogo from "public/img/Roblox_Logo.svg";
import FeaturePic from "public/img/mysverse_feature.webp";
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

import { StaticImport } from "next/dist/shared/lib/get-img-props";

import MYSverseSimLogo from "public/img/MYSverse_Sim_Colour.svg";
import WhatsappButton from "public/ChatOnWhatsAppButton/WhatsAppButtonGreenMedium.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGuilded,
  faInstagram,
  faLinkedin,
  faTiktok,
  faWhatsapp,
  faXTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import CalButton from "./_components/CalButton";
import Header from "./_components/header";

const PlausibleWrapper = dynamic(
  () => import("./_components/PlausibleWrapper")
);

import dynamic from "next/dynamic";
import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Transition, TransitionChild } from "@headlessui/react";
// import { ReactNode } from "react";
import Blog from "./_components/Blog";
import Stats from "./_components/Stats";
// import Bento from "./_components/Bento";

const socials = [
  {
    name: "Roblox",
    href: "https://roblox.com/groups/1143446",
    icon: <RobloxLogo className="inline-flex h-[1em] mb-1 fill-black" />
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
    name: "X",
    href: "https://x.com/mys_verse",
    icon: <FontAwesomeIcon icon={faXTwitter} />
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
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-white p-10 flex flex-col justify-center place-content-center">
                <h3 className="text-base font-semibold leading-7 text-black-100">
                  MYSverse Digital Ventures
                </h3>
                <h4 className="text-sm font-medium leading-5 text-red-600">
                  <Link href="/ssm_cert.pdf" target="_blank">
                    202303234965 (AS0469188-M)
                  </Link>
                </h4>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-black-100">
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
                          <a
                            className="flex items-center gap-x-2"
                            href="mailto:yan@mysver.se"
                          >
                            <EnvelopeIcon className="h-4" />
                            <span>yan@mysver.se</span>
                          </a>
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
                          <a
                            className="flex items-center gap-x-2"
                            href="tel:0350219170"
                          >
                            <PhoneIcon className="h-4" />
                            <span className="tracking-wide">03-50219170</span>
                          </a>
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
              <div className="rounded-2xl bg-white p-10 flex flex-col justify-center place-content-center">
                <h3 className="text-base font-semibold leading-7 text-black-100">
                  Chat or call, your choice
                </h3>
                <h4 className="text-sm font-normal opacity-80 leading-7 text-black-100">
                  For businesses and organisations
                </h4>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-black-100">
                  <div className=" flex flex-col gap-y-4">
                    {/* Hidden due to too much misuse of the WhatsApp Business channel */}
                    <dt className="sr-only">WhatsApp</dt>
                    <dd>
                      <Link href="https://wa.me/601154156978" target="_blank">
                        <WhatsappButton />
                      </Link>
                    </dd>
                    <dt className="sr-only">Cal.com</dt>
                    <dd>
                      <CalButton />
                    </dd>
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
              <div className="rounded-2xl bg-white p-10 flex flex-col justify-center place-content-center">
                <h3 className="text-base font-semibold leading-7 text-black-100">
                  Join the community
                </h3>
                <h4 className="text-sm font-normal opacity-80 leading-7 text-black-100">
                  For game-related matters
                </h4>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-black-100">
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
      launched: "Coming 2024",
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
      launched: "Coming 2024",
      tagline:
        "The roleplay firefighters of MYSverse Sim use one of the platforms most detailed complement of fire equipment and vehicles to put out fires and perform rescue operations.",
      image: BombaFeaturePic,
      type: "Sim",
      wip: true
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
                  className="aspect-[3/2] w-full rounded-2xl object-cover mb-6"
                  width={500}
                  height={250}
                  src={project.image}
                  alt=""
                />
              ) : null}
              <div className="sm:flex-row sm:flex gap-x-4">
                <h3 className="text-xl font-semibold leading-8 tracking-tight text-black-100">
                  {project.name}
                </h3>
                {project.wip ? (
                  <span className="inline-flex items-center gap-x-1.5 my-0.5 py-2 rounded-md px-2 text-xs font-medium text-black-100 ring-1 ring-inset ring-gray-300">
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
                  <span className="inline-flex items-center gap-x-1.5 py-2 my-0.5 rounded-md px-2 text-xs font-medium text-black-100 ring-1 ring-inset ring-gray-300">
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
    <div className="py-12 sm:py-32 text-gray-800" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-black-100 sm:text-4xl">
            Our projects
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            {`MYSverse developers started off as volunteers passionate about delivering authentic roleplay experiences to the equally dedicated sets of the community. We aim to preserve that same concept moving forward, with the added focus on making those top tier efforts available to all players.`}
          </p>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-black-100 sm:text-3xl">
            MYSverse
          </h3>
          <ItemList type="MYSverse" />
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold tracking-tight text-black-100 sm:text-3xl">
            <MYSverseSimLogo className="inline-block h-12 w-auto fill-black" />
            <span className="sr-only">MYSverse Sim</span>
          </h3>
          <p className="mt-6 text-lg leading-8">
            {`A sophisticated and realistic virtual experience, MYSverse Sim offers serious roleplay with an educational twist. Engage in disciplined activities, requiring off-platform training and certification for a deeper immersive experience.`}
          </p>
          <ItemList type="Sim" />
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <>
      <Header />
      <div className="isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6459ff69] to-[#ff0000] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
        <div className="py-12 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Transition
                enter="transform transition duration-500"
                enterFrom="opacity-0 -translate-y-36 scale-80"
                enterTo="opacity-100 translate-y-0 scale-100"
                show
                appear
              >
                <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                  Step into our faithfully Malaysian metaverse.
                </h1>
              </Transition>

              <Transition
                enter="transform transition duration-500 delay-200"
                enterFrom="opacity-0 -translate-y-36 scale-80"
                enterTo="opacity-100 translate-y-0 scale-100"
                show
                appear
              >
                <p className="mt-6 text-lg leading-8 text-gray-800">
                  Embark on an extraordinary journey with MYSverse, where{" "}
                  <b>fun</b>, <b>education</b>, and Malaysian <b>culture</b>{" "}
                  converge in our Roblox and beyond experiences. <br />
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
                <div className="mt-6 flex flex-row justify-center space-x-4 sm:space-x-5 md:space-x-6">
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
                          <a
                            href={item.href}
                            className="text-xl font-semibold leading-6 text-black-100 fill-gray-100 opacity-100 hover:opacity-50"
                          >
                            {icon}
                          </a>
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
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
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
                      <a
                        href="https://www.roblox.com/games/481538620/Bandar"
                        className="group rounded-md bg-gradient-to-r from-[#476075] to-[#27374D] hover:bg-white hover:bg-none px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                      >
                        <PlayBandaraya className="fill-white inline-flex h-[3em] px-1 group-hover:fill-[#476075]" />
                      </a>
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
                      <a
                        href="https://www.roblox.com/games/4892731894/Lebuhraya"
                        className="group rounded-md bg-gradient-to-r from-[#65ad56] to-[#13863f] hover:bg-white hover:bg-none px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                      >
                        <PlayLebuhraya className="fill-white inline-flex h-[3em] px-1 group-hover:fill-[#65ad56]" />
                      </a>
                    </PlausibleWrapper>
                  </TransitionChild>
                </div>
                <p
                  // href="#"
                  className="text-sm italic leading-6 tracking-wide text-black opacity-80 mt-4"
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
            <Image
              src={FeaturePic}
              alt="Screenshot of MYSverse experiences"
              width={1024}
              height={512}
              className="mt-12 rounded-md bg-black/5 shadow-2xl sm:mt-24 mx-auto mb-12"
            />
          </Transition>

          <Stats />
          <ProjectList />
          <Blog />
          {/* <Bento /> */}
          <Contact />
          <div className="mt-6 flex flex-row justify-center space-x-5 md:space-x-12">
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
                    <a
                      href={item.href}
                      className="font-semibold text-xl leading-6 text-gray-800 fill-gray-300 opacity-100 hover:opacity-50"
                    >
                      {icon}
                      <span className="hidden ml-2 text-base xl:inline-block">
                        {item.name}
                      </span>
                    </a>
                  </PlausibleWrapper>
                );
              }
            })}
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
          />
        </div>
      </div>
      <footer className="text-center tracking-widest text-sm text-black pb-20 opacity-50 uppercase mx-4">
        <span className="block mb-1">
          Owned and operated by MYSverse Digital Ventures (AS0469188-M).
        </span>
        <span className="block">
          All assets used are property of their respective owners.
        </span>
      </footer>
    </>
  );
}
