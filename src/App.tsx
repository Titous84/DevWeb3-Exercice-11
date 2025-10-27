import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react'; // pour avoir l'icône de panier (merci chatGPT)
import { PanierProvider, usePanier } from './context/PanierContext';
import Boutique from './pages/Boutique';
import Panier from './components/Panier';

function AppContent() {
  const [afficherPanier, setAfficherPanier] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { panier, dernierAjout, effacerDernierAjout } = usePanier();

  const totalArticles = panier.reduce((total, article) => total + article.quantite, 0);

  useEffect(() => {
    if (!dernierAjout) return;

    setNotificationVisible(true);
    const timer = window.setTimeout(() => {
      setNotificationVisible(false);
      effacerDernierAjout();
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [dernierAjout, effacerDernierAjout]);

  return (
    <div className="min-h-screen bg-white">
      {/* Notification lorsqu'un nouvel article est ajouté */}
      {notificationVisible && dernierAjout && (
        <div className="fixed top-20 right-8 z-50 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {dernierAjout} a été ajouté au panier !
        </div>
      )}

      {/* Barre supérieure */}
      <header className="flex items-center justify-between bg-gray-50 px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold">🍻 Boutique de Bières</h1>

        {/* Bouton pour ouvrir ou fermer le panier */}
        <button
          onClick={() => setAfficherPanier(!afficherPanier)}
          className="relative flex items-center gap-2 rounded-lg p-2 hover:bg-gray-200"
          title="Voir le panier"
        >
          <ShoppingCart className="h-6 w-6 text-gray-800" />
          <span className="font-medium">Panier</span>
          {totalArticles > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              {totalArticles}
            </span>
          )}
        </button>
      </header>

      {/* Contenu principal : la liste des bières */}
      <main className="p-8">
        <Boutique />
      </main>

      {/* Panneau latéral du panier (s'affiche quand on clique sur l'icône) */}
      {afficherPanier && (
        <div className="fixed right-0 top-0 h-full w-96 overflow-y-auto border-l border-gray-300 bg-gray-50 p-6 shadow-xl transition-all">
          <button
            onClick={() => setAfficherPanier(false)}
            className="mb-4 text-sm text-gray-600 hover:underline"
          >
            ✖ Fermer
          </button>
          <Panier />
        </div>
      )}
    </div>
  );
}

// Composant racine : englobe toute l'application
export default function App() {
  return (
    <PanierProvider>
      <AppContent />
    </PanierProvider>
  );
}
