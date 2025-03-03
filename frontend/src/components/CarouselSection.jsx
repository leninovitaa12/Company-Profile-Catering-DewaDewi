import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselSection = () => {
  const slides = [
    {
      title: "Semuanya ada Disini",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis enim beatae, tempora labore rem repellendus!",
      image:
        "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
    },
    {
      title: "Siap Melayani dengan sepenuh Hati",
      description:
        "Repellendus repellat fugiat tempora, fugit recusandae quas a quibusdam ut perferendis?",
      image:
        "https://images.pexels.com/photos/163077/mario-yoschi-figures-funny-163077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Dapatkan Promo terbaru",
      description:
        "Perspiciatis enim beatae, tempora labore rem repellendus! Lorem ipsum dolor sit amet.",
      image:
        "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
    <div className="w-full">
      <div className="p-0 overflow-hidden">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto">
                <div className="flex flex-col overflow-hidden rounded-lg bg-lime-200 sm:flex-row md:h-96">
                  <div className="order-first h-48 w-full bg-gray-300 sm:order-none sm:h-auto sm:w-1/2">
                    <img
                      src={slide.image}
                      loading="lazy"
                      alt="Photo by Andras Vas"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex items-center justify-center w-full flex-col p-4 sm:w-1/2 sm:p-8">
                    <h2 className="mb-4 text-xl text-center font-bold text-gray-800 md:text-2xl lg:text-4xl">
                      {slide.title}
                    </h2>

                    <p className="mb-8 max-w-md text-center text-gray-600">
                      This is a section of some simple filler text, also known
                      as placeholder text. It shares some characteristics of a
                      real written text.
                    </p>

                    <div className="mx-auto">
                      <a
                        href="#"
                        className="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
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
