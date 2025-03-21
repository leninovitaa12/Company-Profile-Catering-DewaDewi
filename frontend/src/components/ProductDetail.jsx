import React from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from './ui/button'

const ProductDetail = ({product, setProduct}) => {
  return (
    <div className="bg-white flex justify-center items-center h-full w-full fixed z-30 top-0 right-0 left-0">
    <div className="mx-auto h-[80vh] w-[80vw] px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
        {/* <!-- images - start --> */}
        <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <img src="https://images.unsplash.com/flagged/photo-1571366992942-be878c7b10c0?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
            </div>
        </div>
        {/* <!-- images - end --> */}

        {/* <!-- content - start --> */}
        <div className="md:py-8">
            <div onClick={() => setProduct(null)} className="flex justify-end w-full">
            <Button><FiX /></Button>
            </div>

            
            {/* <!-- name - start --> */}
            <div className="mb-2 md:mb-3">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">{product.name}</h2>
            </div>
            {/* <!-- name - end --> */}
            {/* <!-- description - start --> */}
            <div className="lg:mt-20">
            <div className="mb-3 text-lg font-semibold text-gray-800">Description</div>

            <p className="text-gray-500">
              {product.description}  
            </p>
            </div>
            {/* <!-- description - end --> */}
        </div>
        {/* <!-- content - end --> */}
        </div>
    </div>
    </div>
  )
}

export default ProductDetail