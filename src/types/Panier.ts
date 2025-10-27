import type { Bierre } from './Bierre';

// Un article de panier = une bière + une quantité.
export type ArticlePanier = Bierre & { quantite: number };
