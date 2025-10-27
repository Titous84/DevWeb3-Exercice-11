import type { Bierre } from '../types/Bierre';
import { usePanier } from '../context/PanierContext';

// Composant affichant une bière sous forme de carte
export default function BierreItem({ biere }: { biere: Bierre }) {
  const { ajouterBiere } = usePanier();

  return (
    <div className="border rounded-xl shadow p-4 text-center hover:shadow-lg transition">
      {/* Image de la bière */}
      <img
        src={biere.photo}
        alt={biere.nom}
        className="w-full h-60 object-contain mb-4"
      />

      {/* Infos sur la bière */}
      <h3 className="font-semibold text-lg">{biere.nom}</h3>
      <p>{biere.producteur}</p>
      <p>
        {biere.style} - {biere['sous-style']}
      </p>
      <p className="text-orange-600 font-bold">{biere.prix}$</p>

      {/* Bouton d’ajout au panier */}
      <button
        onClick={() => ajouterBiere(biere)}
        className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
