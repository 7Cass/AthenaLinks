import Stripe from "stripe";
import { stripe } from "@/app/stripe";
import { headers } from "next/headers";
import { prisma } from "@/app/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );

    switch (event.type) {
      case "checkout.session.completed":
        console.log("EVENT: ", event.type);
        // Vincular subscriptionId ao usuário no banco
        const customerId = event.data.object.customer as string;
        const subscriptionId = event.data.object.subscription as string;

        if (!customerId) {
          throw new Error("Customer ID not found");
        }

        await prisma.user.update({
          where: {
            stripeCustomerId: customerId,
          },
          data: {
            stripeSubscriptionId: subscriptionId,
          },
        });

        break;
      case "invoice.paid":
        console.log("EVENT: ", event.type);
        // Atualizar plano
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.subscription as string,
        );

        await prisma.user.update({
          where: {
            stripeCustomerId: invoice.customer as string,
          },
          data: {
            plan: "PRO",
            subscription_status: "ACTIVE",
            current_period_end: new Date(
              subscription.current_period_end * 1000,
            ),
          },
        });

        // Enviar email de boas-vindas
        // Usar fila ou serviço externo para não bloquear a fila
        break;
      case "invoice.payment_failed":
        console.log("EVENT: ", event.type);
        // Enviar alerta e atualizar status para past_due
        await prisma.user.update({
          where: {
            stripeCustomerId: event.data.object.customer as string,
          },
          data: {
            subscription_status: "PAST_DUE",
          },
        });
        break;
      case "customer.subscription.updated":
        console.log("EVENT: ", event.type);
        console.log(event.data);
        // Atualiza a subscription do usuario
        if (event.data.object.cancel_at_period_end) {
          await prisma.user.update({
            where: { stripeCustomerId: event.data.object.customer as string },
            data: {
              subscription_status: "ACTIVE",
              current_period_end: new Date(event.data.object.cancel_at! * 1000),
              stripeSubscriptionId: null,
            },
          });
        }
        break;
      case "customer.subscription.deleted":
        console.log("EVENT: ", event.type);
        await prisma.user.update({
          where: {
            stripeCustomerId: event.data.object.customer as string,
          },
          data: {
            plan: "FREE",
            subscription_status: "CANCELED",
            stripeSubscriptionId: null,
            current_period_end: null,
          },
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (error) {
    console.error(error);
    return new Response(`Webhook Error: ${error}`, { status: 500 });
  }

  return new Response("Webhook received", { status: 200 });
}
