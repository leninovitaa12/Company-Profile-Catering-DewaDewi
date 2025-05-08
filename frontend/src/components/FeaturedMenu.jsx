import "./FeaturedMenu.css"

const FeaturedMenu = () => {
  const featuredItems = [
    {
      id: 1,
      name: "Paket Nasi Kotak Premium",
      image: "/placeholder.svg?height=300&width=300",
      description: "Nasi dengan lauk pilihan berkualitas tinggi",
    },
    {
      id: 2,
      name: "Paket Prasmanan Mewah",
      image: "/placeholder.svg?height=300&width=300",
      description: "Hidangan prasmanan lengkap untuk acara spesial",
    },
    {
      id: 3,
      name: "Paket Snack Box",
      image: "/placeholder.svg?height=300&width=300",
      description: "Kue dan snack lezat untuk rapat dan seminar",
    },
    {
      id: 4,
      name: "Paket Catering Harian",
      image: "/placeholder.svg?height=300&width=300",
      description: "Solusi makanan sehat untuk kebutuhan harian",
    },
  ]

  return (
    <section id="menu" className="featured-menu">
      <div className="container">
        <h2 className="section-title">Menu Unggulan Kami</h2>
        <p className="section-subtitle">
          Nikmati berbagai pilihan menu berkualitas yang disiapkan oleh chef profesional kami
        </p>

        <div className="featured-items">
          {featuredItems.map((item) => (
            <div className="featured-item" key={item.id}>
              <div className="featured-item-image">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a href="#contact" className="btn-text">
                Pesan Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedMenu
