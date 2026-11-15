import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectGallerySection } from './components/ProjectGallerySection';
import { RealTimeSiteUpdates } from './components/RealTimeSiteUpdates';
import { LeadershipSection } from './components/LeadershipSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  const [prefilledProjectContext, setPrefilledProjectContext] = useState<{
    title: string;
    location: string;
  } | null>(null);

  const handleRequestSimilarQuote = (title: string, location: string) => {
    setPrefilledProjectContext({ title, location });
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectGallerySection onRequestSimilarQuote={handleRequestSimilarQuote} />
        <RealTimeSiteUpdates />
        <LeadershipSection />
        <ContactSection prefilledProjectContext={prefilledProjectContext} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
