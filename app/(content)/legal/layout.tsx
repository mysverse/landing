import PageAnimation from "app/_components/PageAnimation";

export default function LegalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PageAnimation className="mx-6 max-w-4xl lg:mx-auto">
      <div className="prose lg:prose-xl dark:prose-invert max-w-full">
        {children}
      </div>
    </PageAnimation>
  );
}
