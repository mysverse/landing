import { ReactNode } from "react";
import {
  CodeBracketIcon,
  ShieldCheckIcon,
  CameraIcon
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { EnvelopeIcon, DocumentTextIcon } from "@heroicons/react/24/solid";

export interface Role {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
}

export const roles: Role[] = [
  {
    title: "Developer",
    description:
      "Build the future of MYSverse through our Pay-Per-Task bounty system. Pick tasks that match your skills, work at your own pace, and get paid for every contribution.",
    features: [
      "Paid bounties via our Pay-Per-Task arrangement",
      "Internal DevHub platform with easy onboarding",
      "Linear-powered task tracking for clear deliverables",
      "Instant payouts via Robux or Malaysian bank transfers",
      "Build your portfolio with real-world game development"
    ],
    icon: <CodeBracketIcon className="size-8" />
  },
  {
    title: "Moderator",
    description:
      "Be the backbone of our community. Moderators help keep MYSverse a safe, welcoming, and enjoyable space for thousands of players across our experiences.",
    features: [
      "Serve and protect a thriving community of players",
      "Access to moderation tools and training resources",
      "Develop leadership and conflict resolution skills",
      "Be part of a close-knit moderation team",
      "Shape community guidelines and culture"
    ],
    icon: <ShieldCheckIcon className="size-8" />
  },
  {
    title: "Content Creator",
    description:
      "Help tell the MYSverse story. From social media to video production, content creators bring our community and experiences to life for a wider audience.",
    features: [
      "Create content across social media platforms",
      "Produce videos, graphics, and written content",
      "Collaborate with the team on campaigns and events",
      "Grow your creative portfolio and audience",
      "Access to exclusive behind-the-scenes content"
    ],
    icon: <CameraIcon className="size-8" />
  }
];

export interface JoinMethod {
  type: "email" | "discord" | "form" | "custom";
  label: string;
  description: string;
  href: string;
  icon: ReactNode;
  primary?: boolean;
}

export const joinMethods: JoinMethod[] = [
  {
    type: "discord",
    label: "Join our Discord",
    description: "Connect with the team and get started",
    href: "https://discord.com/invite/uPkrYWd",
    icon: <FontAwesomeIcon icon={faDiscord} className="size-5" />,
    primary: true
  },
  {
    type: "email",
    label: "Send us an email",
    description: "Reach out directly to the team",
    href: "mailto:yan@mysver.se",
    icon: <EnvelopeIcon className="size-5" />
  }
  // Uncomment and add more join methods as needed:
  // {
  //   type: "form",
  //   label: "Fill out the application",
  //   description: "Complete a short form to get started",
  //   href: "https://forms.gle/your-form-id",
  //   icon: <DocumentTextIcon className="size-5" />
  // }
];
