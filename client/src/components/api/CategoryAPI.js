import { useState, useEffect } from "react";
import axios from "axios";

const CategoryAPI = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 8;

    const getAllCategories = async() => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
      setTotalPages(Math.ceil(res.data.categoryList.length / limit));
    }

    const getCategoriesByLimit = async() => {
        const page = Math.min(currentPage + 1, totalPages);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories?limit=${limit}&page=${page}`);
        setCategories(res.data.categoryList);
        setLoading(false);
    }

    useEffect(() => {
      const main = async() => {
        await getAllCategories();
        if(totalPages !== 0) await getCategoriesByLimit();
      }
      main();
    }, [totalPages, currentPage])

  return ({
    categories: [categories, setCategories],
    loading,
    totalPages,
    currentPage: [currentPage, setCurrentPage]
  }
  )
}

export default CategoryAPI