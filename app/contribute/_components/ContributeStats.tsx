"use client";

import { AnimateCountUp } from "app/_components/AnimateCountUp";
import { ReactNode } from "react";

interface Stat {
  id: number;
  name: string;
  value: ReactNode;
}

const stats: Stat[] = [
  {
    id: 1,
    name: "Team members and counting",
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
    id: 2,
    name: "Paid out to contributors",
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

export default function ContributeStats() {
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
