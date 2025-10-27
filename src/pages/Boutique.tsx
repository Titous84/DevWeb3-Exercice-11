import { useEffect, useMemo, useState } from 'react';
import type { Bierre } from '../types/Bierre';
import { fetchBieres } from '../api/fetch_bieres';
import BeerCard from '../components/beer/BeerCard';

// Page principale de la boutique : gère le chargement et les filtres
export default function Boutique() {
  const [bieres, setBieres] = useState<Bierre[]>([]);
  const [recherche, setRecherche] = useState('');
  const [styleActif, setStyleActif] = useState('');
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  // Récupération des bières via l'API à l'initialisation
  useEffect(() => {
    const controller = new AbortController();
    let actif = true;

    setChargement(true);
    setErreur(null);

    fetchBieres(controller.signal)
      .then((liste) => {
        if (actif) {
          setBieres(liste);
        }
      })
      .catch(() => {
        if (actif) {
          setErreur("Impossible de charger les bières. Réessayez plus tard.");
        }
      })
      .finally(() => {
        if (actif) {
          setChargement(false);
        }
      });

    return () => {
      actif = false;
      controller.abort();
    };
  }, []);

  // Extraction de la liste de styles disponibles pour les filtres
  const stylesDisponibles = useMemo(() => {
    const set = new Set<string>();
    bieres.forEach((biere) => set.add(biere.style));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [bieres]);

  // Filtrage des bières en fonction de la recherche et du style sélectionné
  const bieresFiltrees = useMemo(() => {
    const terme = recherche.trim().toLowerCase();
    return bieres
      .filter((biere) =>
        styleActif ? biere.style === styleActif : true,
      )
      .filter((biere) =>
        terme
          ? [
              biere.nom,
              biere.producteur,
              biere.style,
              biere['sous-style'],
            ]
              .join(' ')
              .toLowerCase()
              .includes(terme)
          : true,
      );
  }, [bieres, recherche, styleActif]);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-slate-900 p-10 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Sélection canadienne</p>
            <h1 className="text-4xl font-semibold leading-tight">
              Découvrez des bières artisanales livrées directement chez vous
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-50">
              Parcourez notre catalogue, ajoutez vos coups de cœur au panier et savourez des produits brassés avec passion.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="relative flex items-center">
            <input
              value={recherche}
              onChange={(event) => setRecherche(event.target.value)}
              placeholder="Rechercher par nom, producteur ou style"
              className="h-12 w-full rounded-full border border-white/40 bg-white/20 px-5 text-sm font-medium text-white placeholder:text-emerald-100 focus:border-white focus:bg-white/30 focus:outline-none"
              type="search"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStyleActif('')}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                styleActif === ''
                  ? 'bg-white text-emerald-600 shadow'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              type="button"
            >
              Tous les styles
            </button>
            {stylesDisponibles.map((style) => (
              <button
                key={style}
                onClick={() => setStyleActif(style)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                  styleActif === style
                    ? 'bg-white text-emerald-600 shadow'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                type="button"
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Gestion du chargement et des erreurs */}
      {chargement && (
        <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/60 p-10 text-center text-emerald-600">
          Chargement des bières en cours...
        </div>
      )}

      {erreur && (
        <div className="rounded-3xl border border-red-200 bg-red-50/80 p-6 text-center text-sm text-red-600">
          {erreur}
        </div>
      )}

      {!chargement && !erreur && (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {bieresFiltrees.map((biere) => (
            <BeerCard key={biere.id} biere={biere} />
          ))}
        </div>
      )}

      {!chargement && !erreur && bieresFiltrees.length === 0 && (
        <p className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600">
          Aucun résultat ne correspond à votre recherche pour le moment.
        </p>
      )}
    </section>
  );
}
