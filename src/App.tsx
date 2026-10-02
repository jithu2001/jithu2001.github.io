import { MotionConfig } from 'motion/react'
import { About } from './components/About'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { ProductThinking } from './components/ProductThinking'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Process />
        <Experience />
        <Projects />
        <Skills />
        <ProductThinking />
        <Contact />
      </main>
    </MotionConfig>
  )
}
