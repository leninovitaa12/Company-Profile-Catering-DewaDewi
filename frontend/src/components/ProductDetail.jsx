"use client"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect } from "react"

const ProductDetail = ({ product, setProduct }) => {
  // Menambahkan event listener untuk menutup modal dengan tombol Escape
  useEffect(() => {
    if (!product) return

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setProduct(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [setProduct, product])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setProduct(null)
    }
  }

  if (!product) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-[var(--primary-brand)] truncate pr-4">{product.name}</h3>
          <button
            onClick={() => setProduct(null)}
            className="text-gray-500 hover:text-[var(--primary-brand)] transition-colors p-1 rounded-full hover:bg-gray-100 flex-shrink-0"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto overflow-x-hidden break-words md:max-w-[95%] p-4 flex-grow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image container with fixed aspect ratio */}
            <div className="md:w-1/2 flex-shrink-0">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image || "https://placehold.co/600x600"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x600"
                  }}
                />
              </div>
            </div>

            {/* Product details */}
            <div className="md:w-1/2 flex flex-col space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-[var(--primary-brand)]">Deskripsi</h4>
                <div className="mt-2 text-[var(--primary-brand)] opacity-80 whitespace-pre-wrap break-words">
                  {product.description || "Tidak ada deskripsi tersedia untuk produk ini."}
                </div>
              </div>

              {product.price && (
                <div>
                  <h4 className="text-lg font-semibold text-[var(--primary-brand)]">Harga</h4>
                  <p className="text-[var(--primary-brand)] font-bold text-xl mt-1">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with action button - sticky */}
        <div className="p-4 border-t sticky bottom-0 bg-white">
        <Button
          className="w-full bg-[var(--primary-brand)] text-[#D36B00] py-3 rounded-md transition-all duration-300 
                    md:text-white md:bg-[var(--primary-brand)] md:hover:bg-[#D36B00] md:hover:text-white"
          onClick={() => {
            const message = `Halo, saya tertarik dengan produk ${product.name}. Bisakah saya mendapatkan informasi lebih lanjut?`
            window.open(`https://wa.me/+6281234567890?text=${encodeURIComponent(message)}`, "_blank")
          }}
        >
          Pesan Sekarang via WhatsApp
        </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
