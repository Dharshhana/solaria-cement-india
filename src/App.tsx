import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HydrationCalculator from '@/components/HydrationCalculator';
import ProductMatrix from '@/components/ProductMatrix';
import TrustSustainability from '@/components/TrustSustainability';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        <HydrationCalculator />
        <ProductMatrix />
        <TrustSustainability />
      </main>
      <Footer />
    </div>
  );
}

export default App;
