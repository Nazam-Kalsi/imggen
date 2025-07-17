import { prismaClient } from "db";
type SeedModel = "pack" | "user" | "packPrompts";
import ora from "ora";

const data = {
  packs: [
    { packName: "food", id: "food" },
    { packName: "cat", id: "cat" },
    { packName: "twin tower", id: "twin tower" },
  ],
  packPrompts: [
    // 🌮 Food Prompts
    { prompt: "A delicious bowl of ramen with steam rising", packId: "food" },
    { prompt: "A perfectly grilled steak on a wooden board", packId: "food" },
    { prompt: "Colorful assortment of macarons in a Parisian bakery", packId: "food" },
    { prompt: "Close-up shot of a juicy cheeseburger with fries", packId: "food" },
    { prompt: "Traditional Indian thali with curry, rice, and naan", packId: "food" },

    // 🐱 Cat Prompts
    { prompt: "A fluffy white cat lounging on a window sill", packId: "cat" },
    { prompt: "A playful kitten chasing a red yarn ball", packId: "cat" },
    { prompt: "A grumpy tabby cat wearing a tiny crown", packId: "cat" },
    { prompt: "A black cat walking on a cobblestone street at night", packId: "cat" },
    { prompt: "Two cats in a cozy blanket fort", packId: "cat" },

    // 🏙️ Twin Tower Prompts
    { prompt: "Aerial view of the Twin Towers at sunset", packId: "twin tower" },
    { prompt: "New York skyline featuring the Twin Towers in the 1990s", packId: "twin tower" },
    { prompt: "Reflection of the Twin Towers in the Hudson River", packId: "twin tower" },
    { prompt: "Artistic sketch of the Twin Towers from ground level", packId: "twin tower" },
    { prompt: "Historical photo of the Twin Towers under construction", packId: "twin tower" },
  ],
};

const seeding = async (model: SeedModel, data: any) => {
  const deletingdata = await (prismaClient as any)[model].deleteMany();
  const seedingdata = await (prismaClient as any)[model].createMany({
    data: data,
  });
  if (!seedingdata) {
    console.log("🤦‍♂️ Error while seeding database.");
    return;
  }
  console.log("👍 Seeded created successfully.");
  return;
};

const runSeeding = async () => {
    const packSpinner = ora("🌱 Seeding packs...").start();
  try {
    await seeding("pack", data.packs);
    packSpinner.succeed("✅ Packs seeded successfully!");
  } catch (err) {
    packSpinner.fail("❌ Failed to seed packs.");
    console.error(err);
  }

  const promptSpinner = ora("🌱 Seeding pack prompts...").start();
  try {
    await seeding("packPrompts", data.packPrompts);
    promptSpinner.succeed("✅ Pack prompts seeded successfully!");
  } catch (err) {
    promptSpinner.fail("❌ Failed to seed pack prompts.");
    console.error(err);
  }
};

runSeeding().then(() => {
  console.log("🌱 All seeding complete!");
});
