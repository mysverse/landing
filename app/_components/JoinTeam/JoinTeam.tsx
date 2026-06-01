import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { openPositions, benefits } from "data/contribute";
import PlausibleWrapper from "app/_components/PlausibleWrapper";
import PositionCard from "app/contribute/_components/PositionCard";

export default function JoinTeam() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base/7 font-semibold text-primary">Join the team</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Build the next MYSverse update
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/80">
          We&apos;re hiring volunteer developers to help shape Sumaya,
          Lebuhraya, Bandaraya and more — with real benefits.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {benefits
            .filter((benefit) => !benefit.headDevOnly)
            .map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {benefit.title}
              </li>
            ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {openPositions.map((position) => (
          <PositionCard
            key={position.id}
            position={position}
            placement="home"
            compact
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <PlausibleWrapper
          eventName="contributeCtaClicked"
          eventProps={{ props: { location: "homepage" } }}
        >
          <Link
            href="/contribute"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:opacity-70"
          >
            See open roles &amp; full details
            <ArrowRightIcon className="size-4" />
          </Link>
        </PlausibleWrapper>
      </div>
    </div>
  );
}
