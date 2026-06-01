"use client";

import { AnimateCountUp } from "app/_components/AnimateCountUp";
import { useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface Stat {
  id: number;
  name: string;
  value: ReactNode;
}

export default function ContributeStats() {
  // When reduced motion is requested, show the final values instantly
  // (AnimateCountUp renders the end value immediately with scroll spy off).
  const animate = !useReducedMotion();

  const stats: Stat[] = [
    {
      id: 1,
      name: "Team members and counting",
      value: (
        <AnimateCountUp
          end={100}
          start={50}
          enableScrollSpy={animate}
          scrollSpyOnce={true}
          suffix={"+"}
        />
      )
    },
    {
      id: 2,
      name: "Paid out to contributors",
      value: (
        <AnimateCountUp
          end={20000}
          enableScrollSpy={animate}
          scrollSpyOnce={true}
          prefix={"RM "}
          suffix={"+"}
        />
      )
    }
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-8 text-center sm:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt className="text-base leading-7 text-gray-600 dark:text-white/80">
            {stat.name}
          </dt>
          <dd className="order-first text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
