import { LITIGES_MOCK } from "../data/Litiges.mock";

// Simule une latence réseau réaliste
const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

// Base in-memory "database" — remplacez ces fonctions par de vrais appels fetch() vers votre API
let db = [...LITIGES_MOCK];

/**
 * GET /litiges
 */
export async function fetchLitiges() {
  await delay();
  return [...db];
}

/**
 * PATCH /litiges/:id/resolve
 */
export async function resolveLitige({ id, resolution }) {
  await delay();
  db = db.map((l) =>
    l.id === id ? { ...l, status: "Résolu", resolution } : l
  );
  return db.find((l) => l.id === id);
}

/**
 * PATCH /litiges/:id/refund
 */
export async function refundLitige({ id, montant }) {
  await delay();
  const resolution = `Remboursement de ${montant} MAD effectué.`;
  db = db.map((l) =>
    l.id === id ? { ...l, status: "Résolu", resolution } : l
  );
  return db.find((l) => l.id === id);
}

/**
 * PATCH /litiges/:id/close
 */
export async function closeLitige({ id }) {
  await delay();
  db = db.map((l) =>
    l.id === id ? { ...l, status: "Fermé" } : l
  );
  return db.find((l) => l.id === id);
}