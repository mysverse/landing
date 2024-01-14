"use client";

import CountUp from "react-countup";

const stats = [
  {
    id: 1,
    name: "times games played",
    value: (
      <CountUp
        end={15000000}
        enableScrollSpy={true}
        scrollSpyOnce={true}
        suffix="+"
      />
    )
  },
  {
    id: 3,
    name: "players across Roblox groups",
    value: (
      <CountUp
        end={331000}
        enableScrollSpy={true}
        scrollSpyOnce={true}
        suffix="+"
      />
    )
  },
  {
    id: 2,
    name: "followers across social media",
    value: (
      <CountUp
        end={30000}
        enableScrollSpy={true}
        scrollSpyOnce={true}
        suffix="+"
      />
    )
  }
];

export default function Stats() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
