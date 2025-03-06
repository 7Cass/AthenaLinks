import { redirect } from "next/navigation";
import Stripe from "stripe";
import { prisma } from "./prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

export async function getStripeCustomerByEmail(
  email: string,
): Promise<Stripe.Customer | null> {
  try {
    const customers = await stripe.customers.list({ email });
    return customers.data[0] || null;
  } catch (error) {
    console.error("Error fetching Stripe customer:", error);
    return null;
  }
}

export async function createStripeCustomer(
  name: string,
  email: string,
): Promise<Stripe.Customer | null> {
  try {
    const customerExists = await getStripeCustomerByEmail(email);
    if (customerExists) return customerExists;

    const customer = await stripe.customers.create({
      email,
      name,
    });

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    return customer;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

export async function createBillingPortal(userId: string): Promise<string> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    if (!user.name) throw new Error("User name is required");

    // Criar ou buscar o customer no Stripe
    const customer = user.stripeCustomerId
      ? await stripe.customers.retrieve(user.stripeCustomerId)
      : await createStripeCustomer(user.name, user.email);

    console.log("CUSTOMER", customer);

    if (!customer) throw new Error("Customer not found");

    const portal = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
    });

    if (!portal.url) throw new Error("Portal URL not found");

    redirect(portal.url);
  } catch (error) {
    console.error("Error creating Stripe billing portal:", error);
    throw error;
  }
}

export async function createCheckoutSession(userId: string): Promise<string> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");

    if (!user.name) throw new Error("User name is required");

    // Criar o customer no Stripe ou reutilizar se já existe.
    const customerId = user.stripeCustomerId
      ? user.stripeCustomerId
      : (await createStripeCustomer(user.name, user.email))?.id;

    if (!customerId) throw new Error("Customer not found");

    console.log(customerId);

    const proPlanPrice = await stripe.prices.retrieve(
      "price_1Qz7DnHOkko9sJVfagdWXp6X",
    );

    if (!proPlanPrice) throw new Error("Price not found");

    // Criar a sessão de pagamento
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: proPlanPrice.id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/settings/billing`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/settings/billing`,
    });

    if (!session.url) throw new Error("Session URL not found");

    console.log("SESSION", session);

    return session.url;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
}
