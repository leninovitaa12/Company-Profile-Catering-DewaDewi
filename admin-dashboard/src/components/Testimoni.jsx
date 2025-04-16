import { useState } from "react";

const Testimoni = () => {
  const [testimoniImage, setTestimoniImage] = useState(null);

  const handleImageChange = (e) => {
    setTestimoniImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Logic untuk upload image
    alert("Testimoni image uploaded!");
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Manage Testimoni</h2>
      <input type="file" onChange={handleImageChange} />
      <button
        className="bg-[#D36B00] hover:bg-[#42032C] text-white p-2 mt-5"
        onClick={handleUpload}
      >
        Upload Testimoni
      </button>
    </div>
  );
};

export default Testimoni;
