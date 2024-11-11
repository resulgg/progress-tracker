"use server";

import { auth } from "@/auth";
import db from "@/db";
import { subscriptions } from "@/db/schema";
import setUpLemonSqueezy from "@/lib/lemon-squeezy";
import { createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { eq } from "drizzle-orm";

const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;

type CheckoutResponse = {
  url?: string;
  error?: string;
};

export const checkoutUrl = async (
  productId: string
): Promise<CheckoutResponse> => {
  // Verify authentication
  const session = await auth();
  if (!session?.user?.email || !session.user.id) {
    return { error: "Unauthorized Access" };
  }

  try {
    // Initialize LemonSqueezy
    setUpLemonSqueezy();

    // Create checkout session
    const checkout = await createCheckout(STORE_ID, productId, {
      checkoutData: {
        email: session.user.email,
        custom: {
          userId: session.user.id,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      },
    });

    return { url: checkout.data?.data.attributes.url };
  } catch (error) {
    console.error("Checkout error:", error);
    return { error: "Failed to create checkout session" };
  }
};

export const customerPortalUrl = async (): Promise<CheckoutResponse> => {
  // Verify authentication
  const session = await auth();
  if (!session?.user?.email || !session.user.id) {
    return { error: "Unauthorized Access" };
  }

  try {
    // Initialize LemonSqueezy
    setUpLemonSqueezy();

    // Get active subscription for user
    const activeSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, session.user.id),
    });

    if (!activeSubscription) {
      return { error: "No active subscription found" };
    }

    // Get customer portal URL from subscription
    const { data } = await getSubscription(activeSubscription.subscriptionId);
    const portalUrl = data?.data.attributes.urls.customer_portal;

    if (!portalUrl) {
      return { error: "No customer portal URL found" };
    }

    return { url: portalUrl };
  } catch (error) {
    console.error("Customer portal error:", error);
    return { error: "Failed to get customer portal URL" };
  }
};
