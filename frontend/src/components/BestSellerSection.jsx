import React, { useState } from 'react'
import { Button } from './ui/button'
import ProductDetail from './ProductDetail'

const products = [
  {
    name: "Frozen Chicken Nuggets",
    description: "Delicious and crispy frozen chicken nuggets made from high-quality ingredients.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Beef Sausage",
    description: "Premium quality beef sausage, perfect for grilling or breakfast.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Frozen Fish Fillet",
    description: "Fresh frozen fish fillet, ready to cook for your favorite seafood dishes.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Vegetable Spring Rolls",
    description: "Crispy and tasty vegetable spring rolls, perfect as a light snack.",
    image: "https://placehold.co/300x300",
  },
];

const BestSellerSection = () => {
  const [detail, setDetail] = useState(null)
  return (<>
    <section id='products' className="py-12 md:py-20 w-full bg-gray-50">
          <div className="grid px-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Best Seller Product</h2>
              <p className="text-muted-foreground">Our most popular products bisa dilihat disini</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((item, index) => (
                <div
                  key={item}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-square relative">
                    <img
                      src={`https://placehold.co/300x300`}
                      alt={`Supplement ${index}`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Natural ingredients</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Button onClick={() => setDetail(item)} variant="ghost" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
          {detail && <ProductDetail product={detail} setProduct={setDetail} />}</>
  )
}

export default BestSellerSection