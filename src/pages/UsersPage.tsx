import { BookOpen, Package, PlusCircle, Layers } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import Section from '../components/Section';
import Sidebar, { type TocItem } from '../components/Sidebar';
import Callout from '../components/Callout';

const toc: TocItem[] = [
  { id: 'intro', label: 'Qu\'est-ce que Patrimoine' },
  { id: 'demarrer', label: 'Démarrer avec la librairie' },
  { id: 'installation', label: 'Installation & Maven' },
  { id: 'creer', label: 'Créer Personne & Patrimoine' },
  { id: 'ajouter', label: 'Ajouter des possessions' },
  { id: 'types', label: 'Types de possessions' },
  { id: 'projeter', label: 'Projeter dans le futur' },
  { id: 'famille', label: 'Exemple : famille malgache' },
  { id: 'alertes', label: 'Lire les alertes' },
  { id: 'visualiseur', label: 'Visualiseur Swing' },
];

export default function UsersPage() {
  return (
    <div className="container-doc animate-fade-in pt-24">
      <div className="flex gap-10">
        <Sidebar items={toc} title="Page 1 · Sommaire" />
        <div className="min-w-0 flex-1 max-w-3xl">
          <div className="relative mb-4">
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="section-eyebrow">
                  <BookOpen className="h-4 w-4" />
                  Page 1
                </span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Pour les futurs utilisateurs
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
                Ce guide vous accompagne, de la découverte de Patrimoine jusqu'à la
                projection de votre patrimoine dans le futur. Aucune connaissance
                de l'architecture interne n'est nécessaire.
              </p>
            </div>
          </div>

          <Section id="intro" eyebrow="Concept" title="Qu'est-ce que Patrimoine ?">
            <p>
              <strong>Patrimoine</strong> est une librairie Java qui permet de
              modéliser l'ensemble du patrimoine financier d'une personne ou
              d'une famille, puis de le <strong>projeter dans le temps</strong>.
              Elle répond à un problème simple mais difficile à résoudre à la main :
              <em> combien vaudra mon patrimoine dans 5, 10 ou 30 ans, en tenant
              compte des revenus, des dépenses, de l'inflation et de la
              dépréciation des biens ?</em>
            </p>
            <p>
              Plutôt que d'utiliser un tableur fragile et non typé, Patrimoine
              propose un <strong>modèle objet rigoureux</strong> où chaque
              possession (compte, bien matériel, dette, créance) est une entité
              à part entière, capable de calculer sa propre valeur future.
            </p>
            <Callout variant="info" title="Le problème résolu">
              Patrimoine centralise la description d'un patrimoine, automatise
              les calculs de projection et détecte les situations impossibles
              (flux négatif sur un compte non autorisé, par exemple) au moyen
              d'alertes lisibles.
            </Callout>
          </Section>

          <Section id="demarrer" eyebrow="Premiers pas" title="Démarrer avec la librairie">
            <p>
              Patrimoine se présente comme une dépendance Java que vous ajoutez
              à votre projet. Une fois installée, vous pouvez décrire un
              patrimoine en quelques lignes de code, puis le projeter à la
              date de votre choix.
            </p>
            <p>Le flux de travail typique est le suivant :</p>
            <ul>
              <li>Créer une <strong>Personne</strong> (le titulaire du patrimoine).</li>
              <li>Créer un <strong>Patrimoine</strong> rattaché à cette personne.</li>
              <li><strong>Ajouter des possessions</strong> (comptes, biens, dettes, créances).</li>
              <li><strong>Projeter</strong> le patrimoine à une date future.</li>
              <li><strong>Lire les alertes</strong> générées par la projection.</li>
            </ul>
          </Section>

          <Section id="installation" eyebrow="Setup" title="Installation et dépendance Maven">
            <p>
              Patrimoine est distribué sous forme d'artefact Maven. Ajoutez la
              dépendance suivante dans le <code className="inline-code">pom.xml</code>{' '}
              de votre projet :
            </p>
            <CodeBlock
              filename="pom.xml"
              language="xml"
              code={`<dependency>
    <groupId>fr.patrimoine</groupId>
    <artifactId>patrimoine-core</artifactId>
    <version>1.0.0</version>
</dependency>`}
            />
            <p>
              Si vous utilisez Gradle, l'équivalent est :
            </p>
            <CodeBlock
              filename="build.gradle"
              language="groovy"
              code={`implementation 'fr.patrimoine:patrimoine-core:1.0.0'`}
            />
            <Callout variant="tip" title="Pré-requis">
              Patrimoine nécessite Java 17 ou supérieur. Aucune autre dépendance
              n'est à gérer manuellement : Maven récupère tout le nécessaire.
            </Callout>
          </Section>

          <Section id="creer" eyebrow="Modèle de base" title="Créer une Personne et un Patrimoine">
            <p>
              La première étape consiste à créer la <strong>Personne</strong> qui
              possède le patrimoine, puis à lui rattacher un objet{' '}
              <strong>Patrimoine</strong>.
            </p>
            <CodeBlock
              filename="Main.java"
              code={`import fr.patrimoine.model.Personne;
import fr.patrimoine.model.Patrimoine;

public class Main {
    public static void main(String[] args) {
        // 1. Créer la personne titulaire
        Personne rakoto = new Personne("Rakoto");

        // 2. Créer un patrimoine pour cette personne
        Patrimoine patrimoine = new Patrimoine(rakoto);

        System.out.println("Patrimoine créé pour " + rakoto.getNom());
    }
}`}
            />
            <p>
              Un <strong>Patrimoine</strong> est initialement vide. Il devient
              utile dès que vous lui ajoutez des possessions.
            </p>
          </Section>

          <Section id="ajouter" eyebrow="Possessions" title="Ajouter des possessions">
            <p>
              Une possession est tout élément qui a une valeur monétaire et qui
              appartient au patrimoine : un compte bancaire, un bien matériel,
              une dette ou une créance. On les ajoute via la méthode{' '}
              <code className="inline-code">ajouterPossession()</code>.
            </p>
            <CodeBlock
              filename="AjoutPossessions.java"
              code={`import fr.patrimoine.model.*;
import java.time.LocalDate;

// Compte bancaire avec un solde initial
Compte compteCourant = new Compte("Compte courant BNI", 2_000_000);

// Bien matériel qui se déprécie de 10% par an
Materiel voiture = new Materiel("Toyota Hilux", 15_000_000, -0.10);

// Dette à rembourser
Dette pretBancaire = new Dette("Prêt habitat", 5_000_000);

// Créance à recevoir
Creance salaireEnAttente = new Creance("Salaire mars", 1_200_000);

patrimoine.ajouterPossession(compteCourant);
patrimoine.ajouterPossession(voiture);
patrimoine.ajouterPossession(pretBancaire);
patrimoine.ajouterPossession(salaireEnAttente);`}
            />
            <Callout variant="info" title="Valeur nette">
              La valeur nette du patrimoine est la somme des possessions
              positives (comptes, matériels, créances) <strong>moins</strong>{' '}
              la somme des dettes. Patrimoine calcule ce total automatiquement.
            </Callout>
          </Section>

          <Section id="types" eyebrow="Référence" title="Les types de possessions">
            <p>
              Patrimoine définit cinq grands types de possessions, chacun avec
              son propre comportement de projection.
            </p>
            <div className="my-6 grid gap-4 sm:grid-cols-2">
              {possessionTypes.map((t) => (
                <div key={t.name} className="card card-hover p-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.bg} border ${t.border}`}>
                      <t.icon className={`h-5 w-5 ${t.color}`} />
                    </div>
                    <code className="font-mono text-sm font-semibold text-white">{t.name}</code>
                  </div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{t.desc}</p>
                  <p className="mt-2 text-xs text-slate-600">{t.example}</p>
                </div>
              ))}
            </div>
            <h3>FluxArgent : un cas particulier</h3>
            <p>
              <strong>FluxArgent</strong> représente un flux d'argent récurrent
              (un salaire mensuel, un loyer, une pension) rattaché à un compte.
              Il augmente ou diminue le solde du compte à chaque période de
              projection. C'est lui qui donne vie au modèle : sans flux, le
              patrimoine est statique.
            </p>
            <CodeBlock
              filename="FluxArgentExemple.java"
              code={`// Un salaire mensuel de 1 200 000 Ar versé sur le compte courant
FluxArgent salaire = new FluxArgent(
    "Salaire mensuel",
    compteCourant,       // compte impacté
    1_200_000,           // montant
    1,                   // jour du mois
    LocalDate.now(),
    LocalDate.now().plusYears(5)
);

// Un loyer mensuel de 400 000 Ar
FluxArgent loyer = new FluxArgent(
    "Loyer",
    compteCourant,
    -400_000,
    5,
    LocalDate.now(),
    LocalDate.now().plusYears(5)
);

patrimoine.ajouterFlux(salaire);
patrimoine.ajouterFlux(loyer);`}
            />
          </Section>

          <Section id="projeter" eyebrow="Simulation" title="Projeter dans le futur">
            <p>
              La projection est le cœur fonctionnel de la librairie. Elle
              calcule la valeur de chaque possession à une date future, en
              appliquant les règles propres à chaque type :
            </p>
            <ul>
              <li><strong>Compte</strong> : le solde évolue selon les flux d'argent qui le traversent.</li>
              <li><strong>Materiel</strong> : la valeur évolue selon le taux de dépréciation (négatif = perte annuelle).</li>
              <li><strong>Dette</strong> : le capital restant dû diminue selon le rythme de remboursement.</li>
              <li><strong>Creance</strong> : la valeur est actualisée ou reçue à l'échéance.</li>
              <li><strong>FluxArgent</strong> : chaque occurrence entre aujourd'hui et la date cible est appliquée.</li>
            </ul>
            <CodeBlock
              filename="ProjectionExemple.java"
              code={`import java.time.LocalDate;

// Projeter le patrimoine dans 10 ans
Patrimoine futur = patrimoine.projeter(LocalDate.now().plusYears(10));

System.out.println("Valeur nette actuelle : " + patrimoine.getValeurNette());
System.out.println("Valeur nette dans 10 ans : " + futur.getValeurNette());

// Lister les alertes détectées
futur.getAlertes().forEach(a -> System.out.println(a.getMessage()));`}
            />
            <Callout variant="success" title="Résultat attendu">
              Vous obtenez un nouvel objet <code className="inline-code">Patrimoine</code>{' '}
              représentant l'état projeté. Vous pouvez l'inspecter, l'afficher
              ou le comparer au patrimoine actuel.
            </Callout>
          </Section>

          <Section id="famille" eyebrow="Cas concret" title="Une famille malgache en exemple">
            <p>
              Pour illustrer l'usage de la librairie, prenons le cas d'une
              famille malgache typique. <strong>Rakoto</strong> et{' '}
              <strong>Rasoa</strong> sont mariés. Rakoto possède un compte
              courant, un compte épargne, une voiture et un prêt habitat.
              Rasoa perçoit un salaire et verse une pension à sa mère.
            </p>
            <CodeBlock
              filename="FamilleMalgache.java"
              code={`Personne rakoto = new Personne("Rakoto");
Personne rasoa  = new Personne("Rasoa");

Patrimoine patrimoineFamille = new Patrimoine(rakoto);
patrimoineFamille.ajouterConjoint(rasoa);

// Comptes
Compte ccBNI = new Compte("CC BNI", 3_000_000);
Compte epargne = new Compte("Épargne BMOI", 5_500_000);

// Biens
Materiel voiture = new Materiel("Hilux", 15_000_000, -0.10);
Materiel terrain = new Materiel("Terrain Tananarive", 40_000_000, 0.05);

// Dettes
Dette pret = new Dette("Prêt habitat", 12_000_000);

// Flux mensuels
FluxArgent salaireRakoto = new FluxArgent("Salaire Rakoto", ccBNI,
    1_500_000, 1, LocalDate.now(), LocalDate.now().plusYears(15));
FluxArgent salaireRasoa = new FluxArgent("Salaire Rasoa", ccBNI,
    900_000, 1, LocalDate.now(), LocalDate.now().plusYears(15));
FluxArgent pension = new FluxArgent("Pension belle-mère", ccBNI,
    -200_000, 10, LocalDate.now(), LocalDate.now().plusYears(15));
FluxArgent remboursement = new FluxArgent("Remboursement prêt", ccBNI,
    -500_000, 5, LocalDate.now(), LocalDate.now().plusYears(15));

patrimoineFamille.ajouterPossession(ccBNI);
patrimoineFamille.ajouterPossession(epargne);
patrimoineFamille.ajouterPossession(voiture);
patrimoineFamille.ajouterPossession(terrain);
patrimoineFamille.ajouterPossession(pret);
patrimoineFamille.ajouterFlux(salaireRakoto);
patrimoineFamille.ajouterFlux(salaireRasoa);
patrimoineFamille.ajouterFlux(pension);
patrimoineFamille.ajouterFlux(remboursement);

// Projection à 15 ans
Patrimoine futur = patrimoineFamille.projeter(LocalDate.now().plusYears(15));`}
            />
            <Callout variant="tip" title="Pourquoi cet exemple">
              Cet exemple reflète la réalité malgache : comptes en Ariary,
              biens qui se déprécient (voiture) ou s'apprécient (terrain),
              et obligations familiales (pension). Il montre que Patrimoine
              gère aussi bien un individu qu'un couple.
            </Callout>
          </Section>

          <Section id="alertes" eyebrow="Sécurité" title="Lire les alertes">
            <p>
              Lors d'une projection, Patrimoine peut détecter des situations
              <strong> impossibles</strong> — par exemple un flux d'argent qui
              ferait passer un compte en solde négatif alors que ce compte ne
              l'autorise pas. Ces situations génèrent des{' '}
              <strong>alertes</strong>.
            </p>
            <CodeBlock
              filename="LectureAlertes.java"
              code={`Patrimoine futur = patrimoine.projeter(dateFuture);

for (Alerte a : futur.getAlertes()) {
    System.out.println("[" + a.getNiveau() + "] " + a.getMessage());
    // Exemple de sortie :
    // [IMPOSSIBLE] Flux "Loyer" du 2027-03-05 impossible :
    //   solde du compte "CC BNI" deviendrait négatif (-150 000 Ar)
}`}
            />
            <p>
              Les alertes sont classées par niveau de gravité :
            </p>
            <div className="my-4 space-y-2">
              {alertLevels.map((a) => (
                <div key={a.level} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <span className={`mt-0.5 inline-block rounded px-2 py-0.5 text-xs font-bold ${a.badge}`}>
                    {a.level}
                  </span>
                  <p className="text-sm text-slate-400">{a.desc}</p>
                </div>
              ))}
            </div>
            <Callout variant="warning" title="Flux impossible">
              Une alerte de type <strong>IMPOSSIBLE</strong> signifie que la
              projection a quand lieu, mais que le flux concerné a été{' '}
              <em>ignoré</em> à la date indiquée. Le solde du compte n'a pas
              été modifié à ce moment-là. Vérifiez vos paramètres ou la date
              de fin du flux.
            </Callout>
          </Section>

          <Section id="visualiseur" eyebrow="Interface" title="Le visualiseur Swing">
            <p>
              Patrimoine fournit un <strong>visualiseur Swing</strong> qui
              permet d'explorer un patrimoine et ses projections sans écrire
              de code d'affichage. Il est particulièrement utile pour
              présenter un cas concret à un utilisateur non développeur.
            </p>
            <CodeBlock
              filename="VisualiseurDemo.java"
              code={`import fr.patrimoine.visualiseur.VisualiseurPatrimoine;

// Ouvrir le visualiseur sur un patrimoine existant
VisualiseurPatrimoine.afficher(patrimoineFamille, "Famille Rakoto & Rasoa");

// Afficher une projection côte à côte
VisualiseurPatrimoine.afficher(
    patrimoineFamille,
    patrimoineFamille.projeter(LocalDate.now().plusYears(15)),
    "Comparaison présent / +15 ans"
);`}
            />
            <p>
              Le visualiseur présente :
            </p>
            <ul>
              <li>La <strong>liste des possessions</strong> avec leur valeur actuelle et projetée.</li>
              <li>Un <strong>graphique d'évolution</strong> de la valeur nette dans le temps.</li>
              <li>Le <strong>détail des flux</strong> appliqués mois par mois.</li>
              <li>Les <strong>alertes</strong> mises en évidence avec un code couleur.</li>
            </ul>
            <Callout variant="info" title="Lancement">
              Le visualiseur s'ouvre dans une fenêtre Swing standard. Aucune
              configuration supplémentaire n'est nécessaire sur un poste
              équipé de Java.
            </Callout>
          </Section>
        </div>
      </div>
    </div>
  );
}

