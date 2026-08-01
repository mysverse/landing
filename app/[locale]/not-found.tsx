import { useTranslations } from "next-intl";
import Button from "app/_components/ui/Button";
import Container from "app/_components/ui/Container";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="heading-2 mt-2">{t("title")}</h1>
      <p className="body-lg mx-auto mt-4 max-w-xl">{t("description")}</p>
      <div className="mt-8 flex justify-center">
        <Button href="/">{t("backHome")}</Button>
      </div>
    </Container>
  );
}
