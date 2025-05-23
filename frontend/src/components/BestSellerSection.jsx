"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import ProductDetail from "./ProductDetail";
import useGetProductsAdmin from "../hook/useGetProduct.js";

const BestSellerSection = () => {
  const [detail, setDetail] = useState(null);
  const { products, loading } = useGetProductsAdmin("", 1);

  return (
    <>
      <section
        id="menu"
        className="py-16 md:py-24 bg-[var(--light-brand)]"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-brand)] mb-4">Menu Unggulan Kami</h2>
            <div className="h-1 w-24 bg-[var(--primary-brand)] mx-auto mb-4"></div>
            <p className="text-[var(--primary-brand)] opacity-80 max-w-2xl mx-auto">
              Nikmati berbagai pilihan menu homemade yang berkualitas.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-brand)]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-[var(--primary-brand)] mb-2">{item.name}</h3>
                    <p className="text-[var(--primary-brand)] opacity-70 mb-4 line-clamp-2">
                      {item.description || "Hidangan lezat dengan bahan berkualitas tinggi"}
                    </p>
                    <Button
                      onClick={() => setDetail(item)}
                      className="bg-[var(--primary-brand)] text-[#D36B00] font-medium py-2 px-6 rounded-md transition-all duration-300 
                                md:text-white md:group-hover:bg-[#D36B00] md:group-hover:text-white"
                    >
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {products.length === 0 && !loading && (
            <div className="text-center py-10">
              <p className="text-[var(--primary-brand)] opacity-80 text-lg">Tidak ada produk yang tersedia saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {detail && <ProductDetail product={detail} setProduct={setDetail} />}
    </>
  );
};

export default BestSellerSection;
