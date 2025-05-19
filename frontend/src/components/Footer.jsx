const Footer = ({ nohp, alamat }) => {
  return (
    <footer className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] pt-12 sm:pt-16 lg:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-[hsl(var(--accent))]">
              DewaDewi Catering
            </h3>
            <p className="mb-6 text-[hsl(var(--secondary))] leading-7">
              Menyediakan layanan catering berkualitas untuk berbagai acara dengan cita rasa autentik dan bahan-bahan segar pilihan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-[hsl(var(--accent))]">
              Tautan Cepat
            </h3>
            <ul className="space-y-3 text-[hsl(var(--secondary))]">
              <li><a href="#home" className="hover:text-[hsl(var(--accent))] transition">Beranda</a></li>
              <li><a href="#about" className="hover:text-[hsl(var(--accent))] transition">Tentang Kami</a></li>
              <li><a href="#menu" className="hover:text-[hsl(var(--accent))] transition">Menu</a></li>
              <li><a href="#contact" className="hover:text-[hsl(var(--accent))] transition">Cara Pesan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 pb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[50px] after:h-[2px] after:bg-[hsl(var(--accent))]">
              Hubungi Kami
            </h3>

            {alamat && (
              <p className="mb-4 text-[hsl(var(--secondary))]">
                <i className="fas fa-map-marker-alt mr-2 text-[hsl(var(--accent))]"></i>
                {alamat}
              </p>
            )}

            {nohp && (
              <p className="mb-4 text-[hsl(var(--secondary))]">
                <i className="fas fa-phone mr-2 text-[hsl(var(--accent))]"></i>
                <a
                  href={`https://api.whatsapp.com/send?phone=62${nohp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[hsl(var(--accent))] transition"
                >
                  +62 {nohp}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DewaDewi Catering. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
