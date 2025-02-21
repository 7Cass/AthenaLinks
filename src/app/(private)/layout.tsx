import { PageHeader } from "@/components/page-header";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plutus | Dashboard",
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-slate-100">
      <Sidebar />
      <div className="min-h-[100dvh] w-full bg-background">
        <div className="flex items-center gap-4 border-b p-4 bg-sidebar">
          <SidebarTrigger />
          <PageHeader />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
