import { AttributeTypes } from "@prisma/client";

export default async function lorcanaSeeds(prisma) {
  await prisma.game.upsert({
    where: { name: "Lorcana" },
    update: {},
    create: {
      name: "Lorcana",
      factionLabel: "Ink",
      specialLabel: "Foil",
      playSetCount: 4,
      Types: {
        create: [
          { name: "Character" },
          { name: "Action" },
          { name: "Song" },
          { name: "Item" },
          { name: "Location" },
        ],
      },
      Factions: {
        create: [
          { name: "Amber", color: "yellow" },
          { name: "Amethyst", color: "purple" },
          { name: "Emerald", color: "green" },
          { name: "Ruby", color: "red" },
          { name: "Sapphire", color: "sapphire" },
          { name: "Steel", color: "steel" },
        ],
      },
      Rarities: {
        create: [
          { name: "Common" },
          { name: "Uncommon" },
          { name: "Rare" },
          { name: "Super Rare" },
          { name: "Legendary" },
          { name: "Enchanted" },
          { name: "Promo" },
        ],
      },
      Attributes: {
        create: [
          { name: "cost", type: AttributeTypes.Number, required: true },
          {
            name: "inkable",
            type: AttributeTypes.Boolean,
            required: true,
          },
          { name: "version", type: AttributeTypes.String },
          { name: "classifications", type: AttributeTypes.List },
          {
            name: "willpower",
            type: AttributeTypes.Number,
          },
          { name: "strength", type: AttributeTypes.Number },
          { name: "lore", type: AttributeTypes.Number },
          { name: "move cost", type: AttributeTypes.Number },
        ],
      },
    },
  });
}
