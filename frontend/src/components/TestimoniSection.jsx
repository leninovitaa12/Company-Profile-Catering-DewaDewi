import React from "react";
import useGetTestimoni from "../hook/useGetTestimoni";

const TestimoniSection = () => {
  const { testimonis, loading } = useGetTestimoni();

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="px-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Testimoni Pembeli Kami</h2>
          <p className="text-muted-foreground">Kurang percaya apa lagi nih??</p>
        </div>

        {loading ? (
          <p className="text-center mt-6">Memuat testimoni...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {testimonis.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg border"
              >
                <div className="aspect-square relative">
                  <img
                    src={item.image || "https://placehold.co/300x300"}
                    alt={item.nama || "Testimoni"}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                    {item.pesan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimoniSection;
