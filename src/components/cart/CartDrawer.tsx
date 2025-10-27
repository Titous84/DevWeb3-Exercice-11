import { useMemo } from 'react';
import { X } from 'lucide-react';
import { usePanier } from '../../context/PanierContext';
import CartItem from './CartItem';

// Panneau coulissant qui affiche le contenu du panier
export default function CartDrawer({
  ouvert,
  onFermer,
}: {
  ouvert: boolean;
  onFermer: () => void;
}) {
  const { panier, viderPanier } = usePanier();

  // Calcul du total à payer (en utilisant les quantités)
  const total = useMemo(
    () => panier.reduce((somme, biere) => somme + Number(biere.prix) * biere.quantite, 0),
    [panier],
  );

  return (
    <div
      className={`fixed inset-0 z-40 flex justify-end transition ${
        ouvert ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!ouvert}
    >
      {/* Surcouche sombre pour assombrir la page */}
      <div
        className={`absolute inset-0 bg-slate-900/60 transition-opacity duration-300 ease-out ${
          ouvert ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onFermer}
      />

      {/* Panneau qui glisse depuis la droite */}
      <aside
        className={`relative flex h-full w-full max-w-lg transform flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          ouvert ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Contenu du panier"
      >
        <header className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-500">
              Panier
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">Vos bières sélectionnées</h2>
          </div>
          <button
            onClick={onFermer}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100"
            type="button"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Message si aucune bière n'est dans le panier */}
          {panier.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
              Votre panier est vide pour le moment. Ajoutez une bière pour commencer votre dégustation !
            </p>
          )}

          {/* Liste détaillée des bières */}
          <ul className="space-y-4">
            {panier.map((biere) => (
              <li key={biere.id}>
                <CartItem biere={biere} />
              </li>
            ))}
          </ul>
        </div>

        <footer className="border-t border-slate-100 px-6 py-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Sous-total</span>
            <span className="text-base font-semibold text-slate-900">{total.toFixed(2)} $</span>
          </div>

          <button
            onClick={viderPanier}
            className="mt-4 w-full rounded-full border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            disabled={panier.length === 0}
          >
            Vider le panier
          </button>

          <button
            className="mt-3 w-full rounded-full bg-emerald-500 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={panier.length === 0}
          >
            Passer la commande
          </button>
        </footer>
      </aside>
    </div>
  );
}
