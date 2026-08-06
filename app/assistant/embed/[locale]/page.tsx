import { notFound } from "next/navigation";
import AssistantApp from "app/_components/assistant/AssistantApp";
import { ASSISTANT_LOCALES, isAssistantLocale } from "lib/assistant/types";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ASSISTANT_LOCALES.map((locale) => ({ locale }));
}

export default async function AssistantEmbedPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAssistantLocale(locale)) notFound();
  return <AssistantApp locale={locale} mode="embed" />;
}
