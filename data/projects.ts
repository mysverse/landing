import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { VideoSource } from "app/_components/VideoPlayer";
import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import Bandarayav4FeaturePic from "public/img/bandaraya_v4_feature.webp";
import MafFeaturePic from "public/img/feature_mys_tentera.webp";
import PolisFeaturePic from "public/img/feature_mys_polis.webp";
import BombaFeaturePic from "public/img/feature_mys_bomba.webp";
import Ruumahv4FeaturePic from "public/img/ruumah_v4_feature.webp";
import KesihatanFeature from "public/img/kesihatan_feature.webp";
import OutreachMercy from "public/img/outreach_mercy.webp";
import OutreachPDRM from "public/img/outreach_pdrm.webp";
import OutreachUITM from "public/img/outreach_uitm.webp";
import OutreachEkelas from "public/img/outreach_ekelas.webp";
import OutreachNst from "public/img/outreach_nst.webp";
import OutreachCgm from "public/img/outreach_cgm.webp";

type ProjectType = "MYSverse" | "Sim" | "Outreach" | "Network";
type ProjectStatus = "active" | "inactive" | "wip";

export interface Project {
  type: ProjectType;
  name: string;
  tagline: string;
  location?: string;
  status?: ProjectStatus;
  launched?: string;
  image?: string | StaticImport;
  videoSrc?: VideoSource[];
  link?: string;
}

