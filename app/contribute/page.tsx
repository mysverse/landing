"use client";

import { AnimateCountUp } from "app/_components/AnimateCountUp";
import { ReactNode } from "react";
import { useState } from "react";

interface Stat {
  id: number;
  name: string;
  value: ReactNode;
}

const contributorTypes = [
  {
    title: "Volunteer",
    description:
      "Contribute your time and skills to help build the MYSverse community. Flexible, no commitment required.",
    details:
      "Great for those who want to help out occasionally, learn, and make friends. Access to exclusive events and recognition!"
  },
  {
    title: "Contractor",
    description:
      "Work on specific projects or tasks and get paid for your contributions.",
    details:
      "Perfect for freelancers or those looking for short-term gigs. Competitive rates, remote work, and portfolio opportunities."
  },
  {
    title: "Part-time / Full-time",
    description: "Join the core team and help shape the future of MYSverse.",
    details:
      "Enjoy stable pay, benefits, and a chance to make a big impact. Opportunities for growth and leadership."
  }
];

export default function ContributePage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const stats: Stat[] = [
    {
      id: 1,
      name: "MYSverse team members",
      value: (
        <AnimateCountUp
          end={100}
          start={50}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          suffix={"+"}
        />
      )
    },
    {
      id: 4,
      name: "Total paid out to contributors",
      value: (
        <AnimateCountUp
          end={20000}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          prefix={"RM "}
          suffix={"+"}
        />
      )
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Contribute to MYSverse
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/80">
            Join our mission to build the best Roblox experiences and community.
            Whether you want to volunteer, contract, or join the team,
            there&apos;s a place for you!
          </p>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {contributorTypes.map((type, idx) => (
            <div
              key={type.title}
              className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow transition-all duration-200 dark:border-white/10 dark:bg-gray-900 ${hovered === idx ? "z-10 scale-105 ring-2 ring-indigo-500" : ""}`}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {type.title}
              </h3>
              <p className="mb-2 text-gray-600 dark:text-white/80">
                {type.description}
              </p>
              {hovered === idx && (
                <div className="animate-fade-in mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                  {type.details}
                </div>
              )}
            </div>
          ))}
        </div>
        <dl className="mb-20 grid grid-cols-1 gap-x-4 gap-y-8 text-center lg:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-lg leading-7 text-gray-600 dark:text-white/80">
                {stat.name}
              </dt>
              <dd className="order-first text-5xl font-semibold tracking-tight text-gray-800 dark:text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        {/* Bento box benefits section */}
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Why contribute?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
          Benefits for all contributors
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem] dark:bg-gray-900"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Flexible & Remote
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-white/80">
                  Work from anywhere, anytime. We value results, not hours. Join
                  from any timezone!
                </p>
              </div>
              <div className="[container-type:inline-size] relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    className="size-full object-cover object-top"
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] dark:bg-gray-900"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Growth & Learning
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-white/80">
                  Access to mentorship, workshops, and a supportive community.
                  Build your skills and portfolio.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  className="w-full max-lg:max-w-xs"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-900"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Recognition
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-white/80">
                  Earn badges, certificates, and public recognition for your
                  work. Stand out in the community!
                </p>
              </div>
              <div className="[container-type:inline-size] flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  className="h-[min(152px,40cqw)] object-cover"
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  alt=""
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem] dark:bg-gray-900"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                  Paid Opportunities
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-white/80">
                  We reward great work. Many roles are paid, and we celebrate
                  all contributions!
                </p>
              </div>
              <div className="relative min-h-[30rem] w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        ContributorPortal.tsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">
                        App.tsx
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14 text-sm text-white">
                    {`// Apply now and join the adventure!`}
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
