import { usePanier } from '../context/PanierContext';

// Composant qui affiche le contenu du panier et permet de retirer des articles
export default function Panier() {
  const { panier, retirerBiere } = usePanier();

  // Calcul du total du panier
  const total = panier.reduce((s, b) => s + Number(b.prix) * b.quantite, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🧺 Mon panier</h2>

      {/* Message si le panier est vide */}
      {panier.length === 0 && <p>Aucune bière pour le moment.</p>}

      {/* Liste des bières dans le panier */}
      {panier.map((biere) => (
        <div
          key={biere.id}
          className="flex justify-between items-center border-b py-2"
        >
          <span>
            {biere.nom} <span className="opacity-70">(x{biere.quantite})</span>
          </span>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {(Number(biere.prix) * biere.quantite).toFixed(2)}$
            </span>
            <button
              onClick={() => retirerBiere(biere.id)}
              className="text-red-600 hover:underline"
            >
              Retirer
            </button>
          </div>
        </div>
      ))}

      {/* Affichage du total */}
      {panier.length > 0 && (
        <div className="mt-4 text-right font-semibold">
          Total : {total.toFixed(2)}$
        </div>
      )}
    </div>
  );
}
