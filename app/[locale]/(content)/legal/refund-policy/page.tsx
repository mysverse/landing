import type { Metadata } from "next";
import { legalEntity } from "data/legal";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return {
    title: t("refund.title"),
    description: t("refund.desc")
  };
}

export default async function RefundPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const filePath = path.join(
    process.cwd(),
    "messages",
    "legal",
    `refund_${locale}.md`
  );

  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    // fallback to English if the translation file is missing
    const fallbackPath = path.join(
      process.cwd(),
      "messages",
      "legal",
      "refund_en.md"
    );
    content = fs.readFileSync(fallbackPath, "utf-8");
  }

  // Replace placeholders: {{name}}, {{registration}}, {{email}}, {{effectiveDate}}
  content = content
    .replaceAll("{{name}}", legalEntity.name)
    .replaceAll("{{registration}}", legalEntity.registration)
    .replaceAll("{{email}}", legalEntity.email)
    .replaceAll("{{effectiveDate}}", legalEntity.effectiveDate);

  return <ReactMarkdown>{content}</ReactMarkdown>;
}
