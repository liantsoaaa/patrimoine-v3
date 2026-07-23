import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedMeshBackground from './components/AnimatedMeshBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import GuidePage from './pages/GuidePage';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <AnimatedMeshBackground />
        <Header />
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
