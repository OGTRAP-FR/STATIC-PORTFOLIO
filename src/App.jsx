import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroImageRef = useRef(null)
  const heroContainerRef = useRef(null)

  useEffect(() => {
    // HEADER SCROLL EFFECT
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // REVEAL ANIMATION ON SCROLL
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal')
          }, index * 100)
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.section, .skill-card, .contact-card, .container h2')
    revealElements.forEach(el => {
      el.classList.add('reveal-hidden')
      observer.observe(el)
    })

    // MOUSE MOVE EFFECT FOR HERO IMAGE
    const handleMouseMove = (e) => {
      if (!heroImageRef.current || !heroContainerRef.current) return

      const rect = heroContainerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      heroImageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    }

    const handleMouseLeave = () => {
      if (!heroImageRef.current) return
      heroImageRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
    }

    const heroContainer = heroContainerRef.current
    if (heroContainer) {
      heroContainer.addEventListener('mousemove', handleMouseMove)
      heroContainer.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (heroContainer) {
        heroContainer.removeEventListener('mousemove', handleMouseMove)
        heroContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className={`${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <nav>
          <div className="logo" onClick={scrollToTop}>
            <img src="/resources/trap.ico" alt="Icon" className="header-icon" />
            TRAP
          </div>

          <div className={`nav-links-container ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>ABOUT /></a></li>
              <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>SKILLS /></a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT /></a></li>
              <li><a href="https://github.com/oGTRAP-JS" target="_blank" rel="noopener noreferrer">GITHUB /></a></li>
            </ul>
          </div>

          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-content">
            <h1 className="blur-text">TRAP</h1>
            <p className="subtitle">CREATIVE DEVELOPER & DESIGNER</p>
            <div className="hero-image" ref={heroContainerRef}>
              <img
                src="/resources/Seedhe-Maut-Lunch-Front-Cover-Art-4K.png"
                alt="TRAP PNG"
                className="main-png"
                ref={heroImageRef}
              />
            </div>
            <div className="hero-btns">
              <a href="#contact" className="btn primary">GET IN TOUCH /></a>
              <a href="#skills" className="btn secondary">VIEW SKILLS /></a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h2>ABOUT ME /></h2>
            <div className="about-grid">
              <div className="about-text">
                <p>I AM A PASSIONATE DEVELOPER FOCUSED ON CREATING IMMERSIVE DIGITAL EXPERIENCES. WITH A KEEN
                  EYE FOR DESIGN AND A LOVE FOR CLEAN CODE, I BUILD APPLICATIONS THAT ARE BOTH FUNCTIONAL AND
                  VISUALLY STUNNING.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <h2>TECH STACK /></h2>
            <div className="skills-grid">
              {['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'PYTHON', 'TYPESCRIPT', 'NEXT.JS', 'MONGODB', 'POSTGRESQL', 'DOCKER', 'GIT'].map(skill => (
                <div key={skill} className="skill-card">{skill}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2>LET'S CONNECT /></h2>
            <div className="contact-grid">
              <a href="https://github.com/oGTRAP-JS" target="_blank" rel="noopener noreferrer" className="contact-card">GITHUB /></a>
              <a href="https://www.instagram.com/ogtrap.exe/" target="_blank" rel="noopener noreferrer" className="contact-card">INSTAGRAM /></a>
              <a href="https://discord.com/users/938318480355246140" target="_blank" rel="noopener noreferrer" className="contact-card">DISCORD /></a>
              <a href="mailto:contact@trap.codes" className="contact-card">EMAIL /></a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 TRAP. BUILT WITH PASSION & PRECISION.</p>
      </footer>
    </>
  )
}

export default App
