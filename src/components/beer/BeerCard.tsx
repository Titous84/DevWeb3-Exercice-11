import { ShoppingCart } from 'lucide-react';
import type { Bierre } from '../../types/Bierre';
import { usePanier } from '../../context/PanierContext';

// Carte visuelle pour afficher une bière de la boutique
export default function BeerCard({ biere }: { biere: Bierre }) {
  const { ajouterBiere } = usePanier();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex-1 overflow-hidden bg-slate-50">
        <img
          src={biere.photo}
          alt={biere.nom}
          loading="lazy"
          className="h-64 w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">
            {biere.producteur}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{biere.nom}</h3>
          <p className="text-sm text-slate-500">
            {biere.style} • {biere['sous-style']} • {biere.alcool} • {biere.volume}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-900">{Number(biere.prix).toFixed(2)} $</span>
          <button
            onClick={() => ajouterBiere(biere)}
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-600"
            type="button"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </article>
  );
}
