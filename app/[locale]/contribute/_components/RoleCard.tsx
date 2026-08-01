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
    <RotatingCard className="border-edge bg-surface-card h-full rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex h-full flex-col">
        <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl">
          {icon}
        </div>
        <h3 className="heading-3 mb-2">{title}</h3>
        <p className="body-base mb-6">{description}</p>
        <ul className="mt-auto space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-body flex items-start gap-3 text-sm"
            >
              <CheckIcon className="text-primary mt-0.5 size-4 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </RotatingCard>
  );
}
