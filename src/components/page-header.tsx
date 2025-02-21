"use client";

import { usePathname } from "next/navigation";

export function PageHeader() {
  const pathname = usePathname();

  return (
    <h1 className="text-sm font-semibold capitalize">
      {pathname.split("/").pop()}
    </h1>
  );
}
