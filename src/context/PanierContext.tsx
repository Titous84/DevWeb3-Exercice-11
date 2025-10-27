import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Bierre } from '../types/Bierre';
import type { ArticlePanier } from '../types/Panier';

// Définition de la forme du contexte : ce qu'on va partager
type PanierContextType = {
  panier: ArticlePanier[];
  ajouterBiere: (biere: Bierre) => void;
  retirerBiere: (id: number) => void;
  retirerArticle: (id: number) => void;
  viderPanier: () => void;
  dernierAjout: string | null;
  effacerDernierAjout: () => void;
};

// Création du contexte global
const PanierContext = createContext<PanierContextType | undefined>(undefined);

// Fournisseur : il englobe les composants qui ont besoin du panier
export const PanierProvider = ({ children }: { children: ReactNode }) => {
  // État local du panier (tableau de bières)
  const [panier, setPanier] = useState<ArticlePanier[]>([]);
  const [dernierAjout, setDernierAjout] = useState<string | null>(null);

  // Ajoute une bière au panier (ou augmente sa quantité si déjà présente)
  const ajouterBiere = useCallback((biere: Bierre) => {
    setPanier((prev) => {
      const existante = prev.find((b) => b.id === biere.id);
      if (existante) {
        // Si la bière est déjà dans le panier, on incrémente la quantité
        return prev.map((b) =>
          b.id === biere.id ? { ...b, quantite: b.quantite + 1 } : b,
        );
      }
      // Sinon on l'ajoute avec une quantité initiale de 1
      return [...prev, { ...biere, quantite: 1 }];
    });
    setDernierAjout(biere.nom);
  }, []);

  // Retire une bière du panier (décrémente ou supprime)
  const retirerBiere = useCallback((id: number) => {
    setPanier((prev) => {
      const existante = prev.find((b) => b.id === id);
      if (!existante) return prev;
      if (existante.quantite > 1) {
        // Si plus d'une unité, on diminue simplement la quantité
        return prev.map((b) =>
          b.id === id ? { ...b, quantite: b.quantite - 1 } : b,
        );
      }
      // Si une seule unité, on retire la bière complètement
      return prev.filter((b) => b.id !== id);
    });
  }, []);

  // Retire complètement la bière du panier sans toucher aux autres
  const retirerArticle = useCallback((id: number) => {
    setPanier((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // Vide entièrement le panier
  const viderPanier = useCallback(() => setPanier([]), []);

  const effacerDernierAjout = useCallback(() => setDernierAjout(null), []);

  const valeur = useMemo(
    () => ({
      panier,
      ajouterBiere,
      retirerBiere,
      retirerArticle,
      viderPanier,
      dernierAjout,
      effacerDernierAjout,
    }),
    [
      panier,
      ajouterBiere,
      retirerBiere,
      retirerArticle,
      viderPanier,
      dernierAjout,
      effacerDernierAjout,
    ],
  );

  // On rend le contexte accessible aux enfants via le Provider
  return <PanierContext.Provider value={valeur}>{children}</PanierContext.Provider>;
};

// Hook personnalisé pour accéder facilement au contexte depuis d'autres fichiers
export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context)
    throw new Error(
      'usePanier doit être utilisé à l’intérieur de PanierProvider',
    );
  return context;
};
