"use client";

import { useState, useEffect, ReactNode } from "react";
import { AnimateCountUp } from "./AnimateCountUp";
import type { Metrics } from "utils/stats";
import { fetchMetrics } from "utils/stats";

interface Stat {
  id: number;
  name: string;
  value: ReactNode;
}

export default function Stats({ initialStats }: { initialStats?: Metrics }) {
  const [metrics, setMetrics] = useState<Metrics | undefined>(initialStats);

  useEffect(() => {
    fetchMetrics().then((data) => {
      if (data) {
        setMetrics(data);
      }
    });
  }, []);

  // Use fallback values if the API data isn't available.
  const totalGamePlays = metrics
    ? metrics.games.reduce((sum, game) => sum + game.visits, 0)
    : 23500000;

  const groupMembers = metrics ? metrics.group.memberCount : 383000;

  const stats: Stat[] = [
    {
      id: 1,
      name: "times games played",
      value: (
        <AnimateCountUp
          end={totalGamePlays}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          suffix={metrics ? undefined : "+"}
        />
      )
    },
    {
      id: 3,
      name: "Roblox group members",
      value: (
        <AnimateCountUp
          end={groupMembers}
          enableScrollSpy={true}
          scrollSpyOnce={true}
          suffix={metrics ? undefined : "+"}
        />
      )
    },
    {
      id: 2,
      name: "followers across social media",
      value: (
        <AnimateCountUp
          end={35000} // This remains static as it isn't fetched.
          enableScrollSpy={true}
          scrollSpyOnce={true}
          suffix="+"
        />
      )
    }
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-lg leading-7 text-gray-600 dark:text-white">
                {stat.name}
              </dt>
              <dd className="order-first text-5xl font-semibold tracking-tight text-gray-800 dark:text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
