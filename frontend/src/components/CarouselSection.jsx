import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = () => {
  const slides = [
    {
      title: "Semuanya ada Disini",
      description: "Frozen Food dan Bisa pesan Catering disini!",
      image:
        "https://asset.kompas.com/crops/GZKGclL9N-Dv7wO6JWi8l7udJME=/179x0:1080x601/750x500/data/photo/2019/06/21/3717931935.jpg",
    },
    {
      title: "Siap Melayani dengan sepenuh Hati",
      description: "Dibuat oleh orang palembang asli lho!",
      image:
        "https://img.freepik.com/free-photo/deep-fried-fish-ball-dark-surface_1150-43602.jpg?t=st=1744357927~exp=1744361527~hmac=a4b7deb9cc972c7a051ddb4a271cf67bb82d754db60eccd19793d55b9a980466&w=1380",
    },
    {
      title: "Dapatkan Promo terbaru",
      description: "Pesan banyak, dengan harga terjangkau!",
      image:
        "https://img.freepik.com/free-photo/front-view-tasy-little-dumplings-with-flour-dark-gray-surface_179666-44203.jpg?t=st=1744358624~exp=1744362224~hmac=755ff9f3b75ad275f2f1f6800ea6054bc743166442e8fdd5ff917b70c3fefb81&w=1380",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div id="home" className="w-full">
      <div className="p-0 overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="bg-[#F1EFDC]">
              <div className="mx-auto">
                <div className="flex flex-col overflow-hidden rounded-lg bg-[#42032C] sm:flex-row md:h-[80vh] h-[40vh]">
                  <div className="relative order-first h-full w-full bg-[#E6D2AA] sm:order-none sm:h-auto">
                    <img
                      src={slide.image || "/placeholder.svg"}
                      loading="lazy"
                      alt="Food image"
                      className="h-full w-full object-cover object-center"
                    />
                    <h1
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-serif font-bold text-center whitespace-nowrap w-fit"
                      style={{
                        fontSize: "6vw",
                        maxWidth: "90%",
                        textShadow: "2px 2px 4px rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      CATERING DEWADEWI
                    </h1>
                  </div>

                  {/* <div className="flex items-center justify-center w-full flex-col p-4 sm:w-1/2 sm:p-8">
                    <h2 className="mb-4 text-xl text-center font-bold text-[#F1EFDC] md:text-2xl lg:text-4xl">
                      {slide.title}
                    </h2>

                    <p className="mb-8 max-w-md text-center text-[#F1EFDC]">{slide.description}</p>

                    <div className="mx-auto">
                      <a
                        href="#"
                        className="inline-block rounded-lg bg-[#D36B00] px-8 py-3 text-center text-sm font-semibold text-[#F1EFDC] outline-none transition duration-100 hover:bg-[#B05A00] focus-visible:ring active:bg-[#B05A00] md:text-base"
                      >
                        Contact
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselSection;
