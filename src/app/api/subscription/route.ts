import { NextResponse } from "next/server";
import db from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized",
          message: "You must be logged in to check subscription status",
        }),
        { status: 401 }
      );
    }

    // Query the subscription directly from the database
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, session.user.id),
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.createdAt)],
    });

    // Check if user has an active subscription
    const isPro =
      subscription?.status === "active" || subscription?.status === "trialing";

    return NextResponse.json({ isPro });
  } catch (error) {
    console.error("[SUBSCRIPTION_GET]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        message: "Failed to check subscription status",
      }),
      { status: 500 }
    );
  }
}
