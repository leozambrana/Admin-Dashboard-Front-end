import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos",
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
