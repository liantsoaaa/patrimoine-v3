import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Shield, TrendingUp, RefreshCw, Globe, FileText, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { AGREGAT_LABELS, TypeAgregat } from '../types/patrimoine';

const CAPTURES = [
  { src: '/patrimoine-capture1.png', alt: 'Capture 1 - Vue d\'ensemble du patrimoine' },
  { src: '/patrimoine-capture2.png', alt: 'Capture 2 - Spécification du patrimoine' },
  { src: '/patrimoine-capture3.png', alt: 'Capture 3 - Graphes d\'évolution' },
  { src: '/patrimoine-capture4.png', alt: 'Capture 4 - Analyse des agrégats' },
  { src: '/patrimoine-capture5.png', alt: 'Capture 5 - Tableau de bord' },
];
const AUTO_INTERVAL = 4000;

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const total = CAPTURES.length;

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 'next' : 'prev');
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection('next');
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection('prev');
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next, current]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
        <div className="container-doc relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo with glow ring */}
            <div className="mt-8 flex justify-center animate-scale-in">
              <div className="relative float">
                <div className="absolute inset-0 -m-6 rounded-full bg-blue-500/20 blur-2xl animate-pulse-glow" />
                <div className="relative">
                  <Logo size={72} />
                </div>
              </div>
            </div>

            {/* Title with staggered reveal */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Votre richesse, ce n'est pas votre salaire.<br />
              <span className="text-gradient inline-block animate-fade-up delay-200">C'est votre patrimoine.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 leading-relaxed animate-fade-up delay-300 sm:text-lg">
              Décrivez, analysez et visualisez l'ensemble de vos possessions en une seule
              approche cohérente. Comptes, biens, dettes, créances — tout est modélisé
              pour vous donner une vision complète de votre situation financière.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 animate-fade-up delay-500 sm:flex-row">
              <Link
                to="/guide"
                className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
              >
                <BookOpen className="h-4 w-4" />
                Commencer maintenant
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/features"
                className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10 hover:text-white"
              >
                Explorer les fonctionnalités
              </Link>
            </div>
          </div>

          {/* Carousel auto-avancé avec captures */}
          <div className="mt-48 reveal revealed">
            <div className="capture-carousel relative mx-auto max-w-4xl">
              <div className="capture-stage relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
                {CAPTURES.map((cap, i) => (
                  <div
                    key={i}
                    className={`capture-slide ${i === current ? 'capture-slide-active' : ''} ${i < current || (i === 0 && current === total - 1 && direction === 'prev') ? 'capture-slide-prev' : ''}`}
                  >
                    <img
                      src={cap.src}
                      alt={cap.alt}
                      className="capture-img"
                      draggable={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/og-image.svg';
                      }}
                    />
                  </div>
                ))}
                {/* Overlay gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                {/* Label */}
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm">
                    Capture {current + 1} / {total}
                  </span>
                  <span className="text-xs text-slate-400">{CAPTURES[current].alt}</span>
                </div>
              </div>

              {/* Flèches navigation */}
              <button
                onClick={prev}
                className="capture-arrow capture-arrow-left"
                aria-label="Capture précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="capture-arrow capture-arrow-right"
                aria-label="Capture suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="mt-5 flex items-center justify-center gap-2.5">
                {CAPTURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`capture-dot ${i === current ? 'capture-dot-active' : ''}`}
                    aria-label={`Aller à la capture ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four features - clickable cards */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Vue d'ensemble</span>
          <h2 className="section-title">Quatre piliers pour maîtriser votre patrimoine</h2>
          <p className="section-subtitle mx-auto">
            Quatre fonctionnalités essentielles pour raisonner sur l'ensemble
            de vos possessions et anticiper leur évolution.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <Link
                to={f.link}
                className="card-float card-hover group block h-full p-6 no-underline"
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: f.color }}>
                  <Icon name={f.icon} size={32} />
                </div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: f.color }}>
                  Découvrir
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Aggregate types */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Modèle</span>
          <h2 className="section-title">Les trois agrégats de votre patrimoine</h2>
          <p className="section-subtitle mx-auto">
            Vos possessions sont organisées en trois grands groupes pour une
            analyse claire.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { agregat: TypeAgregat.TRESORERIE, title: 'Trésorerie', desc: 'L\'argent disponible immédiatement. Comptes courants, épargne, espèces. L\'agrégat le plus liquide — c\'est ce que vous pouvez utiliser tout de suite.' },
            { agregat: TypeAgregat.IMMOBILISATION, title: 'Immobilisations', desc: 'Vos biens matériels et immatériels. Maison, voiture, logiciel — avec une valeur économique mais moins liquides. Il faut les vendre ou les louer pour en tirer profit.' },
            { agregat: TypeAgregat.OBLIGATION, title: 'Obligations', desc: 'Ce que vous devez (dettes) et ce que les autres vous doivent (créances). Les dettes réduisent votre patrimoine, les créances l\'augmentent.' },
          ].map((item, i) => {
            const meta = AGREGAT_LABELS[item.agregat];
            return (
              <Reveal key={item.agregat} delay={i * 100}>
                <div className="card-float card-hover h-full p-6" style={{ borderColor: `${meta.color}30` }}>
                  <div className="mb-3" style={{ color: meta.color }}>
                    <Icon name={meta.icon} size={36} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold" style={{ color: meta.color }}>{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Pourquoi Patrimoine - Info section */}
      <section className="container-doc py-16">
        <Reveal className="mx-auto max-w-4xl">
          <div className="card-float p-8 sm:p-12" style={{ borderColor: 'rgba(223,164,8,0.15)' }}>
            <Reveal className="text-center">
              <span className="section-eyebrow" style={{ backgroundImage: 'linear-gradient(135deg, #dfa408, #f5cc5e)' }}>Pourquoi Patrimoine ?</span>
              <h2 className="section-title mt-4 text-3xl sm:text-4xl">Votre patrimoine mérite mieux qu'un tableur</h2>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_PATRIMOINE.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="flex gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: `${item.color}15`, color: item.color }}>
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 text-center">
              <Link
                to="/guide"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105"
              >
                Suivre le guide d'utilisation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </Reveal>
      </section>

    </div>
  );
}

const FEATURES = [
  {
    icon: 'clipboard-list',
    title: 'Spécifier',
    description: 'Décrivez votre patrimoine à un instant précis : comptes bancaires, biens matériels, dettes, créances et flux d\'argent récurrents.',
    color: '#3b82f6',
    link: '/guide#specifier-patrimoine',
  },
  {
    icon: 'trending-up',
    title: 'Projeter',
    description: 'Visualisez l\'évolution future de votre patrimoine sur une période donnée grâce à des graphiques configurables.',
    color: '#2563eb',
    link: '/guide#projeter-patrimoine',
  },
  {
    icon: 'refresh-cw',
    title: 'Recouper',
    description: 'Comparez les opérations planifiées avec celles réellement réalisées et ajustez votre spécification en conséquence.',
    color: '#fbbf24',
    link: '/guide#recouper-patrimoine',
  },
  {
    icon: 'alert-triangle',
    title: 'Alerter',
    description: 'Détectez automatiquement les flux impossibles : opérations qui feraient passer un compte en solde négatif.',
    color: '#f87171',
    link: '/guide#alerter-patrimoine',
  },
];

const WHY_PATRIMOINE = [
  { icon: Globe, title: 'Approche holistique', desc: 'Raisonnez sur l\'ensemble de vos possessions en une seule vue, pas fragmentée par compte.', color: '#60a5fa' },
  { icon: TrendingUp, title: 'Projections temporelles', desc: 'Visualisez l\'évolution de votre patrimoine sur les mois et années à venir.', color: '#2dd4bf' },
  { icon: Shield, title: 'Détection d\'alertes', desc: 'Soyez averti avant qu\'un compte ne passe en négatif grâce à la politique ZFI.', color: '#f43f7a' },
  { icon: RefreshCw, title: 'Recoupement réel', desc: 'Comparez votre plan avec la réalité et corrigez les écarts pour rester à jour (ZFJA).', color: '#fbbf24' },
  { icon: FileText, title: 'DSL dédié PatriLang', desc: 'Décrivez votre patrimoine en langage naturel, sans écrire de code Java.', color: '#a78bfa' },
  { icon: Zap, title: 'Gratuit et open-source', desc: 'Projet Java complet, libre et gratuit. Adaptez-le à vos besoins.', color: '#34d399' },
];
