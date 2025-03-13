"use server";

import { auth } from "@/auth";
import {
  cancelSubscription,
  createCheckoutSession,
  getSubscriptionById,
} from "../stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSessionAction(): Promise<never> {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error("Unauthorized");
  }

  const checkoutSessionUrl = await createCheckoutSession(userSession.user.id);

  if (!checkoutSessionUrl) {
    throw new Error("Checkout session creation failed");
  }

  redirect(checkoutSessionUrl);
}

export async function cancelSubscriptionAction(): Promise<never> {
  const userSession = await auth();

  if (!userSession?.user?.id) {
    throw new Error("Unauthorized");
  }

  const url = await cancelSubscription(
    userSession.user.stripeCustomerId!,
    userSession.user.stripeSubscriptionId!,
  );

  redirect(url);
}
