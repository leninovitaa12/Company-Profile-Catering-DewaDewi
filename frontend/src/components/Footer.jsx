import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <div className="bg-white pt-4 sm:pt-10 lg:pt-12">
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
        <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
          <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>

        <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
          <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.004 2C6.485 2 2 6.485 2 12.004c0 2.193.577 4.3 1.671 6.145L2 22l4.057-1.652a10.015 10.015 0 0 0 5.947 1.965c5.52 0 10.005-4.485 10.005-10.005C22.009 6.485 17.524 2 12.004 2zm0 18.008a7.974 7.974 0 0 1-4.295-1.242l-.307-.192-2.41.983.924-2.348-.199-.316A7.94 7.94 0 0 1 4.007 12c0-4.41 3.587-7.997 7.997-7.997 4.41 0 7.997 3.587 7.997 7.997 0 4.41-3.587 7.997-7.997 7.997zm4.604-5.994c-.25-.126-1.477-.73-1.706-.812-.229-.084-.396-.126-.564.125-.167.25-.646.812-.792.98-.146.167-.292.188-.542.063-.25-.125-1.054-.387-2.008-1.236a7.506 7.506 0 0 1-1.41-1.737c-.146-.25-.016-.385.11-.512.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.062-.125-.564-1.354-.771-1.792-.209-.5-.417-.417-.563-.417-.146-.021-.313-.026-.479-.026-.167 0-.438.063-.667.313-.229.25-.875.855-.875 2.083s.896 2.417 1.021 2.583c.125.167 1.75 2.667 4.25 3.75.594.26 1.058.417 1.417.535.596.189 1.137.162 1.563.098.477-.07 1.477-.604 1.683-1.186.208-.583.208-1.083.146-1.186-.062-.104-.229-.167-.479-.292z" />
          </svg>
        </a>


        <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
          <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.69v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.462.098 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.762v2.31h3.588l-.467 3.622h-3.121V24h6.116c.729 0 1.325-.597 1.325-1.324V1.325C24 .597 23.403 0 22.675 0z" />
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
