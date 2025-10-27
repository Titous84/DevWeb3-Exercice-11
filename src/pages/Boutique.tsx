import { useEffect, useState } from 'react';
import type { Bierre } from '../types/Bierre';
import { fetchBieres } from '../api/fetch_bieres';
import BierreItem from '../components/BierreItem';

// Page principale de la boutique : affiche toutes les bières récupérées via l'API
export default function Boutique() {
  const [bieres, setBieres] = useState<Bierre[]>([]);

  // Appel à l’API dès que le composant est monté
  useEffect(() => {
    fetchBieres().then((liste) => setBieres(liste));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {bieres.map((biere) => (
        <BierreItem key={biere.id} biere={biere} />
      ))}
    </div>
  );
}
