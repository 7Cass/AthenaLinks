import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-[100dvh]">{children}</div>;
}
