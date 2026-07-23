import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-500 transition-all duration-300 hover:bg-white/5 hover:text-accent-300"
    >
      {copied ? <><Check className="h-3 w-3" /> Copié !</> : <><Copy className="h-3 w-3" /> Copier</>}
    </button>
  );
}

const toc: TocItem[] = [
  { id: 'vue-ensemble', label: 'Vue d\'ensemble' },
  { id: 'comptabilite', label: 'Comptabilité' },
  { id: 'graphes-visualisation', label: 'Graphes & visualisation' },
  { id: 'specifier-patrimoine', label: 'Spécifier son patrimoine' },
  { id: 'general', label: 'Général' },
  { id: 'possesseurs', label: 'Possesseurs' },
  { id: 'tresoreries', label: 'Trésoreries' },
  { id: 'immobilisations', label: 'Immobilisations' },
  { id: 'creances', label: 'Créances' },
  { id: 'dettes', label: 'Dettes' },
  { id: 'initialisation', label: 'Initialisation' },
  { id: 'operations', label: 'Opérations' },
  { id: 'achats-transferts', label: 'Achats & Transferts' },
  { id: 'suivi', label: 'Suivi & Corrections' },
  { id: 'projeter-patrimoine', label: 'Projeter' },
  { id: 'recouper-patrimoine', label: 'Recouper' },
  { id: 'alerter-patrimoine', label: 'Alerter' },
  { id: 'devises', label: 'Devises supportées' },
  { id: 'tout-cas', label: 'Cas multiple (ToutCas)' },
  { id: 'glossaire', label: 'Glossaire' },
];

