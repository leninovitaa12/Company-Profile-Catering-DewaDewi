"use client"

import { useState, useEffect } from "react"
import { Link as ScrollLink, Events, scrollSpy } from "react-scroll"

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
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 shadow-[0_2px_10px_rgba(0,0,0,0.1)] py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="navbar-container max-w-[1200px] mx-auto px-6 w-full flex justify-between lg:grid lg:grid-cols-3 items-center">
        {/* Logo - Always on the left */}
        <div className="logo lg:justify-self-start">
          <h1 className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ease-in-out ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>
            DEWADEWI CATERING
          </h1>
        </div>

        {/* Mobile menu button */}
        <div
          className={`lg:hidden flex flex-col justify-between w-[30px] h-[21px] cursor-pointer z-[1001] ${
            isMobileMenuOpen ? 'active' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block h-[3px] w-full transition-all duration-300 ease-in-out ${
            isScrolled && !isMobileMenuOpen ? 'bg-gray-800' : isMobileMenuOpen ? 'bg-black' : 'bg-white'
          } ${
            isMobileMenuOpen ? 'translate-y-[9px] rotate-45' : ''
          }`}></span>
          <span className={`block h-[3px] w-full transition-all duration-300 ease-in-out ${
            isScrolled && !isMobileMenuOpen ? 'bg-gray-800' : isMobileMenuOpen ? 'bg-black' : 'bg-white'
          } ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block h-[3px] w-full transition-all duration-300 ease-in-out ${
            isScrolled && !isMobileMenuOpen ? 'bg-gray-800' : isMobileMenuOpen ? 'bg-black' : 'bg-white'
          } ${
            isMobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''
          }`}></span>
        </div>

        {/* Desktop and Mobile Navigation */}
        <ul className={`
          lg:flex lg:static lg:flex-row lg:bg-transparent lg:shadow-none lg:p-0 lg:translate-y-0 lg:opacity-100 lg:visible lg:justify-self-center lg:col-start-2
          ${isMobileMenuOpen 
            ? 'flex absolute top-full left-0 w-full bg-white/95 flex-col items-center py-6 shadow-[0_10px_10px_rgba(0,0,0,0.1)] translate-y-0 opacity-100 visible z-[999]' 
            : 'hidden lg:flex absolute top-full left-0 w-full bg-white/95 flex-col items-center py-6 shadow-[0_10px_10px_rgba(0,0,0,0.1)] -translate-y-[150%] opacity-0 invisible'
          }
          transition-all duration-300 ease-in-out list-none m-0 p-0 items-center
        `}>
          
          {/* ScrollLink untuk Beranda */}
          <li className="lg:ml-0 lg:mr-8 my-3 lg:my-0">
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer font-medium text-base transition-colors duration-300 ease-in-out relative pb-[5px] hover:text-orange-600 ${
                isMobileMenuOpen || isScrolled 
                  ? 'text-gray-800' 
                  : 'text-white'
              } ${
                activeSection === 'home' ? 'text-orange-600 after:w-full' : 'after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
              onSetActive={() => setActiveSection("home")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Tentang Kami */}
          <li className="lg:mr-8 my-3 lg:my-0">
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer font-medium text-base transition-colors duration-300 ease-in-out relative pb-[5px] hover:text-orange-600 ${
                isMobileMenuOpen || isScrolled 
                  ? 'text-gray-800' 
                  : 'text-white'
              } ${
                activeSection === 'about' ? 'text-orange-600 after:w-full' : 'after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
              onSetActive={() => setActiveSection("about")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang Kami
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Menu */}
          <li className="lg:mr-8 my-3 lg:my-0">
            <ScrollLink
              to="menu"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer font-medium text-base transition-colors duration-300 ease-in-out relative pb-[5px] hover:text-orange-600 ${
                isMobileMenuOpen || isScrolled 
                  ? 'text-gray-800' 
                  : 'text-white'
              } ${
                activeSection === 'menu' ? 'text-orange-600 after:w-full' : 'after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
              onSetActive={() => setActiveSection("menu")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </ScrollLink>
          </li>

          {/* ScrollLink untuk Cara Pesan */}
          <li className="lg:mr-0 my-3 lg:my-0">
            <ScrollLink
              to="carapesan"
              spy={true}
              smooth={true}
              duration={700}
              offset={-80}
              activeClass="active"
              className={`cursor-pointer font-medium text-base transition-colors duration-300 ease-in-out relative pb-[5px] hover:text-orange-600 ${
                isMobileMenuOpen || isScrolled 
                  ? 'text-gray-800' 
                  : 'text-white'
              } ${
                activeSection === 'carapesan' ? 'text-orange-600 after:w-full' : 'after:w-0'
              } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-orange-600 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
              onSetActive={() => setActiveSection("carapesan")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cara Pesan
            </ScrollLink>
          </li>

          {/* CTA Button for Mobile - Inside the same ul */}
          <li className="lg:hidden mt-6 mb-2">
            <a
              href={`https://api.whatsapp.com/send?phone=62${nohp}`}
              className="inline-block px-6 py-3 bg-orange-600 text-white rounded font-medium uppercase text-sm tracking-wide transition-all duration-300 ease-in-out hover:bg-orange-700 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] no-underline"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pesan Sekarang
            </a>
          </li>
        </ul>

        {/* CTA Button - Positioned on the right */}
        <div className="hidden lg:flex lg:justify-self-end">
          <a
            href={`https://api.whatsapp.com/send?phone=62${nohp}`}
            className="inline-block px-5 py-[10px] bg-orange-600 text-white rounded font-medium uppercase text-sm tracking-wide transition-all duration-300 ease-in-out hover:bg-orange-700 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* CTA Button for Mobile - Removed duplicate */}
      </div>
    </nav>
  )
}

export default Navbar