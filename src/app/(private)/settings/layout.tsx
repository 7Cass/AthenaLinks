import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container max-w-screen-lg py-12">
      <div className="grid grid-cols-[10rem_1fr] gap-4 text-xs">
        <SettingsSidebar />
        {children}
      </div>
    </div>
  );
}
