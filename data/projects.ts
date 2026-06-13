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
import OutreachImmerse25 from "public/img/outreach_immerse25.webp";
import OutreachAdcs25 from "public/img/outreach_adcs25.webp";
import OutreachMindef from "public/img/outreach_mindef.webp";
import OutreachSearcct from "public/img/outreach_searcct.webp";
import OutreachUnicri2025 from "public/img/outreach_unicri.webp";
import OutreachSearcctMeeting from "public/img/outreach_searcct_meeting.webp";

type ProjectType = "MYSverse" | "Sim" | "Outreach" | "Network";
type ProjectStatus = "active" | "inactive" | "wip";

export interface Project {
  key: string;
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
    key: "lebuhraya",
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
      "Cruise long highways or jump into police and firefighter roleplay. An easy way to unwind and experience everyday Malaysian life on the road.",
    link: "https://www.roblox.com/games/4892731894/Lebuhraya",
    status: "active"
  },
  {
    key: "ruumah_v4",
    name: "Ruumah v4",
    launched: "Released April 2025",
    tagline:
      "Our latest Raya celebration is set in *Kampung Air*, Sabah's water villages and one of the most picturesque corners of Malaysia.",
    image: Ruumahv4FeaturePic,
    type: "MYSverse",
    link: "https://www.roblox.com/games/6789873305/Ruumah",
    status: "active"
  },
  {
    key: "ruumah_v3",
    name: "Ruumah v3",
    launched: "Released April 2024",
    tagline:
      "Come celebrate Raya in a lively suburban setting! You'll find local treats, cultural spots, and familiar MYSverse community references. It's a joyful part of our yearly virtual open house tradition.",
    image: Rumah3FeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    key: "ruumah_v2",
    name: "Ruumah v2",
    launched: "Released 2021",
    videoSrc: [
      {
        src: "https://r2.mysver.se/ruumah2Feature.webm",
        type: "video/webm"
      }
    ],
    tagline:
      "Celebrate the festive season in a charming coastal *kampung*. This edition is full of little details, good food and a strong sense of community.",
    image: RumahFeaturePic,
    type: "MYSverse",
    status: "inactive"
  },
  {
    key: "bandaraya_klasik",
    name: "Bandaraya Klasik",
    launched: "Released 2025",
    tagline:
      "Take a trip back to the early days of [MYS] Malaysia! This classic edition opens KL 2.9 for everyone to enjoy, with its original environment, updated compatibility, and teams that are free for all to join.",
    image: BandarayaKlasikFeaturePic,
    type: "MYSverse",
    status: "active",
    link: "https://www.roblox.com/games/92076437965766/Bandaraya-Klasik"
  },
  {
    key: "sumaya",
    name: "Sumaya",
    launched: "Open Beta 2026",
    tagline:
      "Inspired by Beaufort, a rural Sabahan district, Sumaya (formerly Daerah) is our most ambitious project so far. Its open-ended, story-rich gameplay gives both new and returning players something completely fresh in the MYSverse.",
    image: DaerahFeaturePic,
    type: "MYSverse",
    status: "active",
    link: "https://www.roblox.com/games/137577526370180"
  },
  // MYSverse Sim
  {
    key: "bandaraya_v3",
    name: "Bandaraya v3",
    launched: "Released Sep 2020",
    image: BandarFeaturePic,
    type: "Sim",
    status: "active",
    tagline:
      "Explore a virtual Kuala Lumpur built for roleplay, whether you're living daily life or on official duty. As MYSverse's main city hub, there's always something happening.",
    link: "https://www.roblox.com/games/481538620/Bandaraya"
  },
  {
    key: "bandaraya_v4",
    name: "Bandaraya v4",
    launched: "Coming 2026",
    status: "wip",
    image: Bandarayav4FeaturePic,
    type: "Sim",
    tagline:
      "Our next big city update expands into Dataran Merdeka! Expect iconic landmarks, better vehicle systems and more roleplay jobs, while staying true to the city's heritage."
  },
  {
    key: "tentera_mysverse",
    name: "Tentera MYSverse",
    launched: "Since 2016",
    tagline:
      "A long-standing part of MYSverse Sim, our military roleplay agency uses carefully researched equipment, procedures and training to portray Malaysia's Armed Forces authentically and respectfully.",
    image: MafFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/tentera/",
    status: "active"
  },
  {
    key: "polis_mysverse",
    name: "Polis MYSverse",
    launched: "Since 2017",
    tagline:
      "Our police roleplay community is built on realism, teamwork and service, covering everything from managing traffic to handling tactical situations. It's a big part of life in MYSverse Sim places like Bandaraya.",
    image: PolisFeaturePic,
    type: "Sim",
    link: "https://sim.mysver.se/polis/",
    status: "active"
  },
  {
    key: "bomba_mysverse",
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
    key: "kesihatan_mysverse",
    name: "Kesihatan MYSverse",
    launched: "Since 2025",
    tagline:
      "Our healthcare roleplay community lets you play as doctors, nurses and paramedics, taking part in emergency scenarios and public health activities across the MYSverse Sim world.",
    image: KesihatanFeature,
    type: "Sim",
    link: "https://sim.mysver.se/kesihatan/",
    status: "active"
  },
  // MYSverse Network
  {
    key: "mysair",
    name: "MYSair",
    launched: "Founded 2021",
    tagline:
      "Once Malaysia Airways, now MYSair takes you *beyond continents*. Fly as a passenger or join the crew for ro-aviation with warm Malaysian hospitality, sharing our culture with a global audience.",
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
    key: "tehlife",
    name: "Tehlife",
    launched: "Founded 2021",
    tagline:
      "A lively virtual café inspired by Malaysian bubble tea spots, with a flavour of its own. *Tea is life* here, with drinks from boba to kopi. It's where café culture and the MYSverse community meet.",
    image: "https://blog-assets.mysver.se/images/2024/12/image-14.png",
    type: "Network",
    link: "https://www.roblox.com/communities/5000345/Tehlife"
  },
  // In real life
  {
    key: "unicri_workshop",
    name: "UNICRI Workshop",
    launched: "December 2025",
    location: "Singapore",
    tagline:
      "We were invited by UNICRI and Singapore's Ministry of Home Affairs to present at a workshop on Online Radicalisation and Extremism, where we shared MYSverse's community-led approach to moderation and community standards.",
    type: "Outreach",
    image: OutreachUnicri2025,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7408077530101899264"
  },
  {
    key: "searcct_strategic_planning_meeting",
    name: "SEARCCT Strategic Planning Meeting",
    launched: "September 2025",
    location: "Hotel Parkroyal Collection, Kuala Lumpur",
    tagline:
      "We took part in SEARCCT's Strategic Planning Meeting under the Ministry of Foreign Affairs Malaysia, discussing how the video games community can help counter harmful narratives through digital engagement, storytelling and positive online spaces.",
    type: "Outreach",
    image: OutreachSearcctMeeting,
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7379493073325707265"
  },
  {
    key: "adcs_2025",
    name: "ADCS 2025",
    launched: "September 2025",
    location: "Persada Johor",
    tagline:
      "We attended the ASEAN Digital Content Summit 2025, one of Southeast Asia's biggest gaming and digital content events! Our Lebuhraya racing challenges drew crowds, and we met hundreds of attendees from across the region's gaming industry.",
    image: OutreachAdcs25,
    type: "Outreach",
    link: "/blog/mys/adcs-2025"
  },
  {
    key: "searcct",
    name: "SEARCCT",
    launched: "August 2025",
    location: "vOffice Empire Tower",
    tagline:
      "Our team met up with the Southeast Asia Regional Centre for Counter-Terrorism, where we shared how MYSverse has been building a safe and secure community online for over 10 years through active moderation and other policies.",
    image: OutreachSearcct,
    type: "Outreach"
  },
  {
    key: "immerse_kl_25",
    name: "IMMERSE KL 25",
    launched: "July 2025",
    location: "CCEC Nexus",
    tagline:
      "We showcased MYSverse at IMMERSE KL x CelcomDigi, Malaysia's biggest event for immersive technology and creative content, and met industry leaders and community members in person!",
    image: OutreachImmerse25,
    type: "Outreach",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7354344621331664896/"
  },
  {
    key: "kementerian_pertahanan",
    name: "Kementerian Pertahanan",
    launched: "June 2025",
    location: "Wisma Pertahanan",
    tagline:
      "We had a productive meeting with the Ministry of Defence, discussing how MYSverse can support their goals in education, community engagement, and public awareness.",
    image: OutreachMindef,
    type: "Outreach"
  },
  {
    key: "nst_viral_feature",
    name: "NST Viral Feature",
    launched: "January 2025",
    tagline:
      "The New Straits Times featured MYSverse's virtual election for its 22nd Prime Minister! The story covered our civic education efforts and how young Malaysians take part in a simulated democracy.",
    image: OutreachNst,
    type: "Outreach",
    link: "https://www.nst.com.my/news/nst-viral/2025/01/1158200/nstviral-popular-malaysian-video-game-simulation-mysverse-elects-22nd"
  },
  {
    key: "mercy_malaysia_imu",
    name: "MERCY Malaysia - IMU",
    launched: "November 2024",
    location: "vOffice Mont Kiara",
    tagline:
      "We met up with MERCY Malaysia and IMU to explore how engaging digital experiences, like MYSverse, can help them spread health awareness.",
    image: OutreachMercy,
    type: "Outreach"
  },
  {
    key: "u_digitaloka",
    name: "U-Digitaloka",
    launched: "June 2024",
    tagline:
      "We showcased MYSverse at UiTM Shah Alam with the Ministry of Digital, showing how the platform can share Malaysian cultural and historical stories.",
    location: "UiTM Shah Alam",
    image: OutreachUITM,
    type: "Outreach",
    link: "/blog/mys/u-digitaloka"
  },
  {
    key: "polis_diraja_malaysia",
    name: "Polis DiRaja Malaysia",
    launched: "January 2024",
    location: "PDRM HQ Bukit Aman",
    tagline:
      "We're in discussions with the Royal Malaysia Police about using virtual spaces to build public awareness, promote safety and improve understanding of police work in Malaysia.",
    image: OutreachPDRM,
    type: "Outreach"
  },
  {
    key: "donation_to_gaza_relief",
    name: "Donation to Gaza Relief",
    launched: "October 2023",
    tagline:
      "MYSverse donated RM1,000 to Persatuan Cinta Gaza Malaysia, while continuing to maintain a neutral platform policy on Roblox.",
    image: OutreachCgm,
    type: "Outreach",
    link: "/blog/mys/statement-on-israel-palestine"
  },
  {
    key: "maxis_ekelas_minigames",
    name: "Maxis eKelas Minigames",
    launched: "Completed 2022",
    tagline:
      "Core MYSverse team members independently developed these educational minigames for Maxis eKelas. They are part of the Kancil Award-winning Misi Jelajah Digital and promote STEM learning through fun, interactive play.",
    image: OutreachEkelas,
    type: "Outreach",
    link: "https://ekelas-minigames.yan.gg/"
  }
];
