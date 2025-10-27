import axios from 'axios';
import type { Bierre } from '../types/Bierre';

// Fonction qui va chercher les bières à partir de l'API fournie
// On utilise axios pour faire la requête HTTP
export async function fetchBieres(signal?: AbortSignal): Promise<Bierre[]> {
  try {
    const response = await axios.get('https://bieres.profinfo.ca/api/bieres', {
      signal,
    });
    // L'API renvoie un objet { bieres: [...] }
    return response.data.bieres;
  } catch (erreur) {
    if (axios.isCancel(erreur)) {
      // Si la requête est annulée on retourne simplement la valeur actuelle
      return [];
    }
    console.error('Erreur lors du chargement des bières :', erreur);
    throw erreur;
  }
}
