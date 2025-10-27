import { Minus, Plus, Trash2 } from 'lucide-react';
import type { ArticlePanier } from '../../types/Panier';
import { usePanier } from '../../context/PanierContext';

// Représente une ligne d'article dans le panier
export default function CartItem({ biere }: { biere: ArticlePanier }) {
  const { ajouterBiere, retirerBiere, retirerArticle } = usePanier();

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <img
        src={biere.photo}
        alt={biere.nom}
        className="h-20 w-20 flex-none rounded-lg object-cover"
      />

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{biere.nom}</h3>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
              {biere.style} • {biere['sous-style']}
            </p>
          </div>

          <button
            onClick={() => retirerArticle(biere.id)}
            className="text-slate-400 transition hover:text-red-500"
            type="button"
            aria-label="Retirer du panier"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-1">
            {/* Bouton pour diminuer la quantité */}
            <button
              onClick={() => retirerBiere(biere.id)}
              className="text-slate-500 transition hover:text-slate-900"
              type="button"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="w-6 text-center text-sm font-semibold text-slate-900">
              x{biere.quantite}
            </span>

            {/* Bouton pour augmenter la quantité */}
            <button
              onClick={() => ajouterBiere(biere)}
              className="text-slate-500 transition hover:text-slate-900"
              type="button"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <p className="text-sm font-semibold text-slate-900">
            {(Number(biere.prix) * biere.quantite).toFixed(2)} $
          </p>
        </div>
      </div>
    </div>
  );
}
