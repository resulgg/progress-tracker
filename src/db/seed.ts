import { categories } from "@/db/schema";
import db from "@/db";

async function seed() {
  const categoryData = [
    {
      name: "Fitness",
      description: "Track your fitness and workout progress",
      icon: "dumbbell",
      slug: "fitness",
    },
    {
      name: "Learning",
      description: "Monitor your learning journey and skill development",
      icon: "book-open",
      slug: "learning",
    },
    {
      name: "Art",
      description: "Document your artistic progress and creative journey",
      icon: "palette",
      slug: "art",
    },
    {
      name: "Writing",
      description: "Track your writing projects and word count progress",
      icon: "pen-tool",
      slug: "writing",
    },
    {
      name: "Coding",
      description: "Monitor your programming projects and skill growth",
      icon: "code",
      slug: "coding",
    },
    {
      name: "Health",
      description: "Track health-related goals and habits",
      icon: "heart",
      slug: "health",
    },
    {
      name: "Music",
      description: "Document your musical journey and practice sessions",
      icon: "music",
      slug: "music",
    },
    {
      name: "Photography",
      description: "Track your photography skills and portfolio growth",
      icon: "camera",
      slug: "photography",
    },
    {
      name: "Language",
      description: "Track your progress in learning new languages",
      icon: "message-square",
      slug: "language",
    },
    {
      name: "Meditation",
      description: "Monitor your mindfulness and meditation practice",
      icon: "cloud",
      slug: "meditation",
    },
  ];

  try {
    console.log("🌱 Starting category seeding...");

    // Clear existing categories
    await db.delete(categories);

    // Insert new categories
    const insertedCategories = await db
      .insert(categories)
      .values(categoryData)
      .returning();

    console.log(`✓ Seeded ${insertedCategories.length} categories`);
    console.log("✨ Category seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    throw error;
  }
}
if (require.main === module) {
  seed().catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
}
export default seed;
