import { useState } from 'react';
import { Eye, EyeOff, GitBranch, ArrowRight, User, Mail, Lock } from 'lucide-react';
import Logo from '../components/Logo';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Veuillez entrer votre nom.');
      return;
    }

    window.open('https://github.com/hei-school/patrimoine', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-24 pb-16 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 mb-6">
            <GitBranch className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-300">Accès au dépôt source</span>
          </div>
          <div className="flex justify-center mb-4">
            <Logo size={48} />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin
              ? 'Connectez-vous pour accéder au dépôt Patrimoine sur GitHub.'
              : 'Créez un compte pour accéder au dépôt Patrimoine sur GitHub.'}
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-blue-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-blue-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02]"
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm text-slate-400 transition-colors hover:text-blue-300"
            >
              {isLogin ? (
                <>Pas encore de compte ? <span className="font-medium text-blue-300">Créer un compte</span></>
              ) : (
                <>Déjà un compte ? <span className="font-medium text-blue-300">Se connecter</span></>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Après connexion, vous serez redirigé vers le dépôt GitHub de Patrimoine.
        </p>
      </div>
    </div>
  );
}
