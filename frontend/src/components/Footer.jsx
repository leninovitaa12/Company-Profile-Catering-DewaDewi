import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <div style={{ backgroundColor: "var(--primary-brand)" }} className="pt-4 sm:pt-10 lg:pt-12">
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center border-t pt-6">
          {/* <!-- nav - start --> */}
          <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
            <a href="#" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">About</a>
            <a href="#" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Product</a>
            <a href="#" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Cara Pesan</a>
            <a href="#" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Testimoni</a>
          </nav>
          {/* <!-- nav - end --> */}

          {/* <!-- social - start --> */}
          <div className="flex gap-4">
            {/* whattsapp */}
            <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
              <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.004 2C6.485 2 2 6.485 2 12.004c0 2.193.577 4.3 1.671 6.145L2 22l4.057-1.652a10.015 10.015 0 0 0 5.947 1.965c5.52 0 10.005-4.485 10.005-10.005C22.009 6.485 17.524 2 12.004 2zm0 18.008a7.974 7.974 0 0 1-4.295-1.242l-.307-.192-2.41.983.924-2.348-.199-.316A7.94 7.94 0 0 1 4.007 12c0-4.41 3.587-7.997 7.997-7.997 4.41 0 7.997 3.587 7.997 7.997 0 4.41-3.587 7.997-7.997 7.997zm4.604-5.994c-.25-.126-1.477-.73-1.706-.812-.229-.084-.396-.126-.564.125-.167.25-.646.812-.792.98-.146.167-.292.188-.542.063-.25-.125-1.054-.387-2.008-1.236a7.506 7.506 0 0 1-1.41-1.737c-.146-.25-.016-.385.11-.512.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.062-.125-.564-1.354-.771-1.792-.209-.5-.417-.417-.563-.417-.146-.021-.313-.026-.479-.026-.167 0-.438.063-.667.313-.229.25-.875.855-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.75 2.667 4.25 3.75.594.26 1.058.417 1.417.535.596.189 1.137.162 1.563.098.477-.07 1.477-.604 1.683-1.186.208-.583.208-1.083.146-1.186-.062-.104-.229-.167-.479-.292z" />
              </svg>
            </a>
          </div>
          {/* <!-- social - end --> */}
        </div>

        <div className="py-8 text-center text-sm text-gray-400">© 2025 - Present Catering Dewa Dewi. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Footer;
