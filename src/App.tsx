import { useEffect, useMemo, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { PanierProvider, usePanier } from './context/PanierContext';
import Boutique from './pages/Boutique';
import CartDrawer from './components/cart/CartDrawer';

function AppShell() {
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { panier, dernierAjout, effacerDernierAjout } = usePanier();

  // Calcul du nombre total d'articles dans le panier
  const totalArticles = useMemo(
    () => panier.reduce((total, article) => total + article.quantite, 0),
    [panier],
  );

  // Affiche une notification lorsque la dernière bière ajoutée change
  useEffect(() => {
    if (!dernierAjout) return;

    setNotificationVisible(true);
    const timer = window.setTimeout(() => {
      setNotificationVisible(false);
      effacerDernierAjout();
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [dernierAjout, effacerDernierAjout]);

  // Ferme le panier avec la touche Echap
  useEffect(() => {
    if (!panierOuvert) return;

    const gererClavier = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanierOuvert(false);
      }
    };

    window.addEventListener('keydown', gererClavier);
    return () => window.removeEventListener('keydown', gererClavier);
  }, [panierOuvert]);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_55%)]" />

      {/* Notification d'ajout au panier */}
      {notificationVisible && dernierAjout && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs uppercase tracking-[0.24em]">
            +1
          </span>
          {dernierAjout} a été ajouté au panier
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 pb-16 pt-10 md:px-12">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-200">DevWeb3</span>
            <h1 className="text-2xl font-semibold text-white">La Route des Bières</h1>
          </div>

          {/* Bouton d'ouverture du panier */}
          <button
            onClick={() => setPanierOuvert(true)}
            className="relative flex items-center gap-3 rounded-full bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            type="button"
          >
            <ShoppingCart className="h-4 w-4" />
            Panier
            {totalArticles > 0 && (
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-lg">
                {totalArticles}
              </span>
            )}
          </button>
        </header>

        <main className="flex-1 pb-12">
          <Boutique />
        </main>
      </div>

      <CartDrawer ouvert={panierOuvert} onFermer={() => setPanierOuvert(false)} />
    </div>
  );
}

// Composant racine qui encapsule l'application avec le contexte du panier
export default function App() {
  return (
    <PanierProvider>
      <AppShell />
    </PanierProvider>
  );
}
