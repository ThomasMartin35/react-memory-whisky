import type { card } from "./types/card";

export function shuffleArray(array: card[]) {
  const shuffled = [...array]; // Créer une copie pour ne pas modifier l'original
  //
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Échange des éléments
  }

  return shuffled;
}
