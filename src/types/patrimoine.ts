export type DeviseCode = 'MGA' | 'EUR' | 'CAD';

export interface Devise {
  nom: string;
  symbole: string;
  codeIso: DeviseCode;
  valeurEnAriary: number;
  tauxDAppreciationAnnuel: number;
}

export const DEVISES: Record<DeviseCode, Devise> = {
  MGA: { nom: 'Ariary', symbole: 'Ar', codeIso: 'MGA', valeurEnAriary: 1, tauxDAppreciationAnnuel: 0 },
  EUR: { nom: 'Euro', symbole: '€', codeIso: 'EUR', valeurEnAriary: 4821, tauxDAppreciationAnnuel: 0.03 },
  CAD: { nom: 'Dollar Canadien', symbole: '$', codeIso: 'CAD', valeurEnAriary: 3286, tauxDAppreciationAnnuel: 0.03 },
};

export enum TypeAgregat {
  PATRIMOINE = 'PATRIMOINE',
  TRESORERIE = 'TRESORERIE',
  IMMOBILISATION = 'IMMOBILISATION',
  OBLIGATION = 'OBLIGATION',
  FLUX = 'FLUX',
  CORRECTION = 'CORRECTION',
  ENTREPRISE = 'ENTREPRISE',
}

export const AGREGAT_LABELS: Record<TypeAgregat, { label: string; icon: string; color: string }> = {
  [TypeAgregat.PATRIMOINE]: { label: 'Patrimoine', icon: 'landmark', color: '#a78bfa' },
  [TypeAgregat.TRESORERIE]: { label: 'Trésorerie', icon: 'banknote', color: '#2dd4bf' },
  [TypeAgregat.IMMOBILISATION]: { label: 'Immobilisations', icon: 'home', color: '#22d3ee' },
  [TypeAgregat.OBLIGATION]: { label: 'Obligations', icon: 'scroll-text', color: '#fbbf24' },
  [TypeAgregat.FLUX]: { label: 'Flux', icon: 'arrow-left-right', color: '#f87171' },
  [TypeAgregat.CORRECTION]: { label: 'Corrections', icon: 'wrench', color: '#94a3b8' },
  [TypeAgregat.ENTREPRISE]: { label: 'Entreprise', icon: 'building-2', color: '#60a5fa' },
};

export type PossessionType =
  | 'Materiel' | 'Compte' | 'Dette' | 'Creance' | 'FluxArgent'
  | 'TransfertArgent' | 'AchatMaterielAuComptant'
  | 'RemboursementDette' | 'Correction' | 'CompteCorrection'
  | 'PatrimoinePersonnel' | 'PersonneMorale' | 'Vente';

export interface PossessionTypeMeta {
  type: PossessionType;
  label: string;
  description: string;
  agregat: TypeAgregat;
  icon: string;
}

export const POSSESSION_TYPES: PossessionTypeMeta[] = [
  { type: 'Materiel', label: 'Matériel', description: 'Bien physique (maison, voiture, terrain) qui s\'apprécie ou se déprécie dans le temps', agregat: TypeAgregat.IMMOBILISATION, icon: 'home' },
  { type: 'Compte', label: 'Compte', description: 'Compte bancaire ou espèces, alimenté ou débité par des flux', agregat: TypeAgregat.TRESORERIE, icon: 'credit-card' },
  { type: 'Dette', label: 'Dette', description: 'Argent que vous devez à d\'autres (valeur comptable négative)', agregat: TypeAgregat.OBLIGATION, icon: 'trending-down' },
  { type: 'Creance', label: 'Créance', description: 'Argent que les autres vous doivent (valeur comptable positive)', agregat: TypeAgregat.OBLIGATION, icon: 'trending-up' },
  { type: 'FluxArgent', label: 'Flux d\'Argent', description: 'Flux récurrent mensuel entrant ou sortant d\'un compte', agregat: TypeAgregat.FLUX, icon: 'arrow-left-right' },
  { type: 'TransfertArgent', label: 'Transfert d\'Argent', description: 'Transfert d\'un compte vers un autre', agregat: TypeAgregat.FLUX, icon: 'arrow-left-right' },
{ type: 'AchatMaterielAuComptant', label: 'Achat au Comptant', description: 'Achat d\'un matériel payé comptant depuis un compte', agregat: TypeAgregat.IMMOBILISATION, icon: 'shopping-cart' },
  { type: 'RemboursementDette', label: 'Remboursement de Dette', description: 'Opération de remboursement d\'une dette', agregat: TypeAgregat.FLUX, icon: 'send' },
  { type: 'Correction', label: 'Correction', description: 'Correction comptable pour ajuster la valeur d\'une possession', agregat: TypeAgregat.CORRECTION, icon: 'wrench' },
  { type: 'CompteCorrection', label: 'Compte de Correction', description: 'Compte de correction associé à chaque possession', agregat: TypeAgregat.CORRECTION, icon: 'scale' },
  { type: 'PatrimoinePersonnel', label: 'Patrimoine Personnel', description: 'Quote-part d\'une personne dans un patrimoine partagé', agregat: TypeAgregat.PATRIMOINE, icon: 'user' },
  { type: 'PersonneMorale', label: 'Personne Morale', description: 'Entité juridique (entreprise) possédant un patrimoine', agregat: TypeAgregat.PATRIMOINE, icon: 'building-2' },
  { type: 'Vente', label: 'Vente', description: 'Vente d\'une possession à un prix donné vers un compte', agregat: TypeAgregat.IMMOBILISATION, icon: 'tag' },
];

export interface Personne {
  nom: string;
  part: number;
}

export interface Possession {
  nom: string;
  type: PossessionType;
  agregat: TypeAgregat;
  valeurComptable: number;
  devise: DeviseCode;
  dateAcquisition?: string;
  tauxAppreciationAnnuel?: number;
  fluxMensuel?: number;
  dateOperation?: number;
  compteSource?: string;
  compteDestination?: string;
  debut?: string;
  fin?: string;
  children?: Possession[];
}

export interface PatrimoineData {
  nom: string;
  possesseur: string;
  devise: DeviseCode;
  date: string;
  possessions: Possession[];
}

export interface FluxJournalier {
  date: string;
  compte: string;
  flux: { nom: string; montant: number }[];
  montantTotal: number;
  possible: boolean;
}

export interface EvolutionPoint {
  date: string;
  patrimoine: number;
  tresorerie: number;
  immobilisations: number;
  obligations: number;
}

export interface ObjectifData {
  nom: string;
  date: string;
  valeurCible: number;
  atteint: boolean;
}
