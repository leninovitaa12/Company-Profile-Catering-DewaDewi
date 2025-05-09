"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink } from "react-scroll"
import "./Navbar.css"

const Navbar = ({ nohp }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
              smooth={true}
              duration={700}
              offset={-80}
              className="cursor-pointer"
            >
              Beranda
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Menu */}
          <li>
            <ScrollLink
              to="menu"
              smooth={true}
              duration={700}
              offset={-80}
              className="cursor-pointer"
            >
              Menu
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Cara Pesan */}
          <li>
            <ScrollLink
              to="carapesan"
              smooth={true}
              duration={700}
              offset={-80}
              className="cursor-pointer"
            >
              Cara Pesan
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Tentang Kami */}
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={700}
              offset={-80}
              className="cursor-pointer"
            >
              Tentang Kami
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
