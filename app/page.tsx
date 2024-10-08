import { Hero } from "./components/frontend/Hero";
import PricingSection from "@/components/PriceTable";
import { AboutSection } from "./components/frontend/About";
import ContactSection from "./components/frontend/Contact";
import Footer from "./components/frontend/Footer";
import Navbar from "@/components/Navbar";


export default async function Home() {
    return (
    <div className="max-w-full mx-auto">
      <Navbar/>
      <Hero/>
      <AboutSection/>
      <PricingSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
