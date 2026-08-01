import { Loader } from '@/components/ui/loader'
import { PageProgress } from '@/components/ui/page-progress'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { SectionDivider } from '@/components/ui/section-divider'
import { Navbar } from '@/components/layout/Navbar'
import { HeroSection } from '@/components/hero/HeroSection'
import { AboutSection } from '@/components/about/AboutSection'
import { ServicesSection } from '@/components/services/ServicesSection'
import { StatsSection } from '@/components/about/StatsSection'
import { ProcessSection } from '@/components/process/ProcessSection'
import { PortfolioSection } from '@/components/portfolio/PortfolioSection'
import { WhyChooseSection } from '@/components/about/WhyChooseSection'
import { TestimonialsSection } from '@/components/testimonials/TestimonialsSection'
import { ContactSection } from '@/components/contact/ContactSection'
import { Footer } from '@/components/footer/Footer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <PageProgress />
      <Loader />
      <Navbar />
      <HeroSection />
      <SectionDivider variant="dots" />
      <AboutSection />
      <SectionDivider />
      <ServicesSection />
      <StatsSection />
      <SectionDivider variant="angle" />
      <ProcessSection />
      <PortfolioSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
