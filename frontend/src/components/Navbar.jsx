"use client"

import { useState, useEffect } from "react"
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
      <div className="container navbar-container">
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
          <li>
            <a href="#home" className="active">
              Beranda
            </a>
          </li>
          <li>
            <a href="#menu">Menu</a>
          </li>
          <li>
            <a href="#about">Tentang Kami</a>
          </li>
          <li>
            <a href="#contact">Kontak</a>
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
