import { motion, useReducedMotion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Portfolio } from '@/components/Portfolio'
import { Services } from '@/components/Services'
import { Testimonials } from '@/components/Testimonials'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function App() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}