function TermLink({ term, section }: { term: string; section: string }) {
  return (
    <a
      href={`/guide#${section}`}
      className="relative cursor-pointer font-medium text-blue-300 underline decoration-dotted underline-offset-4 decoration-blue-400/50 transition-all duration-200 hover:text-blue-200 hover:decoration-blue-300/80"
      onClick={(e) => {
        e.preventDefault();
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      {term}
    </a>
  );
}

function CodeExample({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
      {filename && (
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2">
          <span className="text-xs font-medium text-slate-500">{filename}</span>
          <CopyButton code={code} />
        </div>
      )}
      {!filename && (
        <div className="flex justify-end px-4 pt-2">
          <CopyButton code={code} />
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export default function GuidePage() {
  const navigate = useNavigate();

  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Guide · Sommaire" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow"><Icon name="book-open" size={16} />Guide d'utilisation</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Guide d'utilisation Patrimoine
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                Ce guide vous accompagne <strong>de A à Z</strong> pour utiliser Patrimoine.
                À la fin de ce guide, vous saurez
                spécifier, projeter, recouper et alerter sur votre patrimoine.
              </p>
            </div>
          </div>

          {/* ======== VUE D'ENSEMBLE ======== */}
          <Section id="vue-ensemble" eyebrow="Introduction" title="Vue d'ensemble de Patrimoine">
            <p>
              Patrimoine est une librairie Java qui vous permet de raisonner
              <strong> holistiquement</strong> sur votre patrimoine. Vous utilisez
              des fichiers texte structurés appelés <strong>fichiers cas</strong> écrits
              en <TermLink term="PatriLang" section="glossaire" />, le langage dédié.
            </p>
            <p>Les quatre étapes fondamentales sont :</p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                <h4 className="text-sm font-semibold text-blue-300">1. Spécifier</h4>
                <p className="mt-1 text-xs text-slate-400">Décrire votre patrimoine à un instant précis : comptes, biens, dettes, créances, flux.</p>
              </div>
              <div className="rounded-xl border border-blue-400/20 bg-blue-400/5 p-4">
                <h4 className="text-sm font-semibold text-blue-300">2. Projeter</h4>
                <p className="mt-1 text-xs text-slate-400">Visualiser l'évolution future de votre patrimoine sur une période donnée.</p>
              </div>
              <div className="rounded-xl border border-school-400/20 bg-school-400/5 p-4">
                <h4 className="text-sm font-semibold text-school-400">3. Recouper</h4>
                <p className="mt-1 text-xs text-slate-400">Comparer les opérations planifiées avec la réalité et corriger les écarts.</p>
              </div>
              <div className="rounded-xl border border-jtr-rose/20 bg-jtr-rose/5 p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">4. Alerter</h4>
                <p className="mt-1 text-xs text-slate-400">Détecter les flux impossibles : opérations qui feraient passer un compte en négatif.</p>
              </div>
            </div>
          </Section>

          {/* ======== COMPTABILITÉ ======== */}
          <Section id="comptabilite" eyebrow="Comptabilité" title="Documents requis">
            <p>
              Pour un suivi patrimonial complet, Patrimoine peut travailler avec
              plusieurs types de documents comptables et justificatifs.
            </p>

            <h3>Journaux planifiés</h3>
            <p>
              Les journaux planifiés sont les flux prévus dans votre cas. Ils
              représentent ce que vous attendez comme mouvements financiers sur la
              période de projection.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">Format PatriLang</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Revenus récurrents (salaires, pensions)</li>
                <li>Charges mensuelles (loyer, assurances)</li>
                <li>Échéances de prêts</li>
                <li>Virements programmés</li>
              </ul>
            </div>

            <h3>Journaux réalisés</h3>
            <p>
              Les journaux réalisés sont les mouvements réels observés (relevés
              bancaires). Ils sont comparés aux journaux planifiés lors du
              recoupement.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">Format PatriLang ou CSV</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Relevés bancaires mensuels</li>
                <li>Transactions réelles enregistrées</li>
                <li>Comparaison avec les prévisions</li>
                <li>Détection des écarts</li>
              </ul>
            </div>

            <h3>Pièces justificatives</h3>
            <p>
              Les pièces justificatives (PJ) documentent chaque opération
              importante. Elles contiennent un identifiant, une date, une référence
              et un lien vers le document.
            </p>
            <div className="my-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              <span className="text-xs font-semibold text-blue-300">Liens Google Drive ou fichiers</span>
              <ul className="mt-2 space-y-1 text-sm text-slate-400">
                <li>Factures et reçus</li>
                <li>Contrats de prêt</li>
                <li>Attestations d'assurance</li>
                <li>Liens Google Drive vérifiés</li>
              </ul>
            </div>
          </Section>

          {/* ======== GRAPHES & VISUALISATION ======== */}
          <Section id="graphes-visualisation" eyebrow="Visualisation" title="Graphes & visualisation">
            <p>
              Patrimoine génère des graphiques d'évolution grâce au module XChart.
              Ces visualisations vous permettent de comprendre intuitivement
              l'évolution de votre patrimoine.
            </p>

            <h3>Trésorerie</h3>
            <p>
              Évolution des comptes bancaires et liquidités disponibles.
            </p>

            <h3>Immobilisations</h3>
            <p>
              Valeur des biens matériels et immobiliers dans le temps.
            </p>

            <h3>Obligations</h3>
            <p>
              Évolution des dettes et créances (passifs et actifs financiers).
            </p>

            <h3>Vue combinée</h3>
            <p>
              Toutes les courbes superposées pour une vue d'ensemble complète.
            </p>

            <h3 className="mt-6 text-lg font-bold text-white">Types de graphiques</h3>
            <p>
              Vous pouvez visualiser séparément la trésorerie, les immobilisations,
              les obligations, ou combiner toutes les courbes dans un seul
              graphique. Les graphiques sont stockés en PNG dans les ressources de
              test.
            </p>

            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Trésorerie</h4>
                <p className="mt-1 text-xs text-slate-400">Comptes bancaires et liquidités.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Immobilisations</h4>
                <p className="mt-1 text-xs text-slate-400">Biens matériels et immobiliers.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Obligations</h4>
                <p className="mt-1 text-xs text-slate-400">Dettes et créances.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Vue combinée</h4>
                <p className="mt-1 text-xs text-slate-400">Toutes les courbes superposées.</p>
              </div>
            </div>
          </Section>

          {/* ======== SPÉCIFIER ======== */}
          <Section id="specifier-patrimoine" eyebrow="Étape 1" title="Spécifier son patrimoine">
            <p>
              Avec Patrimoine, vous décrivez votre situation financière dans un fichier texte
              structuré appelé un <strong>cas</strong>. Ce fichier utilise le langage{' '}
              <TermLink term="PatriLang" section="glossaire" />.
            </p>
            <p>
              Un cas se compose de plusieurs sections obligatoires et optionnelles.
              Chaque section décrit un aspect de votre patrimoine.
            </p>
          </Section>

          <Section id="general" eyebrow="Section" title="Général — Les informations de base">
            <p>
              La section <code className="inline-code"># Général</code> définit les paramètres
              fondamentaux de votre simulation : la date de départ, la date de fin, le nom du cas
              et la devise utilisée.
            </p>
            <CodeExample filename="general.cas.md" code={`# Général
* Spécifier le 01 du 01-2025
* Fin de simulation le 31 du 12-2030
* Cas de MonPatrimoine
* Devise en Ar`} />
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Spécifier</span>
                <p className="mt-1 text-sm text-slate-400">La date de référence (aujourd'hui) à partir de laquelle la simulation commence.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Fin de simulation</span>
                <p className="mt-1 text-sm text-slate-400">La date jusqu'à laquelle le patrimoine sera projeté.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Cas de</span>
                <p className="mt-1 text-sm text-slate-400">Le nom que vous donnez à votre cas.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">Devise en</span>
                <p className="mt-1 text-sm text-slate-400">
                  La monnaie utilisée : <code className="inline-code">Ar</code> (Ariary), <code className="inline-code">€</code> (Euro) ou <code className="inline-code">$</code> (Dollar canadien).
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500">Les dates peuvent aussi s'écrire de façon relative :</p>
            <CodeExample code={`* Spécifier Dates:ajd + 1 mois et 5 jours
* Fin de simulation Dates:finSimulation - 1 année`} />
            <Callout variant="info" title="Dates spéciales">
              Utilisez <code className="inline-code">Dates:ajd</code> pour « aujourd'hui » et{' '}
              <code className="inline-code">Dates:finSimulation</code> pour la fin de la simulation.
              Vous pouvez aussi utiliser <code className="inline-code">date indéterminée</code> pour une période ouverte.
              Les opérations arithmétiques sur les dates sont supportées :
              <code className="inline-code">+ 1 mois</code>, <code className="inline-code">- 1 année</code>, etc.
            </Callout>
          </Section>

          <Section id="possesseurs" eyebrow="Section" title="Possesseurs — Qui possède quoi">
            <p>
              La section <code className="inline-code"># Possesseurs</code> définit les personnes
              qui possèdent le patrimoine et leur part de propriété, exprimée en pourcentage.
            </p>
            <CodeExample filename="possesseurs.cas.md" code={`# Possesseurs
* Personnes:Zety 60%
* Personnes:Lita 10%
* Personnes:Rasoa 30%`} />
            <p className="text-sm text-slate-500">
              Les pourcentages peuvent être calculés avec des expressions arithmétiques :
            </p>
            <CodeExample code={`* Personnes:Zety ((40 * 2 / 2) - 2 + 3 * 1 - 1)%`} />
          </Section>

          <Section id="tresoreries" eyebrow="Section" title="Trésoreries — Vos comptes d'argent">
            <p>
              La section <code className="inline-code"># Trésoreries</code> déclare les comptes
              qui contiennent de l'argent disponible : comptes bancaires, espèces, épargne.
              C'est ce qu'on appelle la{' '}
              <TermLink term="trésorerie" section="tresorerie" />.
            </p>
            <CodeExample filename="tresoreries.cas.md" code={`# Trésoreries
* compteCourant, valant 5000000Ar le 01 du 01-2025
* compteEpargne, valant 2000000Ar le 01 du 01-2025`} />
            <p className="text-sm text-slate-500">
              On peut aussi référencer un compte défini dans un autre fichier cas :
            </p>
            <CodeExample code={`* Trésoreries:compteCourant
* Trésoreries:compteEpargne`} />
            <p>
              Le format est : <code className="inline-code">* nom, valant montantDevise date</code>.
              Les montants peuvent contenir des expressions arithmétiques comme{' '}
              <code className="inline-code">((4000000 + 888000) * 3) / 2 Ar</code>.
            </p>
          </Section>

          <Section id="immobilisations" eyebrow="Section" title="Immobilisations — Vos biens">
            <p>
              Les biens matériels ou immatériels peuvent être déclarés directement dans
              la section <code className="inline-code"># Trésoreries</code> avec un taux d'appréciation,
              ou achetés via les opérations. Voici comment déclarer un bien déjà possédé :
            </p>
            <CodeExample filename="immobilisations.cas.md" code={`# Trésoreries
* maisonFamille, valant 50000000Ar le 01 du 01-2025 s'appréciant annuellement de +5%
* voiture, valant 15000000Ar le 01 du 01-2025 s'appréciant annuellement de -10%`} />
            <p>
              Le taux d'appréciation peut être positif (le bien prend de la valeur) ou négatif
              (le bien se déprécie).
            </p>
          </Section>

          <Section id="creances" eyebrow="Section" title="Créances — Ce qu'on vous doit">
            <p>
              La section <code className="inline-code"># Créances</code> liste l'argent que
              d'autres personnes vous doivent. Une{' '}
              <TermLink term="créance" section="creance" /> est un actif : elle augmente
              la valeur de votre patrimoine.
            </p>
            <CodeExample filename="creances.cas.md" code={`# Créances
* pretAmi, valant 500000Ar le 01 du 01-2025
* factureClient, valant 1200000Ar le 01 du 01-2025`} />
          </Section>

          <Section id="dettes" eyebrow="Section" title="Dettes — Ce que vous devez">
            <p>
              La section <code className="inline-code"># Dettes</code> liste l'argent que
              vous devez à d'autres. Une <TermLink term="dette" section="dette" /> est un passif :
              elle diminue la valeur de votre patrimoine.
            </p>
            <CodeExample filename="dettes.cas.md" code={`# Dettes
* pretBancaire, valant 10000000Ar le 01 du 01-2025
* creditVoiture, valant 5000000Ar le 01 du 01-2025`} />
          </Section>

          <Section id="initialisation" eyebrow="Section" title="Initialisation — Préparer la simulation">
            <p>
              La section <code className="inline-code"># Initialisation</code> définit les
              opérations de départ qui doivent être exécutées au lancement de la simulation.
              C'est ici qu'on alimente les comptes et qu'on fixe les objectifs initiaux.
            </p>
            <CodeExample filename="initialisation.cas.md" code={`# Initialisation
* \`objectifInitial\` Dates:ajd, objectif de 1000000Ar pour Trésoreries:compteCourant
* \`depotInitial\` Dates:ajd, entrer 1000000Ar vers Trésoreries:compteCourant`} />
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">objectif de</span>
                <p className="mt-1 text-sm text-slate-400">Définit un objectif de valeur pour un compte donné. Le système vérifiera s'il est atteint.</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">entrer ... vers</span>
                <p className="mt-1 text-sm text-slate-400">Ajoute de l'argent dans un compte (dépôt initial, virement entrant).</p>
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-blue-300">sortir ... depuis</span>
                <p className="mt-1 text-sm text-slate-400">Retire de l'argent d'un compte (retrait, paiement).</p>
              </div>
            </div>
          </Section>

          <Section id="operations" eyebrow="Section" title="Opérations — Les mouvements récurrents">
            <p>
              La section la plus importante : <code className="inline-code"># Opérations</code>
              décrit les mouvements d'argent réguliers. Chaque opération est regroupée sous
              un sous-titre (préfixé par <code className="inline-code">##</code>) avec sa propre devise.
            </p>

            <h3 className="mt-6 text-lg font-bold text-white">Revenu récurrent (salaire, loyer)</h3>
            <CodeExample filename="operations-revenu.cas.md" code={`# Opérations
## Salaire, Dates:ajd, devise en Ar
* \`salaireMensuel\` Dates:ajd, entrer 500000Ar vers Trésoreries:compteCourant, jusqu'à date indéterminée tous les 31 du mois`} />
            <p>
              Le format complet : <code className="inline-code">* \`id\` date, entrer montantDevise vers Trésoreries:compte, jusqu'à dateFin tous les jour du mois</code>
            </p>

            <h3 className="mt-6 text-lg font-bold text-white">Dépense récurrente (abonnement, loyer)</h3>
            <CodeExample filename="operations-depense.cas.md" code={`## Charges, Dates:ajd, devise en Ar
* \`abonnementInternet\` Dates:ajd, sortir 40000Ar depuis Trésoreries:compteCourant, jusqu'à date indéterminée tous les 15 du mois
* \`loyer\` Dates:ajd, sortir 300000Ar depuis Trésoreries:compteCourant, jusqu'à le 31 du 12-2030 tous les 5 du mois`} />

            <h3 className="mt-6 text-lg font-bold text-white">Remboursement de dette</h3>
            <CodeExample code={`* \`remboursement\` Dates:ajd, rembourser Dettes:pretBancaire de Trésoreries:compteCourant avec Créances:factureClient de Trésoreries:compteCourant valant 500000Ar`} />

            <Callout variant="tip" title="Opérations périodiques">
              Utilisez <code className="inline-code">jusqu'à date indéterminée</code> pour une opération qui se répète sans fin,
              ou <code className="inline-code">jusqu'à le 31 du 12-2030</code> pour une période définie.
              Le mot <code className="inline-code">tous les X du mois</code> fixe le jour d'exécution mensuel.
            </Callout>
          </Section>

          <Section id="achats-transferts" eyebrow="Section" title="Achats & Transferts — Opérations ponctuelles">
            <h3>Achat d'un bien matériel</h3>
            <p>
              L'achat d'un bien crée une nouvelle immobilisation et débite le compte source :
            </p>
            <CodeExample filename="achat.cas.md" code={`# Opérations
## Achats, Dates:ajd, devise en Ar
* \`achatVoiture\` Dates:ajd, acheter VoiturePersonnelle, valant 15000000Ar, depuis Trésoreries:compteCourant, s'appréciant annuellement de -10%`} />
            <p>
              Le taux d'appréciation peut être positif (le bien prend de la valeur) ou négatif
              (le bien se déprécie, comme une voiture).
            </p>

            <h3>Vente d'un bien</h3>
            <CodeExample code={`* \`venteVoiture\` Dates:ajd, vendre VoiturePersonnelle pour 5000000Ar vers Trésoreries:compteCourant`} />

            <h3>Transfert entre comptes</h3>
            <p>
              Un transfert déplace de l'argent d'un compte à un autre sans modifier
              le patrimoine total :
            </p>
            <CodeExample filename="transfert.cas.md" code={`* \`virement\` Dates:ajd, transférer 200000Ar depuis Trésoreries:compteCourant vers Trésoreries:compteEpargne`} />
          </Section>

          <Section id="suivi" eyebrow="Section" title="Suivi & Corrections — Ajuster la réalité">
            <p>
              La section <code className="inline-code"># Suivi</code> permet de modifier les
              objectifs et de corriger les écarts entre la simulation et la réalité.
            </p>
            <h3 className="mt-4 text-lg font-bold text-white">Définir un objectif</h3>
            <CodeExample filename="suivi.cas.md" code={`# Suivi
* \`objectifFutur\` le 01 du 06-2026, objectif de 2000000Ar pour Trésoreries:compteCourant`} />

            <h3 className="mt-4 text-lg font-bold text-white">Corriger un écart — La correction standard</h3>
            <p>
              Quand la réalité diffère de la simulation, utilisez une correction pour
              ajuster la valeur d'un compte. C'est la forme la plus courante :
            </p>
            <CodeExample filename="correction.cas.md" code={`* \`correction1\` le 15 du 03-2025, corriger 540000Ar dans Trésoreries:compteCourant`} />

            <h3 className="mt-4 text-lg font-bold text-white">Autres formes de corrections</h3>
            <p>
              Il existe plusieurs types de corrections pour différentes situations :
            </p>
            <div className="my-4 space-y-3">
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Correction de solde</span>
                <p className="mt-1 text-sm text-slate-400">
                  Ajuste la valeur brute d'un compte. Utilisez quand le solde réel diffère du solde théorique.
                </p>
                <CodeExample code={`* \`corr\` le 15 du 03-2025, corriger 540000Ar dans Trésoreries:compteCourant`} />
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Correction de flux manqué</span>
                <p className="mt-1 text-sm text-slate-400">
                  Marquer un flux comme ne s'étant jamais produit (annulation d'un prélèvement prévu).
                </p>
                <CodeExample code={`* \`annul\` le 20 du 04-2025, corriger 0Ar dans FluxArgent:abonnement`} />
              </div>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <span className="font-mono text-xs font-semibold text-school-400">Correction de valeur d'immobilisation</span>
                <p className="mt-1 text-sm text-slate-400">
                  Ajuster la valeur comptable d'un bien matériel suite à une estimation mise à jour.
                </p>
                <CodeExample code={`* \`corrImmo\` le 01 du 06-2025, corriger 48000000Ar dans Materiel:maison`} />
              </div>
            </div>

            <Callout variant="info" title="Pourquoi corriger ?">
              Les corrections sont essentielles pour la politique{' '}
              <TermLink term="ZFJA" section="zfja" /> : en ajustant votre spécification
              à la réalité, vous éliminez les flux journaliers et obtenez une
              représentation fidèle de votre patrimoine.
            </Callout>
          </Section>

          {/* ======== PROJETER ======== */}
          <Section id="projeter-patrimoine" eyebrow="Étape 2" title="Projeter l'évolution de votre patrimoine">
            <p>
              Une fois votre patrimoine spécifié, vous pouvez visualiser son évolution
              future grâce aux <strong>graphes</strong>. Le visualiseur génère des graphiques
              d'évolution qui montrent comment votre patrimoine change au fil du temps.
            </p>
            <h3>Les graphes d'évolution</h3>
            <p>
              Un <strong>graphe d'évolution</strong> est un graphique qui représente l'évolution
              de la valeur de vos possessions sur une période donnée. Chaque ligne du graphe
              correspond à un agrégat (trésorerie, immobilisations, obligations) ou au
              patrimoine total. Vous pouvez voir précisément à quel moment votre patrimoine
              augmente, diminue ou stagne.
            </p>
            <p>
              Le graphique est <strong>configurable</strong> : vous choisissez la période
              d'affichage, les agrégats à afficher, et la devise de référence. Le graphique
              se met à jour automatiquement lorsque vous modifiez votre spécification.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-3">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Trésorerie uniquement</h4>
                <p className="mt-1 text-xs text-slate-400">Visualisez l'évolution de votre argent disponible dans le temps.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Immobilisations uniquement</h4>
                <p className="mt-1 text-xs text-slate-400">Suivez la valeur de vos biens matériels (appréciation/dépréciation).</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-blue-300">Toute combinaison</h4>
                <p className="mt-1 text-xs text-slate-400">Affichez n'importe quelle combinaison d'agrégats sur le graphe.</p>
              </div>
            </div>
            <p>
              Le graphique montre l'évolution mois par mois. Les lignes représentent
              chaque agrégat (trésorerie, immobilisations, obligations) et leur
              somme donne le patrimoine total. C'est un outil essentiel pour anticiper
              les périodes de tension financière et planifier vos investissements.
            </p>
            <Callout variant="info" title="Configuration du graphe">
              Vous pouvez choisir la période d'affichage, les agrégats à afficher,
              et la devise de référence. Le graphique se met à jour automatiquement
              lorsque vous modifiez votre spécification.
            </Callout>
          </Section>

          {/* ======== RECUPER ======== */}
          <Section id="recouper-patrimoine" eyebrow="Étape 3" title="Recouper planification et réalité">
            <p>
              Les <strong>flux journaliers</strong> sont la liste des opérations qui se sont
              déroulées depuis la date de spécification jusqu'à la fin choisie de la projection.
            </p>
            <p>
              Il faut suivre régulièrement cette liste et mettre à jour la spécification en
              fonction de quelles opérations <strong>passées</strong> se sont réellement réalisées,
              et quelles opérations ne se sont jamais réalisées.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Flux journaliers</h4>
                <p className="mt-1 text-xs text-slate-400">Liste des opérations planifiées à comparer avec la réalité.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-cyan">Corrections</h4>
                <p className="mt-1 text-xs text-slate-400">Ajustement des valeurs via les corrections dans la section Suivi.</p>
              </div>
            </div>
            <h3>Comment recouper en pratique</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-400">
              <li>Ouvrez votre fichier cas actuel (dossier Planifiés).</li>
              <li>Consultez les flux journaliers générés par le visualiseur.</li>
              <li>Pour chaque écart constaté, ajoutez une correction dans la section <code className="inline-code"># Suivi</code>.</li>
              <li>Enregistrez la version corrigée dans le dossier Réalisés avec la date du jour.</li>
              <li>Passez à la période suivante.</li>
            </ol>
            <Callout variant="tip" title="Politique ZFJA">
              Visez <strong>Zéro Flux Journaliers jusqu'à Aujourd'hui</strong> : mettez à jour
              la spécification jusqu'à une date dont la fraîcheur permet d'éliminer
              tous les flux journaliers listés. Si ZFJA est atteint, votre spécification représente
              fidèlement la réalité à date d'aujourd'hui.
            </Callout>
          </Section>

          {/* ======== ALERTER ======== */}
          <Section id="alerter-patrimoine" eyebrow="Étape 4" title="Alerter sur les flux impossibles">
            <p>
              Les <strong>flux impossibles</strong> arrivent quand vous essayez de faire déplacer
              de l'argent depuis une source qui n'en contient pas suffisamment.
            </p>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Détection automatique</h4>
                <p className="mt-1 text-xs text-slate-400">Identification des opérations qui feraient passer un compte en négatif.</p>
              </div>
              <div className="card card-hover p-4">
                <h4 className="text-sm font-semibold text-jtr-rose">Planification</h4>
                <p className="mt-1 text-xs text-slate-400">Bien planifier l'évolution pour que la trésorerie couvre toujours les opérations.</p>
              </div>
            </div>
            <h3>Comment éviter les flux impossibles</h3>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-400">
              <li>Consultez la liste des flux impossibles dans le visualiseur.</li>
              <li>Identifiez le compte et la date du problème.</li>
              <li>Ajoutez un transfert, un revenu anticipé ou réduisez une dépense dans vos opérations.</li>
              <li>Revérifiez jusqu'à ce qu'aucun flux impossible ne subsiste.</li>
            </ol>
            <Callout variant="warning" title="Politique ZFI">
              Visez <strong>Zéro Flux Impossibles</strong> : planifiez
              l'évolution de votre patrimoine de sorte à ce que votre trésorerie puisse
              toujours couvrir vos différentes opérations. Si ZFI est atteint, vous devrez
              pouvoir réaliser toutes vos opérations.
            </Callout>
          </Section>

          {/* ======== DEVISES ======== */}
          <Section id="devises" eyebrow="Référence" title="Devises supportées">
            <p>
              Patrimoine supporte plusieurs devises avec des taux de conversion automatiques.
            </p>
            <div className="my-6 grid gap-6 sm:grid-cols-3">
              {[
                { symbole: 'Ar', nom: 'Ariary', code: 'MGA', valeur: '1 Ar (référence)', color: '#2dd4bf' },
                { symbole: '€', nom: 'Euro', code: 'EUR', valeur: '4 821 Ar', color: '#60a5fa' },
                { symbole: '$', nom: 'Dollar canadien', code: 'CAD', valeur: '3 286 Ar', color: '#a78bfa' },
              ].map((d, i) => (
                <div key={d.code} className="card-float card-hover p-6" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-2xl font-bold" style={{ color: d.color }}>{d.symbole}</span>
                    <span className="text-lg font-semibold text-white">{d.nom}</span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-400">
                    <div>Code ISO: {d.code}</div>
                    <div>Valeur en Ariary: {d.valeur}</div>
                  </div>
                </div>
              ))}
            </div>
            <Callout variant="info" title="Devise par défaut">
              La devise de référence de Patrimoine est l'Ariary (Ar), monnaie de Madagascar.
              Les conversions sont automatiques lors des projections.
            </Callout>
          </Section>

          {/* ======== TOUT CAS ======== */}
          <Section id="tout-cas" eyebrow="Avancé" title="Assembler plusieurs cas (ToutCas)">
            <p>
              Vous pouvez combiner plusieurs cas individuels dans un fichier
              <code className="inline-code">.tout.md</code> pour simuler un patrimoine
              complexe impliquant plusieurs personnes et comptes.
            </p>
            <CodeExample filename="Famille.tout.md" code={`# Général
* Objectif final 4884000Ar

# Cas
* PatrimoinePersonnel
* LocationMaison

# Dates
* Dates:ajd: le 10 du 01-2025
* Dates:finSimulation: le 10 du 04-2025

# Personnes
* Zety
* Lita
* Rasoa

# Trésoreries
* comptePrincipal, valant 0Ar Dates:ajd
* compteSecondaire, valant 0Ar Dates:ajd

# Créances
* creanceClient, valant 0Ar Dates:ajd

# Dettes
* detteBanque, valant 0Ar Dates:ajd`} />
            <p>
              Le fichier <code className="inline-code">.tout.md</code> sert de point
              d'entrée : il définit les dates communes, énumère les cas inclus, les
              personnes concernées et les comptes partagés entre les cas.
            </p>

            <h3 className="mt-6 text-lg font-bold text-white">Les trois types de fichiers</h3>
            <div className="my-4 grid gap-4 sm:grid-cols-3">
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.cas.md</span>
                <p className="mt-2 text-xs text-slate-400">Un cas individuel décrivant une situation financière.</p>
              </div>
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.tout.md</span>
                <p className="mt-2 text-xs text-slate-400">Assemblage de plusieurs cas en un seul patrimoine.</p>
              </div>
              <div className="card card-hover p-4">
                <span className="font-mono text-sm font-semibold text-blue-300">.pj.md</span>
                <p className="mt-2 text-xs text-slate-400">Pièces justificatives associées à un cas.</p>
              </div>
            </div>
          </Section>

          {/* ======== GLOSSAIRE ======== */}
          <Section id="glossaire" eyebrow="Référence" title="Glossaire des termes techniques">
            <div className="space-y-6">
              <div id="patrilang" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">PatriLang</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Le langage dédié (DSL) de Patrimoine. Il permet de décrire un patrimoine
                  de façon déclarative dans un fichier texte, sans écrire de code Java.
                  Les fichiers PatriLang utilisent les extensions <code className="inline-code">.cas.md</code>,{' '}
                  <code className="inline-code">.tout.md</code> et <code className="inline-code">.pj.md</code>.
                </p>
              </div>

              <div id="tresorerie" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Trésorerie</h3>
                <p className="mt-2 text-sm text-slate-400">
                  L'argent disponible immédiatement : comptes courants, épargne, espèces, caisse.
                  C'est l'agrégat le plus liquide du patrimoine.
                </p>
              </div>

              <div id="immobilisation" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Immobilisation</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Les biens matériels (maison, voiture, terrain) ou immatériels (logiciel, brevet)
                  qui ont une valeur économique mais ne sont pas convertibles facilement en argent.
                </p>
              </div>

              <div id="obligation" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Obligation</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Regroupe les dettes (ce que vous devez) et les créances (ce qu'on vous doit).
                  Les dettes diminuent votre patrimoine, les créances l'augmentent.
                </p>
              </div>

              <div id="dette" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Dette</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Une somme d'argent que vous devez à quelqu'un (prêt bancaire, crédit, emprunt).
                  C'est un passif qui réduit la valeur nette de votre patrimoine.
                </p>
              </div>

              <div id="creance" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Créance</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Une somme d'argent que quelqu'un vous doit (prêt à un ami, facture impayée, salaire dû).
                  C'est un actif qui augmente la valeur de votre patrimoine.
                </p>
              </div>

              <div id="zfja" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">ZFJA</h3>
                <p className="mt-2 text-sm text-slate-400">
                  <strong>Zéro Flux Journaliers jusqu'à Aujourd'hui.</strong> Politique qui consiste
                  à mettre à jour régulièrement votre spécification pour qu'il n'y ait aucun flux
                  journalier en attente. Si ZFJA est atteint, votre spécification représente
                  fidèlement la réalité à date d'aujourd'hui.
                </p>
              </div>

              <div id="zfi" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">ZFI</h3>
                <p className="mt-2 text-sm text-slate-400">
                  <strong>Zéro Flux Impossibles.</strong> Politique qui consiste à planifier
                  l'évolution de votre patrimoine pour que la trésorerie puisse toujours couvrir
                  toutes les opérations. Si ZFI est atteint, vous pouvez réaliser toutes vos
                  opérations sans blocage.
                </p>
              </div>

              <div id="flux-journalier" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Flux journalier</h3>
                <p className="mt-2 text-sm text-slate-400">
                  La liste des opérations qui se sont déroulées depuis la date de spécification
                  jusqu'à la date de projection. En suivant régulièrement cette liste et en
                  mettant à jour votre spécification, vous pouvez atteindre la politique ZFJA.
                </p>
              </div>

              <div id="flux-impossible" className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm">
                <h3 className="text-base font-bold text-white">Flux impossible</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Une opération qui ferait passer un compte en solde négatif. Par exemple,
                  un retrait de 500 000 Ar sur un compte qui n'a que 100 000 Ar. Le système
                  détecte automatiquement ces situations et génère une alerte.
                </p>
              </div>
            </div>
          </Section>

          {/* Next steps */}
          <Reveal className="mt-12 mb-16">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/5 to-transparent p-8 text-center backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white">Prêt à commencer ?</h3>
              <p className="text-sm text-slate-400 max-w-lg">
                Vous avez maintenant toutes les clés pour utiliser Patrimoine.
                Créez votre premier fichier cas et lancez-vous !
              </p>
              <div className="flex gap-3">
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white"
                >
                  Revoir les fonctionnalités
                </Link>
                <button
                  onClick={() => navigate('/auth')}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
                >
                  Voir le code source
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
