import React from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from './ui/button'

const ProductDetail = ({product, setProduct}) => {
  return (
    <div className="bg-[rgba(2,2,2,.5)] flex z-30 justify-center items-center h-[100vh] w-full fixed z-30 top-0 right-0 left-0">
    <div className="mx-auto h-2/3 rounded-lg bg-white w-2/3 overflow-auto px-4 md:px-8">
        <div className="grid lg:gap-8 lg:grid-cols-2">
        <div onClick={() => setProduct(null)} className="flex py-2 lg:hidden justify-end w-full">
            <Button><FiX /></Button>
            </div>
        {/* <!-- images - start --> */}
        <div className="flex lg:justify-center lg:items-center">
            <div className="h-5/6 w-full overflow-hidden rounded-lg bg-gray-100">
            <img src="https://images.unsplash.com/flagged/photo-1571366992942-be878c7b10c0?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />
            </div>
        </div>
        {/* <!-- images - end --> */}

        {/* <!-- content - start --> */}
        <div className="lg:py-8">
            <div onClick={() => setProduct(null)} className="hidden lg:flex justify-end w-full">
            <Button><FiX /></Button>
            </div>

            
            {/* <!-- name - start --> */}
            <div className="mb-2 md:mb-3">
            <h2 className="text-2xl font-bold text-gray-800 text-center lg:text-3xl">{product.name}</h2>
            </div>
            {/* <!-- name - end --> */}
            {/* <!-- description - start --> */}
            <div className="lg:mt-2">
            <div className="mb-3 text-lg font-semibold text-gray-800">Description</div>

            <p className="text-gray-500 text-flex mb-2">
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