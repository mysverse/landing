"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { openPositions } from "data/contribute";
import ApplyButton from "./ApplyButton";

const steps = [
  {
    title: "Choose your role & apply",
    description:
      "Submit the application form for the role that fits you. It only takes a few minutes."
  },
  {
    title: "We review your application",
    description:
      "Our team reviews every submission. We value clear, proactive communication."
  },
  {
    title: "Interview or onboarding",
    description:
      "Head Developer applicants proceed to an interview; Developers are onboarded to the Dev Team."
  }
];

const listVariants: Variants = {
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.45 }
  }
};

export default function ApplyProcess() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-primary text-base/7 font-semibold">The process</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          How applying works
        </h2>
      </div>

      <m.ol
        className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <m.li key={step.title} variants={itemVariants}>
            <div className="bg-primary flex size-10 items-center justify-center rounded-full text-base font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-white/70">
              {step.description}
            </p>
          </m.li>
        ))}
      </m.ol>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {openPositions.map((position) => (
          <ApplyButton
            key={position.id}
            position={position}
            placement="final_cta"
            variant={position.level === "lead" ? "primary" : "secondary"}
            label={`Apply as ${position.title}`}
          />
        ))}
      </div>
    </div>
  );
}
