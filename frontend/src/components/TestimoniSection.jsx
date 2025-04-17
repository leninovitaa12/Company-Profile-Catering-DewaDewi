import React from 'react'

const TestimoniSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
          <div className="px-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Testimoni Pembeli Kami</h2>
              <p className="text-muted-foreground">Pesan semakin mudah</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <img
                      src={`https://placehold.co/300x300`}
                      alt={`Sustainable living ${item}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default TestimoniSection