const possessionTypes = [
  {
    icon: Layers,
    name: 'Compte',
    desc: 'Un compte bancaire ou de caisse. Son solde évolue via les FluxArgent qui lui sont rattachés.',
    example: 'new Compte("CC BNI", 2_000_000)',
    color: 'text-accent-300',
    bg: 'bg-accent-400/10',
    border: 'border-accent-400/20',
  },
  {
    icon: PlusCircle,
    name: 'FluxArgent',
    desc: 'Un flux d\'argent récurrent (salaire, loyer, pension) appliqué à un compte à intervalle régulier.',
    example: 'new FluxArgent("Salaire", compte, 1_200_000, ...)',
    color: 'text-jtr-cyan',
    bg: 'bg-jtr-cyan/10',
    border: 'border-jtr-cyan/20',
  },
  {
    icon: Package,
    name: 'Materiel',
    desc: 'Un bien matériel dont la valeur évolue selon un taux annuel (négatif = dépréciation, positif = appreciation).',
    example: 'new Materiel("Hilux", 15_000_000, -0.10)',
    color: 'text-school-400',
    bg: 'bg-school-400/10',
    border: 'border-school-400/20',
  },
  {
    icon: PlusCircle,
    name: 'Dette',
    desc: 'Une somme due qui réduit la valeur nette. Elle diminue avec le temps selon le rythme de remboursement.',
    example: 'new Dette("Prêt habitat", 5_000_000)',
    color: 'text-jtr-rose',
    bg: 'bg-jtr-rose/10',
    border: 'border-jtr-rose/20',
  },
  {
    icon: PlusCircle,
    name: 'Creance',
    desc: 'Une somme à recevoir qui augmente la valeur nette. Elle est actualisée ou encaissée à l\'échéance.',
    example: 'new Creance("Salaire en attente", 1_200_000)',
    color: 'text-jtr-mint',
    bg: 'bg-jtr-mint/10',
    border: 'border-jtr-mint/20',
  },
];

const alertLevels = [
  {
    level: 'IMPOSSIBLE',
    badge: 'bg-jtr-rose/20 text-jtr-rose border border-jtr-rose/30',
    desc: 'Un flux ne peut pas être appliqué (ex. solde négatif non autorisé). Le flux est ignoré à cette date.',
  },
  {
    level: 'AVERTISSEMENT',
    badge: 'bg-school-400/20 text-school-400 border border-school-400/30',
    desc: 'Une situation délicate mais techniquement possible (ex. dette qui dépasse la valeur des actifs).',
  },
  {
    level: 'INFO',
    badge: 'bg-accent-400/20 text-accent-300 border border-accent-400/30',
    desc: 'Une information utile sur le déroulement de la projection (ex. flux arrivant à échéance).',
  },
];
