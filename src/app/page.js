import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import CategoryBar from '@/components/CategoryBar'
import Services from '@/components/Services'
import About from '@/components/About'
import Process from '@/components/Process'
import CtaBand from '@/components/CtaBand'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsStrip />
      <CategoryBar />
      <Services />
      <About />
      <Process />
      <CtaBand />
      <Contact />
      <Footer />
    </main>
  )
}
