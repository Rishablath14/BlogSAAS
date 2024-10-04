import prisma from "@/utils/db";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      const customerId = session.customer as string;

      const user = await prisma.user.findUnique({
        where: { customerId },
      });

      if (!user) throw new Error("User not found...");

      await prisma.subscription.create({
        data: {
          stripeSubscriptionId: subscription.id,
          userId: user.id,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
          status: subscription.status,
          planId: subscription.items.data[0].price.id,
          interval: String(subscription.items.data[0].plan.interval),
        },
      });
      break;

    case "invoice.payment_succeeded":
      const succeededSubscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: succeededSubscription.id,
        },
        data: {
          currentPeriodStart: succeededSubscription.current_period_start,
          currentPeriodEnd: succeededSubscription.current_period_end,
          status: succeededSubscription.status,
        },
      });
      break;

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription;

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: deletedSubscription.id,
        },
        data: {
          status: "canceled",
        },
      });
      break;

    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription;

      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: updatedSubscription.id,
        },
        data: {
          status: updatedSubscription.status,
          currentPeriodStart: updatedSubscription.current_period_start,
          currentPeriodEnd: updatedSubscription.current_period_end,
          planId: updatedSubscription.items.data[0].price.id,
        },
      });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}