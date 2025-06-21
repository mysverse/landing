import RobloxLogo from "public/img/Roblox_Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBluesky,
  faDiscord,
  faFacebook,
  faGithub,
  faGuilded,
  faInstagram,
  faLinkedin,
  faTiktok,
  faWhatsapp,
  faXTwitter,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

export const socials = [
  {
    name: "Roblox",
    href: "https://roblox.com/groups/1143446",
    icon: <RobloxLogo className="mb-1 inline-flex h-[1em]" />
  },
  {
    name: "Discord",
    href: "https://discord.gg/mysverse",
    icon: <FontAwesomeIcon icon={faDiscord} />
  },
  {
    name: "Guilded",
    href: "https://guilded.gg/mys",
    icon: <FontAwesomeIcon icon={faGuilded} />
  },
  {
    name: "Facebook",
    href: "https://facebook.com/people/MYSverse/61573938995837/",
    icon: <FontAwesomeIcon icon={faFacebook} />
  },
  {
    name: "X",
    href: "https://x.com/mys_verse",
    icon: <FontAwesomeIcon icon={faXTwitter} />
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/mysver.se",
    icon: <FontAwesomeIcon icon={faBluesky} />
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VaqTaIj59PwIN60Zxf1J",
    icon: <FontAwesomeIcon icon={faWhatsapp} />
  },
  {
    name: "Instagram",
    href: "https://instagram.com/mysver.se/",
    icon: <FontAwesomeIcon icon={faInstagram} />
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@mys_verse",
    icon: <FontAwesomeIcon icon={faYoutube} />
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@mysver.se",
    icon: <FontAwesomeIcon icon={faTiktok} />
  },
  {
    name: "GitHub",
    href: "https://github.com/mysverse",
    icon: <FontAwesomeIcon icon={faGithub} />
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/mysverse/",
    icon: <FontAwesomeIcon icon={faLinkedin} />
  }
];
