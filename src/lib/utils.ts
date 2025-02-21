import { ShortenedLink } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date?: Date | null,
  ...opts: Intl.DateTimeFormatOptions[]
): string {
  if (!date) return "-";

  return new Intl.DateTimeFormat("pt-br", {
    ...Object.assign({}, ...opts),
  }).format(date);
}
