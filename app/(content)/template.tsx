import PageAnimation from "app/_components/PageAnimation";

export default function ContentTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  return <PageAnimation>{children}</PageAnimation>;
}
