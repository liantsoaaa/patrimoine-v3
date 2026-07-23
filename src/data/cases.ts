export interface CaseExample {
  id: string;
  nom: string;
  description: string;
  markdown: string;
  categorie: string;
}

export const caseExamples: CaseExample[] = [
  {
    id: 'famille-rakoto',
    nom: 'Famille Rakoto',
    description: 'Un cas complet regroupant plusieurs patrimoines partagés entre membres d\'une famille, avec objectifs et corrections.',
    categorie: 'Famille',
    markdown: `# Général
* Objectif final 4884000Ar
* Objectif final (((4000000 + (-(-888000)) - 4000 * 2 + 4000) * 3) / 3) / 2 * 2 Ar

# Cas
* ZetyPersonnel
* LocationMaison

# Dates
* Dates:ajd: le 10 du 01-2025
* Dates:finSimulation: le 10 du 04-2025

# Personnes
* Zety
* Lita
* Rasoa

# Trésoreries
* loyerMaison, valant 0Ar Dates:ajd
* zetyPersonnel, valant 0Ar Dates:ajd
* zetyLoyerMaison, valant 0Ar Dates:ajd

# Créances
* zetyCreance, valant 0Ar Dates:ajd

# Dettes
* zetyDette, valant 0Ar Dates:ajd`,
  },
  {
    id: 'location-maison',
    nom: 'Location de Maison',
    description: 'Gestion d\'un bien immobilier en location avec revenus locatifs, charges mensuelles et répartition entre propriétaires.',
    categorie: 'Immobilier',
    markdown: `# Général
* Spécifier Dates:ajd
* Fin de simulation Dates:finSimulation - 1 année et 2 mois et 10 jours
* Cas de LocationMaison
* Devise en Ar

# Possesseurs
* Personnes:Zety ((40 * 2 / 2) - 2 + 3 * 1 - 1)%
* Personnes:Lita 10%
* Personnes:Rasoa 50%

# Trésoreries
* Trésoreries:loyerMaison

# Initialisation
* \`objectifInitLocationMaison\` Dates:ajd, objectif de 500000Ar pour Trésoreries:loyerMaison
* \`initCompteLoyerMaison\` Dates:ajd, entrer 500000Ar vers Trésoreries:loyerMaison

# Opérations
## Rem2025, Dates:ajd, devise en Ar
* \`remZety2025\` Dates:ajd, entrer 400000Ar vers Trésoreries:zetyLoyerMaison, jusqu'à le 31 du 12-2025 tous les 1 du mois

## ChargesLoyer, Dates:ajd, devise en Ar
* \`paiementCommune\` Dates:ajd, sortir 200000Ar depuis Trésoreries:loyerMaison, jusqu'à date indéterminée tous les 01 du mois`,
  },
  {
    id: 'zety-personnel',
    nom: 'Patrimoine Personnel de Zety',
    description: 'Le patrimoine individuel de Zety avec salaire, charges, train de vie, créance, dette et corrections de suivi.',
    categorie: 'Personnel',
    markdown: `# Général
* Spécifier Dates:ajd + 1 mois et 5 jours
* Fin de simulation Dates:finSimulation - 1 année
* Cas de ZetyPersonnel
* Devise en Ar

# Possesseurs
* Personnes:Zety ((le 2 février 2050 - 1année - le 2 février 2025 en années) * 4 + 1 * 4)%

# Trésoreries
* Trésoreries:zetyPersonnel
* Trésoreries:zetyLoyerMaison

# Créances
* Créances:zetyCreance

# Dettes
* Dettes:zetyDette

# Initialisation
* \`objectifInitZetyPersonnel\` Dates:ajd, objectif de 1000000Ar pour Trésoreries:zetyPersonnel
* \`initComptePersonnel\` Dates:ajd, entrer 1000000Ar vers Trésoreries:zetyPersonnel

# Opérations
## TrainDeVie, Dates:ajd, devise en Ar
* \`abonnementWifi\` Dates:ajd, sortir 40000Ar depuis Trésoreries:zetyPersonnel, jusqu'à date indéterminée tous les 15 du mois
* \`achatVivres\` Dates:ajd, sortir 200000Ar depuis Trésoreries:zetyPersonnel, jusqu'à date indéterminée tous les 01 du mois

## SalaireMensuel, Dates:ajd, devise en Ar
* \`salaireMensuel\` Dates:ajd, entrer 500000Ar vers Trésoreries:zetyPersonnel, jusqu'à date indéterminée tous les 31 du mois

# Suivi
* \`nouvelObjectif\` Le 02 du 02-2025, objectif de 2000000Ar pour Trésoreries:zetyPersonnel
* \`correction1\` le 02 du 02-2025, corriger 540000Ar dans Trésoreries:zetyPersonnel`,
  },
  {
    id: 'etudiant-pire-cas',
    nom: 'Étudiant — Pire Cas',
    description: 'Un étudiant avec un compte à zéro, un train de vie intense et un matériel qui se déprécie rapidement. Cas d\'alerte.',
    categorie: 'Étudiant',
    markdown: `# Général
* Spécifier le 17 du 09-2024
* Cas de Ilo
* Devise en Ar

# Possesseurs
* Personnes:Ilo 100%

# Trésoreries
* Trésoreries:especes, valant 0Ar le 17 du 09-2024

# Initialisation
* \`initEspeces\` le 01 du 02-2024, entrer 700000Ar vers Trésoreries:especes

# Opérations
## TrainDeVie, le 17 du 09-2024, devise en Ar
* \`vieCourante\` le 17 du 09-2024, sortir 100000Ar depuis Trésoreries:especes, jusqu'à le 13 du 05-2024 tous les 15 du mois

## AchatMateriel
* \`achatMac\` le 14 du 05-2024, acheter un MacBook Pro valant 500000Ar s'dépréciant annuellement de 90% depuis Trésoreries:especes

# Suivi
* \`correctionHausse\` le 17 du 09-2024, corriger 50000Ar dans Trésoreries:especes`,
  },
  {
    id: 'patrimoine-cresus',
    nom: 'Patrimoine de Crésus',
    description: 'Un patrimoine riche et complexe avec multiples comptes, dettes, créances et transferts.',
    categorie: 'Complexe',
    markdown: `# Général
* Spécifier le 08 du 07-2024
* Fin de simulation le 31 du 03-2028
* Cas de Cresus
* Devise en €

# Possesseurs
* Personnes:Cresus 100%

# Trésoreries
* Trésoreries:bp, valant 10000€ le 08 du 07-2024
* Trésoreries:a2, valant 5000€ le 08 du 07-2024

# Créances
* Créances:creance, valant 500€ le 08 du 07-2024

# Dettes
* Dettes:dette, valant -8000€ le 08 du 07-2024

# Opérations
## Salaire, le 08 du 07-2024, devise en €
* \`salaire1\` le 08 du 07-2024, entrer 2100€ vers Trésoreries:bp, jusqu'à le 30 du 09-2024 tous les 07 du mois
* \`salaire2\` le 01 du 10-2024, entrer 3200€ vers Trésoreries:bp, jusqu'à le 31 du 12-2025 tous les 07 du mois

## Charges, le 08 du 07-2024, devise en €
* \`loyer\` le 08 du 07-2024, sortir 1600€ depuis Trésoreries:bp, jusqu'à le 31 du 03-2028 tous les 25 du mois
* \`consommables\` le 08 du 07-2024, sortir 1000€ depuis Trésoreries:bp, jusqu'à le 31 du 03-2028 tous les 01 du mois

## Remboursements, le 08 du 07-2024, devise en €
* \`pretBP\` le 08 du 08-2024, sortir 702€ depuis Trésoreries:bp, jusqu'à le 30 du 04-2027 tous les 07 du mois
* \`rembMyriade\` le 30 du 01-2025, entrer 500€ vers Trésoreries:a2, jusqu'à le 30 du 01-2028 tous les 25 du mois`,
  },
];
