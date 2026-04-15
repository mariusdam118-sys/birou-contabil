import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CategoryBar from "@/components/CategoryBar";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <CategoryBar />
      <About />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
