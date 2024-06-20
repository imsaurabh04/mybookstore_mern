import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGlobalState } from '../GlobalState';
import CarouselEffect from './CarouselEffect';

const ProductDetail = () => {

  const { id } = useParams();
  const state = useGlobalState();

  const [products] = state.productAPI.products;
  const addToCart = state.userAPI.addToCart;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id && products.length > 0) {
      const foundProduct = products.find(product => product._id === id);
      if (foundProduct) {
        setProductDetail(foundProduct);
        setLoading(false);
      }
    }
  }, [id, products]);

  return (
    <div className="min-h-screen mx-auto mb-6 overflow-hidden">
      { loading ? (
        <div>Loading...</div>
      ) : (
        <div className="shadow-lg py-10 my-10 rounded-lg">
        <Link to="/">
          <button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 px-4 rounded ml-4">
            Back
          </button>
        </Link>
        <h2 className="text-3xl text-center font-semibold">{productDetail.title}</h2>
        <p className="text-gray-600 text-center text-xl">By {productDetail.author}</p>
        <div className="grid grid-cols-2 my-6 py-8">

          <div className="h-72 w-72 mx-auto">
            <CarouselEffect images={productDetail.images} />
          </div>

          <div className="pl-6 pr-10">
            <div className="">
              <p className="mt-2 text-gray-700">Category: {productDetail.category}</p>
              <p className="mt-2 text-gray-700">ISBN: <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{productDetail.isbn}</span></p>
              <p className="my-4 text-gray-700">{productDetail.description}</p>
              <div className="flex flex-row justify-between items-center mt-4">
                <p className="mt-2 text-xl font-bold">₹ {productDetail.price}</p>
                <button onClick={() => addToCart(productDetail)} className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 px-4 rounded mr-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) }
    </div>
  )
}

export default ProductDetail;