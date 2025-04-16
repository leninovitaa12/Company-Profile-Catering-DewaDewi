import { useState } from "react";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleAddProduct = () => {
    // Logic untuk menambah produk
    alert("Produk ditambahkan!");
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Tambah Produk</h2>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Nama Produk"
        className="border p-2 mb-5 w-full"
      />
      <textarea
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        placeholder="Deskripsi Produk"
        className="border p-2 mb-5 w-full"
      />
      <input type="file" onChange={handleImageChange} />
      <button
        className="bg-[#D36B00] hover:bg-[#42032C] text-white p-2 mt-5"
        onClick={handleAddProduct}
      >
        Tambah Produk
      </button>
    </div>
  );
};

export default Product;
