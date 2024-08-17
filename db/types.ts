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

export interface Attribute extends DefaultAttribute {}
export interface Card extends DefaultCard {
  Types?: DefaultType[];
  Rarity?: DefaultRarity;
  Faction?: DefaultFaction;
  Attributes?: DefaultCardAttributes[];
  Set?: DefaultSet;
}
export interface Faction extends DefaultFaction {}
export interface Game extends DefaultGame {}
export interface Rarity extends DefaultRarity {}
export interface Set extends DefaultSet {
  _count?: any;
}
export interface Type extends DefaultType {}

// ------------------------------------

export type AttributeNew = Omit<DefaultAttribute, "id">;
export type CardNew = Omit<DefaultCard, "id" | "factionId" | "rarityId">;
export type FactionNew = Omit<DefaultFaction, "id">;
export type GameNew = Omit<DefaultGame, "id">;
export type RarityNew = Omit<DefaultRarity, "id">;
export type SetNew = Omit<DefaultSet, "id" | "isHidden">;
export type TypeNew = Omit<DefaultType, "id">;
