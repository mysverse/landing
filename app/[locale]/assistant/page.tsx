import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssistantApp from "app/_components/assistant/AssistantApp";
import { ASSISTANT_COPY } from "lib/assistant/copy";
import { isAssistantLocale } from "lib/assistant/types";
import { languageAlternates } from "utils/alternates";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isAssistantLocale(locale)) return {};
  return {
    title: ASSISTANT_COPY[locale].name,
    description: ASSISTANT_COPY[locale].tagline,
    alternates: languageAlternates("/assistant")
  };
}

export default async function AssistantPage({ params }: Props) {
  const { locale } = await params;
  if (!isAssistantLocale(locale)) notFound();
  return (
    <div className="mx-auto h-[min(760px,calc(100vh-9rem))] w-full max-w-4xl px-4 sm:px-6">
      <div className="border-edge bg-surface-card h-full overflow-hidden rounded-3xl border shadow-xl">
        <AssistantApp locale={locale} mode="page" />
      </div>
    </div>
  );
}
