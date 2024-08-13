import type { Card as DefaultCard } from "@prisma/client";
import type { Game as DefaultGame } from "@prisma/client";
import type { Set as DefaultSet } from "@prisma/client";

export interface Set extends DefaultSet {};
export interface Game extends DefaultGame {};
export interface Card extends DefaultCard {};

export type SetNew = Omit<DefaultSet, 'id'>;
export type GameNew = Omit<DefaultGame, 'id'>;
export type CardNew = Omit<DefaultCard, 'id'>;