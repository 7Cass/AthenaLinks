import { $Enums } from "@prisma/client";

export const QUOTAS: Quotas = {
  free: {
    plan: "FREE",
    maxLinks: 5,
  },
  pro: {
    plan: "PRO",
    maxLinks: Infinity,
  },
};

type Plan = {
  plan: $Enums.Plan;
  maxLinks: number;
};

type Quotas = {
  [key in "free" | "pro"]: Plan;
};
