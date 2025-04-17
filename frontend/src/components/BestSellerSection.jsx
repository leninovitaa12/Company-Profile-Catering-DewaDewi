import React, { useState } from 'react';
import { Button } from './ui/button';
import ProductDetail from './ProductDetail';
import useGetProductsAdmin from '../hook/useGetProduct.js';

const BestSellerSection = () => {
  const [detail, setDetail] = useState(null)
  const { products, loading } = useGetProductsAdmin("", 1)

  return (
    <>
      <section id='products' className="py-12 md:py-20 w-full bg-[var(--light-brand)]">
        <div className="grid px-8">
          {/* Judul */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[var(--primary-brand)]">
              Best Seller Product
            </h2>
            <div className="h-1 w-20 bg-[var(--primary-brand)] mx-auto"></div>
            <p className="text-[var(--primary-brand)] opacity-80">
              Our most popular products bisa dilihat disini
            </p>
          </div>

          {/* Produk */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {loading ? (
              <p className="col-span-full text-center text-[var(--primary-brand)] opacity-80">Loading products...</p>
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
                    <h3 className="font-semibold text-[var(--primary-brand)]">{item.name}</h3>
                    <p className="text-sm text-[var(--primary-brand)] opacity-80">{item.description || 'Natural ingredients'}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Button 
                        onClick={() => setDetail(item)} 
                        variant="ghost" 
                        size="sm"
                        className="text-[var(--secondary-brand)] hover:text-[var(--primary-brand)]"
                      >
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