import { FiX } from "react-icons/fi";
import { Button } from "./ui/button";

const ProductDetail = ({ product, setProduct }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(2,2,2,.5)] px-4 overflow-x-hidden">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F1EFDC] rounded-lg shadow-lg p-4 sm:p-6">

        {/* Tombol Close Mobile */}
        <div className="flex justify-end lg:hidden mb-2">
          <Button onClick={() => setProduct(null)} className="bg-[#D36B00] text-[#F1EFDC] hover:bg-[#B05A00]">
            <FiX />
          </Button>
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4 overflow-x-hidden">
          {/* Gambar 1:1 */}
          <div className="w-full aspect-square overflow-hidden rounded-lg bg-[#E6D2AA]">
            <img
              src={product.image || "https://placehold.co/400x400"}
              loading="lazy"
              alt={product.name || "Product Image"}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Nama & Deskripsi */}
          <div className="break-words">
            <h2 className="text-xl font-bold text-center text-[#42032C] mb-2">{product.name}</h2>
            <h3 className="text-lg font-semibold text-[#42032C] mb-1">Description</h3>
            <p className="text-[#42032C] opacity-90 text-justify whitespace-pre-wrap break-words">
              {product.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid gap-8 grid-cols-2">
          {/* Gambar */}
          <div className="flex justify-center items-center">
            <div className="w-full h-80 overflow-hidden rounded-lg bg-[#E6D2AA]">
              <img
                src={product.image || "https://placehold.co/400x400"}
                loading="lazy"
                alt={product.name || "Product Image"}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Konten */}
          <div className="flex flex-col justify-between space-y-4">
            {/* Tombol Close Desktop */}
            <div className="flex justify-end">
              <Button onClick={() => setProduct(null)} className="bg-[#D36B00] text-[#F1EFDC] hover:bg-[#B05A00]">
                <FiX />
              </Button>
            </div>

            {/* Nama & Deskripsi */}
            <h2 className="text-3xl font-bold text-center text-[#42032C]">{product.name}</h2>
            <div className="break-words">
              <h3 className="text-lg font-semibold text-[#42032C] mb-1">Description</h3>
              <p className="text-[#42032C] opacity-90 text-justify whitespace-pre-wrap break-words">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
