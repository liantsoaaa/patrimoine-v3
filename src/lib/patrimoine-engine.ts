import { DEVISES, type DeviseCode, type Possession, type EvolutionPoint, type FluxJournalier, type PatrimoineData, TypeAgregat } from '../types/patrimoine';

const MS_PER_DAY = 86400000;

function parseDate(s: string): Date {
  return new Date(s);
}

function daysBetween(d1: Date, d2: Date): number {
  return Math.round((d2.getTime() - d1.getTime()) / MS_PER_DAY);
}

export function convertToAriary(montant: number, devise: DeviseCode, date: Date): number {
  if (devise === 'MGA') return montant;
  const d = DEVISES[devise];
  const refDate = new Date('2024-07-03');
  const days = daysBetween(refDate, date);
  const appreciationFactor = 1 + (d.tauxDAppreciationAnnuel * days / 365);
  return montant * d.valeurEnAriary * appreciationFactor;
}

export function projectMateriel(p: Possession, targetDate: Date): number {
  if (!p.dateAcquisition || p.tauxAppreciationAnnuel === undefined) return p.valeurComptable;
  const acqDate = parseDate(p.dateAcquisition);
  const baseDate = targetDate < acqDate ? acqDate : targetDate;
  const days = daysBetween(acqDate, baseDate);
  const future = p.valeurComptable * (1 + (p.tauxAppreciationAnnuel * days / 365));
  return Math.max(0, future);
}

export function projectCompte(p: Possession, targetDate: Date): number {
  if (!p.children || p.children.length === 0) return p.valeurComptable;
  let value = p.valeurComptable;
  for (const flux of p.children) {
    if (!flux.debut || flux.fluxMensuel === undefined) continue;
    const debut = parseDate(flux.debut);
    const fin = flux.fin ? parseDate(flux.fin) : new Date('2999-12-31');
    const effectiveEnd = targetDate < fin ? targetDate : fin;
    if (effectiveEnd < debut) continue;
    const monthsActive = Math.floor(daysBetween(debut, effectiveEnd) / 30.44);
    value += flux.fluxMensuel * monthsActive;
  }
  return value;
}

export function projectPossession(p: Possession, targetDate: Date): number {
  switch (p.type) {
    case 'Materiel':
    case 'AchatMaterielAuComptant':
      return projectMateriel(p, targetDate);
    case 'Compte':
    case 'Dette':
    case 'Creance':
      return projectCompte(p, targetDate);
    default:
      return p.valeurComptable;
  }
}

export function getAgregatValues(
  possessions: Possession[],
  targetDate: Date
): { tresorerie: number; immobilisations: number; obligations: number } {
  let tresorerie = 0, immobilisations = 0, obligations = 0;
  for (const p of possessions) {
    const val = convertToAriary(projectPossession(p, targetDate), p.devise, targetDate);
    if (p.agregat === TypeAgregat.TRESORERIE) tresorerie += val;
    else if (p.agregat === TypeAgregat.IMMOBILISATION) immobilisations += val;
    else if (p.agregat === TypeAgregat.OBLIGATION) obligations += val;
  }
  return { tresorerie, immobilisations, obligations };
}

export function generateEvolution(
  patrimoine: PatrimoineData,
  startDate: Date,
  endDate: Date,
  steps: number = 60
): EvolutionPoint[] {
  const points: EvolutionPoint[] = [];
  const totalDays = daysBetween(startDate, endDate);
  const stepDays = totalDays / steps;
  for (let i = 0; i <= steps; i++) {
    const date = new Date(startDate.getTime() + i * stepDays * MS_PER_DAY);
    const { tresorerie, immobilisations, obligations } = getAgregatValues(patrimoine.possessions, date);
    points.push({
      date: date.toISOString().split('T')[0],
      patrimoine: tresorerie + immobilisations + obligations,
      tresorerie, immobilisations, obligations,
    });
  }
  return points;
}

