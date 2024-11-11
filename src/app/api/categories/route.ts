import db from "@/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * GET /api/categories
 * Retrieves all categories sorted alphabetically by name
 * @requires Authentication
 */
export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch categories from database sorted by name
    const categories = await db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });

    // Return successful response with categories
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    // Log error and return 500 response
    console.error("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
