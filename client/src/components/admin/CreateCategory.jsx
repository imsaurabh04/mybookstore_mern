import React, { useState } from 'react'
import { useGlobalState } from '../../GlobalState';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateCategory = () => {

  const state = useGlobalState();
  const [token] = state.token;

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // create a new category
        const createData = await axios.post(`/api/categories`, {name}, {
          headers: { Authorization: token },
        });
        toast.success(createData.data.message);
      setTimeout(() => {
        window.location.href = "/content-management/categories";
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen overflow-x-auto my-12">
      <h2 className="text-2xl font-semibold text-center">Create Category</h2>
      <div className="grid grid-cols-2">
        <div className="my-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm text-gray-700" htmlFor="title">Name</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              onChange={e => setName(e.target.value)}
              name="name"
              value={name}
              required
            />

            <button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 my-3 mx-auto px-4 rounded">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCategory