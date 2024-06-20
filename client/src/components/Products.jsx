import React from "react";
import { useGlobalState } from "../GlobalState";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import PaginationButtons from "./PaginationButtons";

const Products = () => {
  const state = useGlobalState();
  const [products] = state.productAPI.products;
  const loading = state.productAPI.loading;
  const [currentPage, setCurrentPage] = state.productAPI.currentPage;
  const totalPages = state.productAPI.totalPages;

  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ul className="mt-2 mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, idx) => {
            return (
              <li key={idx}>
                <Link to={`/product/${product._id}`}>
                  <ProductCard product={product} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <PaginationButtons 
        totalPages={totalPages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        />
    </div>
  );
};

export default Products;
