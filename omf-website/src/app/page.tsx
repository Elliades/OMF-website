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
        <WhatsOMF index={1} />
        <Core index={2} />
        <Architecture index={3} />
        <FeatureItems index={4} />
        <Library index={5} />
        <FeatureLibrary index={6} />
        <TestFramework index={7} />
      </div>
      
      <Footer />
    </main>
  );
}
