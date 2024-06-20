import { useState, useEffect } from "react";
import axios from "axios";

const ProductAPI = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 8;

    const getAllProducts = async() => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      setTotalPages(Math.ceil(res.data.productList.length / limit));
    }

    const getProductsByLimit = async() => {
        const page = Math.min(currentPage + 1, totalPages);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?limit=${limit}&page=${page}`);
        setProducts(res.data.productList);
        setLoading(false);
    }

    
    useEffect(() => {
      const main = async() => {
        await getAllProducts();
        if(totalPages !== 0) await getProductsByLimit();
      }
      main();
    }, [totalPages, currentPage])

  return ({
    products: [products, setProducts],
    loading,
    totalPages,
    currentPage: [currentPage, setCurrentPage]
  }
  )
}

export default ProductAPI