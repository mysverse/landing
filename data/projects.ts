import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { VideoSource } from "app/_components/VideoPlayer";
import DaerahFeaturePic from "public/img/daerah_feature_image.webp";
import RumahFeaturePic from "public/img/rumah_feature_image.webp";
import Rumah3FeaturePic from "public/img/rumah3.webp";
import LebuhrayaFeaturePic from "public/img/lebuhraya_feature.webp";
import BandarFeaturePic from "public/img/bandar_feature_image.webp";
import Bandarayav4FeaturePic from "public/img/bandaraya_v4_feature.webp";
import BandarayaKlasikFeaturePic from "public/img/bandaraya_klasik_feature.webp";
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
import OutreachImmerse from "public/img/outreach_immerse25.webp";
import OutreachMindef from "public/img/outreach_mindef.webp";

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
      "Cruise expansive highways or jump into exciting police and firefighter roleplay. It's your perfect escape to unwind and experience everyday Malaysian life in a unique way.",
    link: "https://www.roblox.com/games/4892731894/Lebuhraya",
    status: "active"
  },
  {
    name: "Ruumah v4",
    launched: "Released April 2025",
    tagline:
      "Our latest Raya celebration transports you to *Kampung Air*, Sabah's stunning water villages. Discover a truly unique and picturesque piece of Malaysia.",
    image: Ruumahv4FeaturePic,
    type: "MYSverse",
    link: "https://www.roblox.com/games/6789873305/Ruumah",
    status: "active"
  },
  {
    name: "Ruumah v3",
    launched: "Released April 2024",
    tagline:
      "Come celebrate Raya in a lively suburban setting! You'll find local treats, cultural spots, and familiar MYSverse community references. It's a joyful part of our yearly virtual open house tradition.",
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
      "Experience traditional festive celebrations in a charming coastal *kampung*. This edition is filled with heartfelt details, delicious food, and a wonderful sense of community.",
    image: RumahFeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    name: "Bandaraya Klasik",
    launched: "Released 2025",
    tagline:
      "Take a wonderful trip back to the early days of [MYS] Malaysia! This classic edition opens KL 2.9 for everyone to enjoy, with its original environment, updated compatibility, and teams that are free for all to join.",
    image: BandarayaKlasikFeaturePic,
    type: "MYSverse",
    status: "active",
    link: "https://www.roblox.com/games/92076437965766/Bandaraya-Klasik"
  },
  {
    name: "Daerah",
    launched: "Coming 2025",
    tagline:
      "Drawing inspiration from Beaufort, a rural Sabahan district, Daerah is our most ambitious project so far. It offers open-ended, story-rich gameplay that invites every player, new or returning, to find something completely fresh in the MYSverse.",
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
      "Dive into a vibrant Kuala Lumpur, reimagined for rich roleplay experiences, whether you're living daily life or performing official duties. As MYSverse’s main city hub, it’s always alive with detail and new possibilities.",
    link: "https://www.roblox.com/games/481538620/Bandaraya"
  },
  {
    name: "Bandaraya v4",
    launched: "Coming 2025",
    status: "wip",
    image: Bandarayav4FeaturePic,
    type: "Sim",
    tagline:
      "Our next big city update expands into Dataran Merdeka! Expect iconic landmarks, better vehicle systems, and more roleplay jobs, all while honoring the city’s heart and heritage."
  },
  {
    name: "Tentera MYSverse",
    launched: "Since 2016",
    tagline:
      "A steadfast part of MYSverse Sim, our military roleplay agency uses carefully researched equipment, procedures, and training. We aim to offer an authentic and respectful portrayal of Malaysia’s Armed Forces.",
    image: MafFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/tentera/",
    status: "active"
  },
  {
    name: "Polis MYSverse",
    launched: "Since 2017",
    tagline:
      "Our police roleplay community thrives on realism, teamwork, and service, covering everything from managing traffic to handling tactical situations. It's a vital part of life in MYSverse Sim places like Bandaraya.",
    image: PolisFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/polis/",
    status: "active"
  },
  {
    name: "Bomba MYSverse",
    launched: "Since 2024",
    tagline:
      "Become a part of the MYSverse firefighting team! You'll respond to emergencies using some of the most advanced virtual fire-rescue equipment you can find on Roblox.",
    image: BombaFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/bomba/",
    status: "active"
  },
  {
    name: "Kesihatan MYSverse",
    launched: "Since 2025",
    tagline:
      "Our healthcare roleplay community lets you step into the shoes of doctors, nurses, and paramedics. You can take part in meaningful emergency scenarios and public health activities within the MYSverse Sim world.",
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
      "Once Malaysia Airways, now MYSair takes you *beyond continents*. Fly as a passenger or join the crew, enjoying immersive ro-aviation blended with warm Malaysian hospitality. We connect a global audience to our culture, one flight at a time.",
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
      "Step into our lively virtual café, inspired by beloved Malaysian bubble tea spots but with its own special flavor. *Tea is life* here, and we serve a wonderful variety of drinks, from boba to kopi. It’s where café culture, the MYSverse community, and real Malaysian vibes meet.",
    image: "https://blog-assets.mysver.se/images/2024/12/image-14.png",
    type: "Network",
    link: "https://www.roblox.com/communities/5000345/Tehlife"
  },
  // In real life
  {
    name: "IMMERSE KL 2025",
    launched: "July 2025",
    location: "CCEC Nexus",
    tagline:
      "We showcased MYSverse in IMMERSE KL x CelcomDigi, Malaysia's premier event for immersive technology and creative content, connecting with industry leaders and community members alike!",
    image: OutreachImmerse,
    type: "Outreach"
  },
  {
    name: "Kementerian Pertahanan",
    launched: "June 2025",
    location: "Wisma Pertahanan",
    tagline:
      "We had a productive meeting with the Ministry of Defence, discussing how MYSverse can support their goals in education, community engagement, and public awareness.",
    image: OutreachMindef,
    type: "Outreach"
  },
  {
    name: "NST Viral Feature",
    launched: "January 2025",
    tagline:
      "The New Straits Times featured MYSverse's virtual election for its 22nd Prime Minister! This highlighted our dedication to civic education and empowering youth through a simulated Malaysian democracy.",
    image: OutreachNst,
    type: "Outreach",
    link: "https://www.nst.com.my/news/nst-viral/2025/01/1158200/nstviral-popular-malaysian-video-game-simulation-mysverse-elects-22nd"
  },
  {
    name: "MERCY Malaysia - IMU",
    launched: "November 2024",
    location: "vOffice Mont Kiara",
    tagline:
      "We met up with MERCY Malaysia and IMU to explore how engaging digital experiences, like MYSverse, can help them spread health awareness.",
    image: OutreachMercy,
    type: "Outreach"
  },
  {
    name: "U-Digitaloka",
    launched: "June 2024",
    tagline:
      "We showcased MYSverse at UiTM Shah Alam with the Ministry of Digital. This event demonstrated how MYSverse can foster national identity by sharing cultural and historical stories.",
    location: "UiTM Shah Alam",
    image: OutreachUITM,
    type: "Outreach"
  },
  {
    name: "Polis DiRaja Malaysia",
    launched: "January 2024",
    location: "PDRM HQ Bukit Aman",
    tagline:
      "We're engaging in discussions with the Royal Malaysia Police. Our goal is to use virtual spaces to build public awareness, promote safety, and create a better understanding of police work in Malaysia.",
    image: OutreachPDRM,
    type: "Outreach"
  },
  {
    name: "Donation to Gaza Relief",
    launched: "October 2023",
    tagline:
      "MYSverse proudly donated RM1,000 to Persatuan Cinta Gaza Malaysia. This shows our compassion and awareness, while we continue to maintain a neutral platform policy on Roblox.",
    image: OutreachCgm,
    type: "Outreach",
    link: "/blog/mys/statement-on-israel-palestine"
  },
  {
    name: "Maxis eKelas Minigames",
    launched: "Completed 2022",
    tagline:
      "Core MYSverse team members independently developed these educational minigames for Maxis eKelas. They are part of the Kancil Award-winning Misi Jelajah Digital and promote STEM learning through fun, interactive play.",
    image: OutreachEkelas,
    type: "Outreach",
    link: "https://ekelas-minigames.yan.gg/"
  }
];
