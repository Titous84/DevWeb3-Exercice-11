// Type représentant une bière provenant de l'API.
export type Bierre = {
  id: number;
  nom: string;
  producteur: string;
  style: string;
  'sous-style': string;
  volume: string;
  alcool: string;
  photo: string;
  prix: string;
};
