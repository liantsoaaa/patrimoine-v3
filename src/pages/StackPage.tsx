import { Code2, FileCode2, Boxes, Database, Network } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';

const toc: TocItem[] = [
  { id: 'architecture', label: 'Architecture globale' },
  { id: 'patrilang', label: 'PatriLang & ANTLR' },
  { id: 'modele', label: 'Modèle objet' },
  { id: 'fec', label: 'Module FEC & PCG' },
  { id: 'recoupement', label: 'Système de recoupement' },
];

export default function StackPage() {
  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Page 2 · Sommaire" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow">
                  <Code2 className="h-4 w-4" />
                  Page 2
                </span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Stack technique
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                Plongée dans l'architecture interne de Patrimoine : le DSL
                PatriLang, la grammaire ANTLR, le modèle objet et le module FEC.
              </p>
            </div>
          </div>

          <Section id="architecture" eyebrow="Vue d'ensemble" title="Architecture globale du projet">
            <p>
              Patrimoine est organisé en <strong>couches distinctes</strong>,
              chacune avec une responsabilité claire. Cette séparation permet
              de faire évoluer le DSL, le modèle ou l'export comptable de façon
              indépendante.
            </p>
            <div className="my-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="space-y-3">
                {archLayers.map((layer, i) => (
                  <div key={layer.name}>
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                      <span className="font-mono text-xs text-slate-600">{i + 1}</span>
                      <layer.icon className={`h-5 w-5 ${layer.color}`} />
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-white">{layer.name}</span>
                        <span className="ml-2 text-xs text-slate-500">— {layer.desc}</span>
                      </div>
                    </div>
                    {i < archLayers.length - 1 && (
                      <div className="ml-7 h-3 w-px bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p>
              Le flux de données traverse ces couches de haut en bas : un
              fichier <strong>PatriLang</strong> est parsé par l'analyseur
              ANTLR, transpilé en objets Java du <strong>modèle</strong>,
              éventuellement recoupé avec des données <strong>FEC</strong>,
              puis projeté et visualisé.
            </p>
          </Section>

          <Section id="patrilang" eyebrow="DSL" title="PatriLang, le DSL et la grammaire ANTLR">
            <p>
              <strong>PatriLang</strong> est un langage dédié (DSL) qui permet
              de décrire un patrimoine de façon <strong>déclarative</strong>,
              sans écrire de code Java. Il est pensé pour être lisible par un
              utilisateur métier tout en restant précis.
            </p>
            <h3>La grammaire ANTLR</h3>
            <p>
              PatriLang est défini par une grammaire <strong>ANTLR4</strong>.
              ANTLR génère un lexer et un parser à partir d'un fichier{' '}
              <code className="inline-code">.g4</code>, ce qui garantit une
              analyse robuste et extensible du langage.
            </p>
            <CodeBlock
              filename="PatriLang.g4"
              language="antlr"
              code={`grammar PatriLang;

document   : personne+ EOF ;
personne   : 'personne' STRING '{' patrimoine? '}' ;
patrimoine : 'patrimoine' '{' possession* '}' ;
possession : compte | materiel | dette | creance | flux ;

compte     : 'compte' STRING '=' montant ;
materiel   : 'materiel' STRING '=' montant ('taux' SIGN? PCT)? ;
dette      : 'dette' STRING '=' montant ;
creance    : 'creance' STRING '=' montant ;
flux       : 'flux' STRING '->' STRING '{' fluxBody* '}' ;
fluxBody   : 'montant' '=' montant
           | 'jour' '=' INT
           | 'de' DATE 'a' DATE ;

montant    : INT ('_' INT)* ;
SIGN       : '+' | '-' ;
PCT        : [0-9]+ '%' ;
STRING     : '"' ~'"'* '"' ;
DATE       : [0-9]+ '-' [0-9]+ '-' [0-9]+ ;
INT        : [0-9]+ ;
WS         : [ \\t\\r\\n]+ -> skip ;`}
            />
            <Callout variant="info" title="Avantage du DSL">
              PatriLang permet à un utilisateur non développeur de décrire un
              patrimoine complet dans un fichier texte versionnable, sans
              toucher au code Java. Le transpileur garantit que le résultat est
              un modèle objet valide.
            </Callout>
          </Section>

          <Section id="modele" eyebrow="Domaine" title="Le modèle objet">
            <p>
              Le modèle objet est le cœur de la librairie. Il définit les
              entités manipulées par Patrimoine et leurs relations.
            </p>
            <div className="my-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-xl border border-accent-400/40 bg-accent-400/10 px-6 py-2.5">
                  <code className="font-mono text-sm font-semibold text-accent-300">Possession</code>
                  <span className="ml-2 text-xs text-slate-500">« abstraite »</span>
                </div>
                <div className="h-4 w-px bg-gradient-to-b from-accent-400/40 to-white/10" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {['Compte', 'FluxArgent', 'Materiel', 'Dette', 'Creance'].map((cls) => (
                    <div key={cls} className="rounded-lg border border-white/10 bg-ink-900/60 px-3 py-2 text-center transition-all duration-300 hover:border-jtr-cyan/30 hover:bg-jtr-cyan/5">
                      <code className="font-mono text-xs font-semibold text-jtr-cyan">{cls}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3>Patrimoine</h3>
            <p>
              L'objet <strong>Patrimoine</strong> est le conteneur racine. Il
              est rattaché à une <strong>Personne</strong> (et optionnellement
              à un conjoint) et agrège l'ensemble des possessions. C'est lui
              qui orchestre la projection.
            </p>
            <h3>Personne</h3>
            <p>
              Une <strong>Personne</strong> est le titulaire du patrimoine.
              Elle porte un nom et peut être associée à un conjoint pour
              représenter un patrimoine familial.
            </p>
            <h3>Possession et sous-types</h3>
            <p>
              <strong>Possession</strong> est la classe abstraite dont
              héritent tous les types d'actifs et de passifs. Chaque sous-type
              implémente sa propre logique de projection via la méthode{' '}
              <code className="inline-code">projeter(LocalDate)</code>.
            </p>
            <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-4 py-2.5 text-left font-semibold text-white">Classe</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-white">Rôle</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-white">Projection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {modelClasses.map((c) => (
                    <tr key={c.name} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-4 py-2.5"><code className="font-mono text-jtr-cyan">{c.name}</code></td>
                      <td className="px-4 py-2.5 text-slate-400">{c.role}</td>
                      <td className="px-4 py-2.5 text-slate-400">{c.proj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="fec" eyebrow="Comptabilité" title="Le module FEC et le Plan Comptable Général">
            <p>
              Le <strong>module FEC</strong> (Fichier des Écritures Comptables)
              fait le lien entre Patrimoine et le <strong>Plan Comptable
              Général</strong> (PCG). Il permet d'importer des écritures
              comptables réelles et de les recouper avec le modèle objet.
            </p>
            <p>Concrètement, le module FEC :</p>
            <ul>
              <li><strong>Parse</strong> un fichier FEC au format officiel (txt ou csv).</li>
              <li>Associe chaque écriture à un <strong>compte du PCG</strong> par son numéro.</li>
              <li>Met en regard ces écritures avec les <strong>possessions</strong> du patrimoine.</li>
              <li>Identifie les <strong>écarts</strong> entre la valeur comptable et la valeur modélisée.</li>
            </ul>
            <Callout variant="tip" title="Intérêt du recoupement">
              Le recoupement FEC permet de <strong>valider</strong> le modèle
              contre la réalité comptable. Un écart important signale soit une
              erreur de modélisation, soit une écriture comptable à vérifier.
            </Callout>
          </Section>

          <Section id="recoupement" eyebrow="Contrôle" title="Le système de recoupement : ZFJA, ZFI">
            <p>
              Au-delà du FEC, Patrimoine met en œuvre un système de
              <strong> recoupement</strong> basé sur des zones comptables
              spécifiques : <strong>ZFJA</strong> et <strong>ZFI</strong>.
              Ces zones correspondent à des regroupements de comptes du PCG
              qui permettent une vérification croisée à un niveau agrégé.
            </p>
            <div className="my-5 grid gap-4 sm:grid-cols-2">
              <div className="card card-hover p-5">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-jtr-cyan" />
                  <code className="font-mono text-sm font-semibold text-white">ZFJA</code>
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Zone de recoupement portant sur les flux journaliers
                  d'activité. Elle agrège les écritures de mouvement (achats,
                  ventes, charges) pour les comparer aux flux modélisés.
                </p>
              </div>
              <div className="card card-hover p-5">
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-jtr-cyan" />
                  <code className="font-mono text-sm font-semibold text-white">ZFI</code>
                </div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Zone de recoupement portant sur les flux d'investissement.
                  Elle met en regard les investissements modélisés et les
                  écritures comptables correspondantes du FEC.
                </p>
              </div>
            </div>
            <p>Le recoupement fonctionne en trois étapes :</p>
            <ul>
              <li><strong>Extraction</strong> des agrégats ZFJA et ZFI depuis le FEC.</li>
              <li><strong>Calcul</strong> des agrégats équivalents depuis le modèle Patrimoine.</li>
              <li><strong>Comparaison</strong> et génération d'un rapport d'écarts.</li>
            </ul>
            <Callout variant="info" title="Double contrôle">
              ZFJA contrôle la cohérence des <strong>opérations courantes</strong>,
              tandis que ZFI contrôle celle des <strong>investissements</strong>.
              Ensemble, ils couvrent l'ensemble du patrimoine.
            </Callout>
          </Section>

        </div>
      </div>
    </div>
  );
}

const archLayers = [
  { icon: FileCode2, name: 'PatriLang (DSL)', desc: 'description déclarative du patrimoine', color: 'text-jtr-violet' },
  { icon: Code2, name: 'ANTLR Parser', desc: 'lexer + parser générés depuis la grammaire', color: 'text-jtr-cyan' },
  { icon: Boxes, name: 'Transpileur', desc: 'arbre syntaxique → objets Java', color: 'text-school-400' },
  { icon: Database, name: 'Modèle objet', desc: 'Personne, Patrimoine, Possession', color: 'text-accent-300' },
  { icon: Network, name: 'Module FEC', desc: 'recoupement avec le PCG (ZFJA, ZFI)', color: 'text-jtr-mint' },
];

const modelClasses = [
  { name: 'Compte', role: 'Compte bancaire ou de caisse', proj: 'Solde évolue via FluxArgent' },
  { name: 'FluxArgent', role: 'Flux récurrent sur un compte', proj: 'Appliqué à chaque période' },
  { name: 'Materiel', role: 'Bien matériel tangible', proj: 'Valeur × (1 + taux)^années' },
  { name: 'Dette', role: 'Somme due (passif)', proj: 'Capital restant diminue' },
  { name: 'Creance', role: 'Somme à recevoir (actif)', proj: 'Actualisée ou encaissée' },
];

