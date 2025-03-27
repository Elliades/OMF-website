/**
 * Main page for the OMF Vitrine website
 * Assembles all sections into a complete landing page
 */
import Navbar from "@/components/navbar";
import WhatsOMF from "@/components/sections/whats-omf";
import Core from "@/components/sections/core";
import Architecture from "@/components/sections/architecture";
import FeatureItems from "@/components/sections/feature-items";
import Library from "@/components/sections/library";
import FeatureLibrary from "@/components/sections/feature-library";
import TestFramework from "@/components/sections/test-framework";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main content with all sections */}
      <div className="pt-16"> {/* Add padding top to account for the navbar */}
        {/* Sections avec le pattern SVG alternent avec des sections à gradient */}
        {/* Les sections avec index 0, 2, 4, 6 auront des fonds unis/gradients */}
        {/* Les sections avec index 1, 3, 5, 7 auront des fonds avec pattern SVG */}
        <WhatsOMF index={1} /> {/* SVG pattern (purple corner) */}
        <Core index={2} /> {/* Gradient background */}
        <Architecture index={3} /> {/* SVG pattern (acid corner) */}
        <FeatureItems index={4} /> {/* Gradient background */}
        <Library index={5} /> {/* SVG pattern (orange corner) */}
        <FeatureLibrary index={6} /> {/* Gradient background */}
        <TestFramework index={7} /> {/* SVG pattern (purple corner again) */}
      </div>
      
      <Footer />
    </main>
  );
}
