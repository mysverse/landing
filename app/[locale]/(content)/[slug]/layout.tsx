import PageAnimation from "app/_components/PageAnimation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageAnimation className="mx-6 max-w-4xl lg:mx-auto">
      {children}
    </PageAnimation>
  );
}
