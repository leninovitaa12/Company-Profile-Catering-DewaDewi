import React, { useState } from 'react';
import { Button } from './ui/button';
import ProductDetail from './ProductDetail';
import useGetProductsAdmin from '../hook/useGetProduct.js'; // pastikan path-nya sesuai

const BestSellerSection = () => {
  const [detail, setDetail] = useState(null)
  const { products, loading } = useGetProductsAdmin("", 1) // ambil page 1, tanpa filter nama

  return (
    <>
      <section id='products' className="py-12 md:py-20 w-full bg-gray-50">
        <div className="grid px-8">
          {/* Judul */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[#606c38]">
              Best Seller Product
            </h2>
            <div className="h-1 w-20 bg-[#606c38] mx-auto"></div>
            <p className="text-muted-foreground">
              Our most popular products bisa dilihat disini
            </p>
          </div>

          {/* Produk */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {loading ? (
              <p className="col-span-full text-center text-muted-foreground">Loading products...</p>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#606c38]">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description || 'Natural ingredients'}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Button onClick={() => setDetail(item)} variant="ghost" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {detail && <ProductDetail product={detail} setProduct={setDetail} />}
    </>
  )
}

export default BestSellerSection
