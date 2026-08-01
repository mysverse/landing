"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "app/_components/ui/Button";
import Container from "app/_components/ui/Container";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h1 className="heading-2">{t("title")}</h1>
      <p className="body-lg mx-auto mt-4 max-w-xl">{t("description")}</p>
      <div className="mt-8 flex justify-center">
        <Button onClick={reset}>{t("retry")}</Button>
      </div>
    </Container>
  );
}
