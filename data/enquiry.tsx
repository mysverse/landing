import type { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { socials } from "./socials";

export const CONTACT_EMAIL = "yan@mysver.se";

function buildMailto(subject: string, body?: string) {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  return `mailto:${CONTACT_EMAIL}?${params.join("&")}`;
}

function socialHref(name: string, fallback: string) {
  return socials.find((s) => s.name === name)?.href || fallback;
}

export interface EnquiryDestination {
  label: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
  plausibleType:
    | "discord"
    | "email"
    | "whatsapp"
    | "whatsapp_channel"
    | "contribute";
  primary?: boolean;
}

export interface EnquiryCategory {
  id: "community" | "business" | "press" | "join" | "other";
  label: string;
  description: string;
  icon: ReactNode;
  resultHeading: string;
  resultBody: string;
  destinations: EnquiryDestination[];
}

export const enquiryCategories: EnquiryCategory[] = [
  {
    id: "community",
    label: "Games & community",
    description: "Game help, bug reports, feedback and chat",
    icon: <ChatBubbleLeftRightIcon className="size-5" />,
    resultHeading: "Join the community",
    resultBody:
      "Our Discord server is the fastest way to get help, since the team and fellow players hang out there every day. If you'd rather just follow along, our WhatsApp channel has the latest announcements.",
    destinations: [
      {
        label: "Join the Discord",
        href: socialHref("Discord", "https://discord.com/invite/uPkrYWd"),
        external: true,
        icon: <FontAwesomeIcon icon={faDiscord} />,
        plausibleType: "discord",
        primary: true
      },
      {
        label: "Follow on WhatsApp",
        href: socialHref(
          "WhatsApp",
          "https://whatsapp.com/channel/0029VaqTaIj59PwIN60Zxf1J"
        ),
        external: true,
        icon: <FontAwesomeIcon icon={faWhatsapp} />,
        plausibleType: "whatsapp_channel"
      }
    ]
  },
  {
    id: "business",
    label: "Business, partnerships & legal",
    description: "Commercial, collaboration or legal matters",
    icon: <BriefcaseIcon className="size-5" />,
    resultHeading: "Email is best for this",
    resultBody:
      "Serious enquiries sent by email get priority and reach the right person directly. Include some background and we'll get back to you as soon as we can.",
    destinations: [
      {
        label: `Email ${CONTACT_EMAIL}`,
        href: buildMailto("Business / partnership enquiry - MYSverse"),
        icon: <EnvelopeIcon className="size-4" />,
        plausibleType: "email",
        primary: true
      }
    ]
  },
  {
    id: "press",
    label: "Press & media",
    description: "Interviews, articles and media requests",
    icon: <NewspaperIcon className="size-5" />,
    resultHeading: "Drop us an email",
    resultBody:
      "We're happy to help with stories about MYSverse and Malaysian game development. Include your publication and deadline in your email so we can get back to you in time.",
    destinations: [
      {
        label: "Email the team",
        href: buildMailto(
          "Press / media enquiry - MYSverse",
          "Publication:\nDeadline:\nEnquiry:\n"
        ),
        icon: <EnvelopeIcon className="size-4" />,
        plausibleType: "email",
        primary: true
      }
    ]
  },
  {
    id: "join",
    label: "Join the team",
    description: "Volunteer with us as a developer or creator",
    icon: <UserGroupIcon className="size-5" />,
    resultHeading: "We'd love your help",
    resultBody:
      "MYSverse is built entirely by volunteers, and we're always looking for new contributors. Check out our open roles and what it's like to work with us.",
    destinations: [
      {
        label: "See open roles",
        href: "/contribute",
        icon: <ArrowRightIcon className="size-4" />,
        plausibleType: "contribute",
        primary: true
      }
    ]
  },
  {
    id: "other",
    label: "Something else",
    description: "Anything that doesn't fit the above",
    icon: <QuestionMarkCircleIcon className="size-5" />,
    resultHeading: "Message us on WhatsApp",
    resultBody:
      "Not sure where your enquiry fits? Send us a WhatsApp message and we'll point you in the right direction. As a volunteer team we can take a while to reply, so anything serious is still best sent by email.",
    destinations: [
      {
        label: "Chat on WhatsApp",
        href: "https://wa.me/601154156978",
        external: true,
        icon: <FontAwesomeIcon icon={faWhatsapp} />,
        plausibleType: "whatsapp",
        primary: true
      }
    ]
  }
];
