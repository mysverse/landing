"use client";

import { ReactNode } from "react";
import RotatingCard from "app/_components/RotatingCard";
import { CheckIcon } from "@heroicons/react/20/solid";

interface RoleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
}

export default function RoleCard({
  icon,
  title,
  description,
  features
}: RoleCardProps) {
  return (
    <RotatingCard className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-gray-900">
      <div className="flex h-full flex-col">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-6 leading-7 text-gray-600 dark:text-white/80">
          {description}
        </p>
        <ul className="mt-auto space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-700 dark:text-white/70"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </RotatingCard>
  );
}
