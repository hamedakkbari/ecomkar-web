import Hero from "../components/hero/Hero";
import Highlights from "../components/sections/Highlights";
import HowItWorks from "../components/sections/HowItWorks";
import Services from "../components/sections/Services";
import CoursePromo from "../components/sections/CoursePromo";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import FinalCTA from "../components/sections/FinalCTA";
import Footer from "../components/footer/Footer";
import "../styles/hero.css";
import "../styles/sections.css";
import "../styles/footer.css";
import StarsBackground from "../components/hero/StarsBackground";

export default function Home() {
  return (
    <>
      <StarsBackground />
      <Hero />
      <Highlights />
      <HowItWorks />
      <Services />
      <CoursePromo />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
