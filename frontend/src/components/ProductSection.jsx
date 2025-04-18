import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {useGetProductsAdmin} from "../hook/useGetProduct";

export default function BestSellingCarousel() {
  const { products, loading } = useGetProductsAdmin("", 1); // ambil data dari API

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    arrows: true,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-center text-green-600 text-sm">RECOMMENDED</h2>
      <h1 className="text-center text-3xl font-semibold my-2">
        Best Selling Supplements
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Slider {...settings} className="mt-6">
          {products.map((product) => (
            <div key={product._id} className="p-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={product.image || "/images/default.png"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.description || "No description."}
                </p>
                <p className="text-md font-semibold mt-2">
                  {product.price ? `Rp ${product.price}` : "No price"}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <div className="text-center mt-6">
        <button className="border cursor-pointer border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition">
          SHOP ALL
        </button>
      </div>
    </div>
  );
}

// Custom Next Arrow Component
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:hidden absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-lg cursor-pointer z-10`}
      style={{ ...style }}
      onClick={onClick}
    >
      <FaChevronRight className="text-blue-600" size={20} />
    </div>
  );
};

// Custom Prev Arrow Component
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute before:hidden top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-lg cursor-pointer z-10`}
      style={{ ...style }}
      onClick={onClick}
    >
      <FaChevronLeft className="text-blue-600" size={20} />
    </div>
  );
};
