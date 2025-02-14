import { AnimateCountUp } from "./AnimateCountUp";
// import CountUp from "./Countup";

const stats = [
  {
    id: 1,
    name: "times games played",
    value: (
      <AnimateCountUp
        end={23500000}
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
      <AnimateCountUp
        end={367000}
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
      <AnimateCountUp
        end={35000}
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
              <dt className="leading-7 text-gray-600 text-lg">{stat.name}</dt>
              <dd className="order-first text-5xl font-semibold tracking-tight text-gray-800">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
