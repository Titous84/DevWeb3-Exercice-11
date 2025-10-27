import { useState } from 'react';
import { ShoppingCart } from 'lucide-react'; // pour avoir l'icône de panier (merci chatGPT)
import { PanierProvider } from './context/PanierContext';
import Boutique from './pages/Boutique';
import Panier from './components/Panier';

// Composant racine : englobe toute l'application
export default function App() {
  // État local : gère l'affichage du panier (ouvert/fermé)
  const [afficherPanier, setAfficherPanier] = useState(false);

  return (
    <PanierProvider>
      <div className="min-h-screen bg-white">
        {/* Barre supérieure */}
        <header className="flex justify-between items-center px-8 py-4 shadow-md bg-gray-50">
          <h1 className="text-2xl font-bold">🍻 Boutique de Bières</h1>

          {/* Bouton pour ouvrir ou fermer le panier */}
          <button
            onClick={() => setAfficherPanier(!afficherPanier)}
            className="relative flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg"
            title="Voir le panier"
          >
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <span className="font-medium">Panier</span>
          </button>
        </header>

        {/* Contenu principal : la liste des bières */}
        <main className="p-8">
          <Boutique />
        </main>

        {/* Panneau latéral du panier (s'affiche quand on clique sur l'icône) */}
        {afficherPanier && (
          <div className="fixed right-0 top-0 h-full w-96 bg-gray-50 border-l border-gray-300 shadow-xl p-6 overflow-y-auto transition-all">
            <button
              onClick={() => setAfficherPanier(false)}
              className="text-sm text-gray-600 hover:underline mb-4"
            >
              ✖ Fermer
            </button>
            <Panier />
          </div>
        )}
      </div>
    </PanierProvider>
  );
}
