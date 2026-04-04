import IntersectionTransition from "app/_components/IntersectionTransition";
import { roles } from "data/contribute";
import ContributeStats from "./_components/ContributeStats";
import RoleCard from "./_components/RoleCard";
import JoinCTA from "./_components/JoinCTA";

export const metadata = {
  title: "Contribute"
};

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* Hero Section */}
      <IntersectionTransition>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Contribute to MYSverse
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-white/80">
            MYSverse is built by a passionate, volunteer-driven community. From
            developers and moderators to content creators, every contributor
            plays a vital role in shaping our Malaysian metaverse — gaining
            real-world experience, building lasting friendships, and making a
            meaningful impact along the way.
          </p>
        </div>
      </IntersectionTransition>

      {/* Stats */}
      <div className="py-16 sm:py-24">
        <IntersectionTransition>
          <ContributeStats />
        </IntersectionTransition>
      </div>

      {/* Role Cards */}
      <IntersectionTransition>
        <div className="text-center">
          <p className="text-base/7 font-semibold text-primary">
            Find your role
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            You can contribute as a...
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-white/80">
            Whether you write code, keep our community safe, or create content
            that inspires — there&apos;s a place for you at MYSverse.
          </p>
        </div>
      </IntersectionTransition>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Volunteer Model Narrative */}
      <div className="py-16 sm:py-24">
        <IntersectionTransition>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base/7 font-semibold text-primary">
              Our model
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Volunteer-driven, experience-focused
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-8 text-gray-600 dark:text-white/80">
              <p>
                At MYSverse, we believe great things happen when passionate
                people come together. Our team is made up of volunteers from all
                walks of life — students, professionals, and hobbyists — united
                by a shared love for building something meaningful.
              </p>
              <p>
                Contributors gain hands-on experience in game development,
                community management, and content creation. For developers, our
                Pay-Per-Task bounty system means you can earn while you learn,
                with instant payouts and a flexible workflow that fits your
                schedule.
              </p>
            </div>
          </div>
        </IntersectionTransition>
      </div>

      {/* Join CTA */}
      <div className="pb-16 sm:pb-24">
        <IntersectionTransition>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Ready to contribute?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-white/80">
              Get in touch and join the team. We&apos;d love to have you.
            </p>
          </div>
          <div className="mt-10">
            <JoinCTA />
          </div>
        </IntersectionTransition>
      </div>
    </div>
  );
}
