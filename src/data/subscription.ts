import "server-only";

import db from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { LemonSqueezyPayload } from "@/schemas/ls-payload";

/**
 * Retrieves subscription information for a specific user
 * @param userId - The ID of the user to fetch subscription for
 * @returns Promise containing subscription details
 */
export const getSubscription = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.createdAt)],
    });

    return subscription;
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    throw new Error("Failed to fetch subscription");
  }
};

/**
 * Handles creation of new subscription records from LemonSqueezy webhook
 * @param payload - The webhook payload from LemonSqueezy
 * @param userId - The ID of the user to associate with subscription
 */
export const handleSubscriptionCreated = async (
  payload: LemonSqueezyPayload,
  userId: string
) => {
  try {
    await db.insert(subscriptions).values({
      status: payload.data.attributes.status,
      userId,
      statusFormatted: payload.data.attributes.status_formatted,
      customerId: `${payload.data.attributes.customer_id}`,
      subscriptionId: payload.data.id,
      endsAt: payload.data.attributes.ends_at,
      renewsAt: payload.data.attributes.renews_at,
      createdAt: payload.data.attributes.created_at,
      updatedAt: payload.data.attributes.updated_at,
    });
  } catch (error) {
    console.error("Failed to create subscription:", error);
    throw new Error("Failed to create subscription");
  }
};

/**
 * Handles subscription status and date updates from LemonSqueezy webhook
 * @param payload - The webhook payload from LemonSqueezy containing updated subscription details
 */
export const handleSubscriptionUpdated = async (
  payload: LemonSqueezyPayload
) => {
  try {
    await db
      .update(subscriptions)
      .set({
        status: payload.data.attributes.status,
        statusFormatted: payload.data.attributes.status_formatted,
        endsAt: payload.data.attributes.ends_at,
        renewsAt: payload.data.attributes.renews_at,
        createdAt: payload.data.attributes.created_at,
        updatedAt: payload.data.attributes.updated_at,
      })
      .where(eq(subscriptions.subscriptionId, payload.data.id));
  } catch (error) {
    console.error("Failed to update subscription:", error);
    throw new Error("Failed to update subscription");
  }
};
