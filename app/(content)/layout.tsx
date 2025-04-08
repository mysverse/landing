import PageAnimation from "app/_components/PageAnimation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageAnimation>{children}</PageAnimation>;
}
