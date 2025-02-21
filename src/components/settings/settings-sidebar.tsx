"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    console.log(path, pathname);
    return pathname === path;
  };

  return (
    <aside>
      <nav>
        <main className="flex flex-col">
          <Link
            href="/settings"
            className={cn([
              "flex items-center px-3 py-2 rounded-md",
              isActive("/settings") && "bg-secondary",
            ])}
          >
            Profile
          </Link>
          <Link
            href="/settings/billing"
            className={cn([
              "flex items-center px-3 py-2 rounded-md",
              isActive("/settings/billing") && "bg-secondary",
            ])}
          >
            Billing
          </Link>
          <Link
            href="/settings/security"
            className={cn([
              "flex items-center px-3 py-2 rounded-md",
              isActive("/settings/secutiry") && "bg-secondary",
            ])}
          >
            Security
          </Link>
          <Link
            href="/settings/advanced"
            className={cn([
              "flex items-center px-3 py-2 rounded-md",
              isActive("/settings/advanced") && "bg-secondary",
            ])}
          >
            Advanced
          </Link>
        </main>
      </nav>
    </aside>
  );
}