export const projects: Project[] = [
  {
    name: "Lebuhraya",
    launched: "Released 2020",
    image: LebuhrayaFeaturePic,
    type: "MYSverse",
    videoSrc: [
      {
        src: "https://r2.mysver.se/lebuhrayaFeature.webm",
        type: "video/webm"
      }
    ],
    tagline:
      "Lebuhraya offers a serene driving experience along an expansive, well-crafted highway system. From vehicle cruising to interactive police and firefighter roleplay, it’s the perfect way to unwind while immersing yourself in everyday Malaysian life.",
    link: "https://www.roblox.com/games/4892731894/Lebuhraya",
    status: "active"
  },
  {
    name: "Ruumah v4",
    launched: "Released April 2025",
    tagline:
      "The latest chapter in our festive Raya series brings players to *Kampung Air*, the iconic water villages of Sandakan, Sabah—highlighting a truly unique and picturesque Malaysian setting.",
    image: Ruumahv4FeaturePic,
    type: "MYSverse",
    link: "https://www.roblox.com/games/6789873305/Ruumah",
    status: "active"
  },
  {
    name: "Ruumah v3",
    launched: "Released April 2024",
    tagline: `Celebrate Raya in a vibrant suburban setting, complete with local
        delicacies, cultural landmarks, and references beloved by the MYSverse
        community. A joyful continuation of our annual virtual open house
        tradition.`,
    image: Rumah3FeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    name: "Ruumah v2",
    launched: "Released 2021",
    videoSrc: [
      {
        src: "https://r2.mysver.se/ruumah2Feature.webm",
        type: "video/webm"
      }
    ],
    tagline:
      "Set in a charming coastal *kampung*, this edition brings traditional festive celebrations to life with heartfelt detail, delicious food, and community togetherness.",
    image: RumahFeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    name: "Daerah",
    launched: "Coming 2025",
    tagline:
      "Inspired by the rural Sabahan district of Beaufort, Daerah is our most ambitious project yet. It introduces open-ended, narrative-rich gameplay that invites all players—new and returning—to discover something entirely fresh within the MYSverse.",
    image: DaerahFeaturePic,
    type: "MYSverse",
    status: "wip"
  },
  // MYSverse Sim
  {
    name: "Bandaraya v3",
    launched: "Released Sep 2020",
    image: BandarFeaturePic,
    type: "Sim",
    status: "active",
    tagline:
      "An immersive reimagining of Kuala Lumpur designed for roleplay at every level—from daily life to official duties. Serving as MYSverse’s primary city hub, it's detailed, dynamic, and constantly evolving.",
    link: "https://www.roblox.com/games/481538620/Bandaraya"
  },
  {
    name: "Bandaraya v4",
    launched: "Coming 2025",
    status: "wip",
    image: Bandarayav4FeaturePic,
    type: "Sim",
    tagline:
      "Our next major city update pushes into Dataran Merdeka, bringing with it iconic landmarks, enhanced vehicle systems, and expanded roleplay jobs—all while staying true to the city’s heart and heritage."
  },
  {
    name: "Tentera MYSverse",
    launched: "Since 2016",
    tagline:
      "A long-standing pillar of MYSverse Sim, our military roleplay agency features carefully researched equipment, procedures, and training to deliver an authentic and respectful representation of Malaysia’s Armed Forces.",
    image: MafFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/tentera/",
    status: "active"
  },
  {
    name: "Polis MYSverse",
    launched: "Since 2017",
    tagline:
      "From traffic management to tactical operations, our police roleplay community is built around realism, teamwork, and service. It’s a cornerstone of everyday life in MYSverse Sim environments like Bandaraya.",
    image: PolisFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/polis/",
    status: "active"
  },
  {
    name: "Bomba MYSverse",
    launched: "Since 2024",
    tagline:
      "Join the MYSverse firefighting community and respond to emergencies with one of the most advanced sets of virtual fire-rescue equipment available on Roblox.",
    image: BombaFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/bomba/",
    status: "active"
  },
  {
    name: "Kesihatan MYSverse",
    launched: "Since 2025",
    tagline:
      "Our healthcare roleplay community gives players the chance to act as doctors, nurses, and paramedics—engaging in meaningful emergency scenarios and public healthcare outreach within the MYSverse Sim ecosystem.",
    image: KesihatanFeature,
    type: "Sim",
    link: "https://sim.mysver.se/kesihatan/",
    status: "active"
  },
  // MYSverse Network
  {
    name: "MYSair",
    launched: "Founded 2021",
    tagline:
      "Formerly Malaysia Airways, this is a virtual airline where every journey goes *beyond continents*. Whether you're flying as a passenger or serving as crew, MYSair blends immersive ro-aviation with Malaysian hospitality, connecting a global audience to the heart of our culture through every takeoff and landing.",
    videoSrc: [
      {
        src: "https://r2.mysver.se/mysairFeature.webm",
        type: "video/webm"
      }
    ],
    type: "Network",
    link: "https://www.roblox.com/communities/5000479/MYSair"
  },
  {
    name: "Tehlife",
    launched: "Founded 2021",
    tagline:
      "Our vibrant virtual café inspired by popular Malaysian bubble tea brands — but with a twist. While *tea is life*, it serves everything from boba to kopi, blending café culture with the MYSverse community and real-life Malaysian vibes.",
    image: "https://blog.mysver.se/content/images/2024/12/image-14.png",
    type: "Network",
    link: "https://www.roblox.com/communities/5000345/Tehlife"
  },
  // In real life
  {
    name: "NST Viral Feature",
    launched: "January 2025",
    tagline:
      "The New Straits Times covered MYSverse's virtual election of its 22nd Prime Minister, spotlighting our commitment to civic education and youth empowerment in a simulated Malaysian democracy.",
    image: OutreachNst,
    type: "Outreach",
    link: "https://www.nst.com.my/news/nst-viral/2025/01/1158200/nstviral-popular-malaysian-video-game-simulation-mysverse-elects-22nd"
  },
  {
    name: "MERCY Malaysia - IMU",
    launched: "November 2024",
    location: "vOffice Mont Kiara",
    tagline:
      "Together with MERCY Malaysia and IMU, we explored how immersive digital experiences like MYSverse can support their goals around health awareness.",
    image: OutreachMercy,
    type: "Outreach"
  },
  {
    name: "U-Digitaloka",
    launched: "June 2024",
    tagline:
      "Showcased at UiTM Shah Alam in partnership with the Ministry of Digital, this outreach highlighted how MYSverse can promote national identity through cultural and historical storytelling.",
    location: "UiTM Shah Alam",
    image: OutreachUITM,
    type: "Outreach"
  },
  {
    name: "Polis DiRaja Malaysia",
    launched: "January 2024",
    location: "PDRM HQ Bukit Aman",
    tagline:
      "Our ongoing engagement with the Royal Malaysia Police focuses on using virtual spaces to foster public awareness, safety, and better understanding of policing in Malaysia.",
    image: OutreachPDRM,
    type: "Outreach"
  },
  {
    name: "Donation to Gaza Relief",
    launched: "October 2023",
    tagline:
      "MYSverse made a RM1,000 donation to Persatuan Cinta Gaza Malaysia, affirming our stance of compassion and awareness while maintaining a neutral platform policy on Roblox.",
    image: OutreachCgm,
    type: "Outreach",
    link: "/blog/mys/statement-on-israel-palestine"
  },
  {
    name: "Maxis eKelas Minigames",
    launched: "Completed 2022",
    tagline:
      "Independently developed by core MYSverse team members for Maxis eKelas, these educational minigames part of the Kancil Award-winning Misi Jelajah Digital promote STEM learning through fun, interactive experiences.",
    image: OutreachEkelas,
    type: "Outreach",
    link: "https://ekelas-minigames.yan.gg/"
  }
];
