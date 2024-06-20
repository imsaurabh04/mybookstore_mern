import React from "react";
import { useGlobalState } from "../../GlobalState";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import PaginationButtons from "../PaginationButtons";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

const Category = () => {
  const state = useGlobalState();
  const [categories, setCategories] = state.categoryAPI.categories;
  const loading = state.categoryAPI.loading;
  const [currentPage, setCurrentPage] = state.categoryAPI.currentPage;
  const totalPages = state.categoryAPI.totalPages;
  const [token] = state.token;

  const handleDeleteCategory = (categoryId) => {
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
          const res = await axios.delete(`/api/categories/${categoryId}`, {
            headers: { Authorization: token }
          })
          // toast.success(res.data.message);

          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted.",
            icon: "success",
          });
          setCategories(categories.filter(category => category._id !== categoryId));
        } catch (err) {
          toast.error(err.response.data.message);
        }
      }
    });
  }

  return (
    <div className="min-h-screen overflow-x-auto my-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <Link to="/content-management/category/create"><button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 my-3 px-4 rounded">Create Category</button></Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-1 py-2 font-semibold">Sr. No.</th>
            <th className="px-4 py-2 font-semibold">Name</th>
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
            : ( categories.map((category, idx) => (
                <tr key={category._id} className="bg-gray-50">
                  <td className="border px-4 py-2">{(currentPage*8)+idx+1}</td>
                  <td className="border px-4 py-2 truncate">{category.name}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center gap-4">
                      <Link to="">
                        <div onClick={() => handleDeleteCategory(category._id)} className="cursor-pointer text-red-600">
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

export default Category;
