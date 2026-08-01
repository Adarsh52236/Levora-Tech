import { Loader } from '@/components/ui/loader'
import { PageProgress } from '@/components/ui/page-progress'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { SectionDivider } from '@/components/ui/section-divider'
import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Stats } from '@/components/sections/stats'
import { Process } from '@/components/sections/process'
import { Portfolio } from '@/components/sections/portfolio'
import { WhyChoose } from '@/components/sections/why-choose'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/layout/footer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <PageProgress />
      <Loader />
      <Navbar />
      <Hero />
      <SectionDivider variant="dots" />
      <About />
      <SectionDivider />
      <Services />
      <Stats />
      <SectionDivider variant="angle" />
      <Process />
      <Portfolio />
      <WhyChoose />
      <TestimonialsSection />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
