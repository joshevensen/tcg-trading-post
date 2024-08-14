import type {
  Attribute as DefaultAttribute,
  Card as DefaultCard,
  CardAttributes as DefaultCardAttributes,
  Game as DefaultGame,
  Faction as DefaultFaction,
  Rarity as DefaultRarity,
  Set as DefaultSet,
  Type as DefaultType,
} from "@prisma/client";

export interface Set extends DefaultSet {}
export interface Game extends DefaultGame {}
export interface Card extends DefaultCard {
  Types?: DefaultType[];
  Rarity?: DefaultRarity;
  Faction?: DefaultFaction;
  Attributes?: DefaultCardAttributes[];
  Set?: DefaultSet;
}

export type SetNew = Omit<DefaultSet, "id">;
export type GameNew = Omit<DefaultGame, "id">;
export type CardNew = Omit<DefaultCard, "id">;
