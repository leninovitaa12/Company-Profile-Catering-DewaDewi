import { useState } from "react";

const ProductItem = ({ setAdd }) => {
  const [productList, setProductList] = useState([]);

  return (<div className="mt-8 mx-auto">
    <h3 className="text-2xl font-semibold text-gray-800 mb-5">Daftar Produk</h3>
    <button className="text-black bg-white rounded-lg px-4 py-2 mb-4" onClick={() => setAdd(true)}>Add Product</button>
    {productList.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {product.image && (
              <div className="relative aspect-video">
                <img
                  src={URL.createObjectURL(product.image) || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h4>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString("id-ID")}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    title="Edit"
                  >
                    <span className="w-[18px] h-[18px] text-gray-700">
                      <EditIcon />
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                    title="Hapus"
                  >
                    <span className="w-[18px] h-[18px] text-red-600">
                      <TrashIcon />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
        <p className="text-gray-500">Belum ada produk yang ditambahkan.</p>
        <p className="text-sm text-gray-400 mt-1">Tambahkan produk pertama Anda.</p>
      </div>
    )}
  </div>);
};

export default ProductItem;
