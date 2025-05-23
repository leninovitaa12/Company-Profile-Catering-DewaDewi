"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll"
import "./Navbar.css"

const Navbar = ({ nohp }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Initialize scrollSpy
    scrollSpy.update()

    // Register scroll events from react-scroll
    Events.scrollEvent.register("begin", (to) => {
      setActiveSection(to)
    })

    Events.scrollEvent.register("end", (to) => {
      setActiveSection(to)
    })

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      // Unregister scroll events
      Events.scrollEvent.remove("begin")
      Events.scrollEvent.remove("end")
    }
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container max-w-[1200px] mx-auto px-6 w-full">
        <div className="logo">
          <h1>DEWADEWI CATERING</h1>
        </div>

        <div
          className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {/* ScrollLink untuk Beranda */}
          <li>
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer ${activeSection === 'home' ? 'active' : ''}`}
              onSetActive={() => setActiveSection("home")}
            >
              Beranda
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Tentang Kami */}
          <li>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer ${activeSection === 'about' ? 'active' : ''}`}
              onSetActive={() => setActiveSection("about")}
            >
              Tentang Kami
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Menu */}
          <li>
            <ScrollLink
              to="menu"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer ${activeSection === 'menu' ? 'active' : ''}`}
              onSetActive={() => setActiveSection("menu")}
            >
              Menu
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Cara Pesan */}
          <li>
            <ScrollLink
              to="carapesan"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer ${activeSection === 'carapesan' ? 'active' : ''}`}
              onSetActive={() => setActiveSection("carapesan")}
            >
              Cara Pesan
            </ScrollLink>
          </li>

          <li className="cta-button">
            <a
              href={`https://api.whatsapp.com/send?phone=62${nohp}`}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pesan Sekarang
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
