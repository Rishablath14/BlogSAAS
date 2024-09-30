import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Hero } from "./components/frontend/Hero";
import PricingSection from "@/components/PriceTable";
import { AboutSection } from "./components/frontend/About";
import ContactSection from "./components/frontend/Contact";
import Footer from "./components/frontend/Footer";
import { requireUserDB } from "@/utils/requireUser";


export default async function Home() {
    const user = await requireUserDB();  
    return (
    <div className="max-w-7xl mx-auto">
      <Hero user={user}/>
      <AboutSection/>
      <PricingSection/>
      <ContactSection/>
      <Footer/>
    </div>
  );
}
