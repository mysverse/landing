import { MotionConfig } from "motion/react";
import IntersectionTransition from "app/_components/IntersectionTransition";
import { roles } from "data/contribute";
import ContributeHero from "./_components/ContributeHero";
import ContributeStats from "./_components/ContributeStats";
import OpenPositions from "./_components/OpenPositions";
import BenefitsGrid from "./_components/BenefitsGrid";
import ApplyProcess from "./_components/ApplyProcess";
import RoleCard from "./_components/RoleCard";
import JoinCTA from "./_components/JoinCTA";

export const metadata = {
  title: "Contribute",
  description:
    "Join the MYSverse Dev Team. We're hiring two volunteer roles, Head Developer and Developer, with real benefits including Pay-Per-Task pay, revenue sharing, monthly bonuses and more."
};

export default function ContributePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero */}
        <IntersectionTransition>
          <ContributeHero />
        </IntersectionTransition>

        {/* Stats */}
        <div className="py-16 sm:py-24">
          <IntersectionTransition>
            <ContributeStats />
          </IntersectionTransition>
        </div>

        {/* Open Positions - the centerpiece */}
        <IntersectionTransition>
          <OpenPositions />
        </IntersectionTransition>

        {/* Benefits at a glance */}
        <div className="py-16 sm:py-24">
          <IntersectionTransition>
            <BenefitsGrid />
          </IntersectionTransition>
        </div>

        {/* How applying works */}
        <IntersectionTransition>
          <ApplyProcess />
        </IntersectionTransition>

        {/* Volunteer model narrative (trimmed) */}
        <div className="py-16 sm:py-24">
          <IntersectionTransition>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-primary text-base/7 font-semibold">
                Our model
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Volunteer-driven, experience-focused
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white/80">
                MYSverse is built by volunteers from all walks of life:
                students, professionals and hobbyists who enjoy building things
                together. Our Pay-Per-Task bounty system means you can earn
                while you learn, on a schedule that works for you.
              </p>
            </div>
          </IntersectionTransition>
        </div>

        {/* Other ways to contribute (demoted) */}
        <IntersectionTransition>
          <div className="text-center">
            <p className="text-primary text-base/7 font-semibold">
              Not a developer?
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Other ways to contribute
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/80">
              We&apos;re always glad to welcome new faces. These roles
              don&apos;t have a formal application yet, so just reach out on
              Discord if you&apos;re interested.
            </p>
          </div>
        </IntersectionTransition>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <IntersectionTransition key={role.title}>
              <RoleCard
                icon={role.icon}
                title={role.title}
                description={role.description}
                features={role.features}
              />
            </IntersectionTransition>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="py-16 sm:py-24">
          <IntersectionTransition>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Still have questions?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-white/80">
                Get in touch and the team will be happy to help.
              </p>
            </div>
            <div className="mt-10">
              <JoinCTA />
            </div>
          </IntersectionTransition>
        </div>
      </div>
    </MotionConfig>
  );
}
