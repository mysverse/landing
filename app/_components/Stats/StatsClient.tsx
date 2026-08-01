"use client";

import { useState, useEffect, ReactNode } from "react";
import type { Metrics } from "utils/stats";
import { fetchMetrics } from "utils/stats";
import { AnimateCountUp } from "../AnimateCountUp";
import Container from "app/_components/ui/Container";
import { useTranslations } from "next-intl";

interface Stat {
  id: number;
  name: string;
  value: ReactNode;
}

export default function StatsClient({
  initialStats
}: {
  initialStats?: Metrics;
}) {
  const [metrics, setMetrics] = useState<Metrics | undefined>(initialStats);
  const t = useTranslations("Stats");

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
      name: t("gamesPlayed"),
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
      name: t("robloxMembers"),
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
      name: t("socialFollowers"),
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
    <section className="py-12 sm:py-24">
      <Container>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="body-lg">{stat.name}</dt>
              <dd className="text-strong order-first text-5xl font-semibold tracking-tight">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
