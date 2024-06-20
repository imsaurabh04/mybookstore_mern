import React from 'react'

const ProductCard = ({ product }) => {

  return (
    <div className="group relative max-w-sm rounded overflow-hidden shadow-lg">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img src={product.images[0].url} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
      <div className="px-6 pb-4">
        <div className="font-semibold text-xl truncate mt-1">{product.title}</div>
        <p className="text-gray-700 text-base">{product.author}</p>
      </div>
      <div className="px-6 pb-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        ₹{product.price}
        </span>
      </div>
    </div>
  )
}

export default ProductCard