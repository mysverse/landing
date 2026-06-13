import {
  FireIcon,
  TruckIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline"; // Example icons for the "Gamepass Teams"
import BackgroundImageBox from "app/_components/Bento/BackgroundImageBox";
import LogoBox from "app/_components/Bento/LogoBox";
import TextOnlyBox from "app/_components/Bento/TextOnlyBox";
import clsx from "clsx";
import { Saira } from "next/font/google";
import { getTranslations, setRequestLocale } from "next-intl/server";

const wasteDisposalImg = "/img/lebuhraya/waste.webp";
const seasonPassImg = "/img/lebuhraya/season.webp";
const lebuhrayaLogo = "/img/lebuhraya/logo.webp";

const font = Saira({
  subsets: ["latin"]
});

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function LebuhrayaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Lebuhraya");

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-4 text-white sm:grid-cols-2 sm:gap-6 lg:grid-cols-6",
        "mx-3 max-w-dvw sm:mx-auto sm:max-w-7xl", // Adjust padding as needed
        font.className // Apply the custom font class
      )}
    >
      {/* Row 1 */}
      <div className="lg:col-span-2">
        <LogoBox
          logoUrl={lebuhrayaLogo}
          altText={t("alt.logo")}
          className="bg-brand-green h-full transition-shadow duration-300 hover:shadow-xl"
          width={200} // Adjust as needed
          height={70} // Adjust as needed
        />
      </div>

      <div className="lg:col-span-2">
        <TextOnlyBox
          title={t("boxes.gamepass.title")}
          text={t("boxes.gamepass.desc")}
          className="bg-brand-green flex h-full flex-col items-center justify-center text-center text-white transition-colors duration-300 hover:bg-green-600"
          titleClassName="text-lg sm:text-xl uppercase tracking-wider"
          textClassName="text-sm sm:text-base font-semibold mt-1"
        >
          <div className="mt-3 flex space-x-3">
            <UserGroupIcon className="h-8 w-8 text-white opacity-90" />
            <FireIcon className="h-8 w-8 text-white opacity-90" />
            <TruckIcon className="h-8 w-8 text-white opacity-90" />
          </div>
        </TextOnlyBox>
      </div>

      <div className="lg:col-span-2">
        <TextOnlyBox
          title={t("boxes.doubleXp.title")}
          text={t("boxes.doubleXp.desc")}
          className="bg-brand-green flex h-full flex-col items-center justify-center text-center transition-colors duration-300 hover:bg-green-600"
          titleClassName="text-3xl sm:text-4xl font-black" // Bolder title
          textClassName="text-lg sm:text-xl font-semibold uppercase tracking-wide"
        />
      </div>

      {/* Row 2 */}
      <div className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
        <BackgroundImageBox
          imageUrl={wasteDisposalImg}
          altText={t("alt.waste")}
          title={t("boxes.career.title")}
          subtitle={t("boxes.career.subtitle")}
          className="group flex min-h-[300px] flex-col justify-end text-white transition-shadow duration-300 hover:shadow-2xl sm:min-h-[350px] md:min-h-[420px]"
        >
          <div className="mt-auto rounded-md bg-black/60 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs font-semibold">
              {t("boxes.career.hoverTitle")}
            </p>
            <p className="text-xs">{t("boxes.career.hoverDesc")}</p>
          </div>
        </BackgroundImageBox>
      </div>

      <div className="sm:col-span-2 lg:col-span-3 lg:row-span-2">
        <BackgroundImageBox
          imageUrl={seasonPassImg}
          altText={t("alt.seasonPass")}
          title={t("boxes.season.title")}
          subtitle={t("boxes.season.subtitle")}
          className="group flex min-h-[300px] flex-col justify-end text-white transition-shadow duration-300 hover:shadow-2xl sm:min-h-[350px] md:min-h-[420px]"
        >
          <div className="mt-auto rounded-md bg-black/60 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-xs font-semibold">
              {t("boxes.season.subtitle")}
            </p>
            <p className="text-xs">{t("boxes.season.hoverDesc")}</p>
          </div>
        </BackgroundImageBox>
      </div>

      {/* Row 3 */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-6">
        <TextOnlyBox
          text={t("boxes.season.banner")}
          className="bg-dark-green py-4 text-center transition-colors duration-300 hover:bg-green-700"
          textClassName="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider"
        />
      </div>
    </div>
  );
}
