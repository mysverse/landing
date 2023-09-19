import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePlausible } from "next-plausible";
import MysverseLogo from "public/img/mysverse_mono.svg";
import FeaturePic from "public/img/beaufort_4k.webp";
import BeaufortFeaturePic from "public/img/beaufort_feature_2.webp";
import MafFeaturePic from "public/img/maf_feature.webp";
import Head from "next/head";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const navigation = [
  { name: "Roblox", href: "https://roblox.com/groups/1143446" },
  { name: "Discord", href: "https://discord.com/invite/uPkrYWd" },
  { name: "X", href: "https://x.com/mys_verse" },
  { name: "Instagram", href: "https://instagram.com/mysver.se/" },
  { name: "YouTube", href: "https://youtube.com/@mys_verse" },
  { name: "TikTok", href: "https://tiktok.com/@mysver.se" }
];

function Contact() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-100">
                Get in touch
              </h2>
              <p className="mt-4 leading-7 text-gray-300">
                For legal, commercial, collaborations, and other general
                enquiries. Our in-house development studio Hornbill Interactive
                is also open to any other metaverse-style projects on Roblox,
                with battle-tested community and development skills.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-slate-800 p-10 flex flex-col justify-center place-content-center">
                <h3 className="text-base font-semibold leading-7 text-gray-100">
                  MYSverse Digital Ventures
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-100">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-indigo-600"
                        href="mailto:mysverse@yan.gg"
                      >
                        mysverse@yan.gg
                      </a>
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

export function ProjectList() {
  interface Project {
    name: string;
    tagline: string;
    image?: string | StaticImport;
    link?: string;
  }

  const projects: Project[] = [
    {
      name: "Daerah",
      tagline:
        "Taking place in a rural area inspired by the Sabahan district of Beaufort, this never-before-explored experience will be the basis of MYSverse's first significant step in offering gameplay freedom to all players, even those outside the community.",
      image: BeaufortFeaturePic
    },
    {
      name: "Tentera",
      tagline:
        "One of the original MYSverse roleplay agencies, the military community offers heavily-researched, authentic recreations of Malaysian Armed Forces assets and procedures utilised in dedicated mil-sim experiences.",
      image: MafFeaturePic
    },
    {
      name: "Lebuhraya",
      tagline:
        "The most relaxing game in the MYSverse lineup lets players drive around in a variety of vehicles, and socialise with fellow drivers along a sprawling highway. The map was previously released by its original developer."
      // image: FeaturePic
    },
    {
      name: "Bandar",
      tagline:
        "A faithful, detailed and entertaining rendition of Kuala Lumpur redeveloped, redesigned and expanded in-house as MYSverse's major roleplay hub with city gameplay. The map was previously released by its original developer."
      // image: FeaturePic
    }
    // More people...
  ];
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            Our projects
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {`MYSverse developers started off as volunteers passionate about delivering authentic roleplay experiences to the equally dedicated sets of the community. We aim to preserve that same concept moving forward, with the added focus on making those top tier efforts available to all players.`}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none"
        >
          {projects.map((project) => (
            <li key={project.name}>
              {project.image ? (
                <Image
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  width={500}
                  height={250}
                  src={project.image}
                  alt=""
                />
              ) : null}
              <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-gray-100">
                {project.name}
              </h3>
              <p className="text-base leading-7 text-white opacity-70">
                {project.tagline}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OGHead({
  title,
  site_name,
  url,
  description,
  og_image
}: {
  title: string;
  site_name: string;
  url: string;
  description: string;
  og_image: string;
}) {
  const fullTitle = `${title} - ${site_name}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={site_name} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={og_image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og_image} />
    </Head>
  );
}

export default function Main() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const plausible = usePlausible();
  return (
    <>
      <OGHead
        title="Welcome"
        site_name="MYSverse"
        url="https://mysver.se"
        description="The original Malaysian metaverse project and roleplay community. Your gateway into our unique brand of fun, culture and education like no other."
        og_image="https://mysver.se/img/og_image_v2.png"
      />
      <main className="bg-gray-900 h-full">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">MYSverse</span>
                <MysverseLogo
                  alt="MYSverse logo"
                  className="mx-auto h-10 w-auto fill-white sm:h-11"
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-white"
                  onClick={() =>
                    plausible("navClicked", {
                      props: {
                        name: item.name
                      }
                    })
                  }
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {/* <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <MysverseLogo
                    alt="MYSverse logo"
                    className="mx-auto h-10 w-auto fill-white"
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                        onClick={() =>
                          plausible("navClicked", {
                            props: {
                              name: item.name
                            }
                          })
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Log in
                </a>
              </div> */}
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <div className="isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#020024] to-[#00d4ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Enter a mysterious Malaysian metaverse.
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  MYSverse is your gateway to our unique brand of fun, Malaysian
                  culture, and education on Roblox.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="https://www.roblox.com/games/481538620/Bandar"
                    className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    onClick={() =>
                      plausible("ctaClicked", {
                        props: {
                          name: "Bandar"
                        }
                      })
                    }
                  >
                    Play Bandar, city simulator
                  </a>
                  <a
                    href="https://www.roblox.com/games/4892731894/Lebuhraya"
                    onClick={() =>
                      plausible("ctaClicked", {
                        props: {
                          name: "Lebuhraya"
                        }
                      })
                    }
                    className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  >
                    Play Lebuhraya, highway driving
                  </a>
                </div>
                <p
                  // href="#"
                  className="text-sm italic leading-6 tracking-wide text-white opacity-80 mt-4"
                >
                  ...and more open experiences for everyone, coming soon!
                </p>
              </div>
              <Image
                src={FeaturePic}
                alt="Screenshot of a rural area in Beaufort"
                width={4224}
                height={2376}
                className="mt-16 rounded-md bg-white/5 shadow-2xl sm:mt-24"
              />
              {/* <Image
                src={MAFfeaturePic}
                alt="Screenshot of a rural area in Beaufort"
                width={4224}
                height={2376}
                className="mt-16 rounded-md bg-white/5 shadow-2xl sm:mt-24"
              /> */}
            </div>
            <ProjectList />
            <Contact />
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
        <footer className="text-center tracking-widest text-sm text-white pb-20 opacity-50 uppercase">
          <span className="block mb-1">
            Owned and operated by MYSverse Digital Ventures (AS0469188-M).
          </span>
          <span className="block">
            All assets used are property of their respective owners.
          </span>
        </footer>
      </main>
    </>
  );
}
