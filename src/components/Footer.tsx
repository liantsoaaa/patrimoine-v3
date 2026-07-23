import { useState } from 'react';
import { GitBranch, BookOpen, Send, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-jtr-mint/20 bg-jtr-mint/5 p-4 text-sm text-jtr-mint">
        <CheckCircle2 className="h-4 w-4" />
        Message envoyé ! Nous vous répondrons bientôt.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Votre nom"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <input
        type="email"
        placeholder="Votre email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <textarea
        placeholder="Votre message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
        rows={3}
        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-blue-400/50 focus:bg-white/[0.07]"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02]"
      >
        <Send className="h-3.5 w-3.5" />
        Envoyer
      </button>
    </form>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-ink-950/50">
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[600px] -translate-x-1/2 rounded-full blur-[100px] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)' }}
      />
      <div className="container-doc relative py-12">
        {/* Main content grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="text-sm font-bold text-white">Patrimoine</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-400 leading-relaxed">
              Décrivez, analysez et visualisez votre patrimoine
              avec une approche holistique.
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Documentation
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/features" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/guide" className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  Guide d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ressources
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <button
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-300"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  Dépôt source
                </button>
              </li>
              <li>
                <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-blue-300">
                  Accueil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact form */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </h4>
            <div className="mt-3">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            Documentation Patrimoine · Contenu issu du projet source
          </p>
          <p className="font-mono text-xs text-slate-600">
            Conçu pour inspirer et faciliter votre navigation
          </p>
        </div>
      </div>
    </footer>
  );
}
