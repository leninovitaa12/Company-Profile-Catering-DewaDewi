import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>DewaDewi Catering</h3>
            <p>
              Menyediakan layanan catering berkualitas untuk berbagai acara dengan cita rasa autentik dan bahan-bahan
              segar pilihan.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Tautan Cepat</h3>
            <ul>
              <li>
                <a href="#home">Beranda</a>
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
            </ul>
          </div>

          <div className="footer-contact" id="contact">
            <h3>Hubungi Kami</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i> Demangan, Kota Madiun
            </p>
            <p>
              <i className="fas fa-phone"></i> +62 812 3456 7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@dewadewicatering.com
            </p>
          </div>

          <div className="footer-newsletter">
            <h3>Berlangganan</h3>
            <p>Dapatkan informasi terbaru dan penawaran spesial dari kami</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email Anda" required />
              <button type="submit" className="btn">
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} DewaDewi Catering. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
