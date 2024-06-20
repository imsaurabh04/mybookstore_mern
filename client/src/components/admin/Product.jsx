import React from "react";
import { useGlobalState } from "../../GlobalState";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationButtons from "../PaginationButtons";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";

const Product = () => {
  const state = useGlobalState();
  const [products, setProducts] = state.productAPI.products;
  const loading = state.productAPI.loading;
  const [currentPage, setCurrentPage] = state.productAPI.currentPage;
  const totalPages = state.productAPI.totalPages;
  const [token] = state.token;

  const handleDeleteProduct = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${product._id}`, {
            headers: { Authorization: token }
          })
          // toast.success(res.data.message);
          await deleteProductImage(product.images);

          Swal.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success",
          });
          setProducts(products.filter(productItem => productItem._id !== product._id));
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }
    });
  }

  const deleteProductImage = async (images) => {
    try {
      await Promise.all(images.map(async image => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/destroy`, { public_id: image.public_id }, {
          headers: { Authorization: token }
        })
        // console.log(res.data.message);
      }))

    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen overflow-x-auto my-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <Link to="/content-management/product/upsert"><button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 my-3 px-4 rounded">Create Product</button></Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-1 py-2 font-semibold">Sr. No.</th>
            <th className="px-4 py-2 font-semibold">Title</th>
            <th className="px-3 py-2 font-semibold">ISBN</th>
            <th className="px-4 py-2 font-semibold">Author</th>
            <th className="px-2 py-2 font-semibold">Price (₹)</th>
            <th className="px-3 py-2 font-semibold">Category</th>
            <th className="px-3 py-2 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? (
              <tr>
                <td>
                  Loading...
                </td>
              </tr>
            )
            : (products.map((product, idx) => (
              <tr key={product._id} className="bg-gray-50">
                <td className="border px-4 py-2">{(currentPage * 8) + idx + 1}</td>
                <td className="border px-4 py-2 truncate">{product.title}</td>
                <td className="border px-4 py-2">{product.isbn}</td>
                <td className="border px-4 py-2 truncate">
                  {product.author}
                </td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center gap-4">
                    <Link to={`/content-management/product/upsert/${product._id}`}>
                      <div className="cursor-pointer text-green-600">
                        <FaRegEdit size={20} />
                      </div>
                    </Link>
                    <Link to="">
                      <div onClick={() => handleDeleteProduct(product)} className="cursor-pointer text-red-600">
                        <RiDeleteBinLine size={20} />
                      </div>
                    </Link>
                  </div>
                </td>
              </tr>
            )))}
        </tbody>
      </table>

      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Product;