export function generateFluxJournaliers(
  patrimoine: PatrimoineData,
  startDate: Date,
  endDate: Date
): FluxJournalier[] {
  const fluxList: FluxJournalier[] = [];
  for (const p of patrimoine.possessions) {
    if (!p.children) continue;
    for (const flux of p.children) {
      if (!flux.debut || flux.fluxMensuel === undefined) continue;
      const debut = parseDate(flux.debut);
      const fin = flux.fin ? parseDate(flux.fin) : endDate;
      let current = new Date(debut);
      while (current <= fin && current <= endDate) {
        if (current >= startDate) {
          fluxList.push({
            date: current.toISOString().split('T')[0],
            compte: p.nom,
            flux: [{ nom: flux.nom, montant: flux.fluxMensuel }],
            montantTotal: flux.fluxMensuel,
            possible: true,
          });
        }
        current = new Date(current.getTime() + 30 * MS_PER_DAY);
      }
    }
  }
  return fluxList.sort((a, b) => a.date.localeCompare(b.date));
}

export const patrimoineData: PatrimoineData = {
  nom: 'Patrimoine de Zety',
  possesseur: 'Zety',
  devise: 'MGA',
  date: '2024-07-08',
  possessions: [
    {
      nom: 'Compte courant BP',
      type: 'Compte',
      agregat: TypeAgregat.TRESORERIE,
      valeurComptable: 10_000_000,
      devise: 'MGA',
      children: [
        { nom: 'Salaire', type: 'FluxArgent', agregat: TypeAgregat.FLUX, valeurComptable: 0, devise: 'MGA', fluxMensuel: 2_100_000, debut: '2024-07-08', fin: '2025-12-31' },
        { nom: 'Loyer', type: 'FluxArgent', agregat: TypeAgregat.FLUX, valeurComptable: 0, devise: 'MGA', fluxMensuel: -800_000, debut: '2024-08-08', fin: '2028-03-31' },
        { nom: 'Consommables', type: 'FluxArgent', agregat: TypeAgregat.FLUX, valeurComptable: 0, devise: 'MGA', fluxMensuel: -500_000, debut: '2024-08-08', fin: '2028-03-31' },
      ],
    },
    {
      nom: 'Compte épargne A2',
      type: 'Compte',
      agregat: TypeAgregat.TRESORERIE,
      valeurComptable: 5_000_000,
      devise: 'MGA',
      children: [
        { nom: 'Remboursement Myriade', type: 'FluxArgent', agregat: TypeAgregat.FLUX, valeurComptable: 0, devise: 'MGA', fluxMensuel: 250_000, debut: '2025-01-30', fin: '2028-01-30' },
      ],
    },
    {
      nom: 'Maison à Antananarivo',
      type: 'Materiel',
      agregat: TypeAgregat.IMMOBILISATION,
      valeurComptable: 150_000_000,
      devise: 'MGA',
      dateAcquisition: '2023-01-01',
      tauxAppreciationAnnuel: 0.1,
    },
    {
      nom: 'Voiture',
      type: 'Materiel',
      agregat: TypeAgregat.IMMOBILISATION,
      valeurComptable: 25_000_000,
      devise: 'MGA',
      dateAcquisition: '2024-01-15',
      tauxAppreciationAnnuel: -0.15,
    },
    {
      nom: 'Dette bancaire',
      type: 'Dette',
      agregat: TypeAgregat.OBLIGATION,
      valeurComptable: -20_000_000,
      devise: 'MGA',
      children: [
        { nom: 'Remboursement prêt', type: 'FluxArgent', agregat: TypeAgregat.FLUX, valeurComptable: 0, devise: 'MGA', fluxMensuel: 351_000, debut: '2024-08-08', fin: '2027-04-30' },
      ],
    },
    {
      nom: 'Créance client',
      type: 'Creance',
      agregat: TypeAgregat.OBLIGATION,
      valeurComptable: 3_000_000,
      devise: 'MGA',
      children: [],
    },
  ],
};
