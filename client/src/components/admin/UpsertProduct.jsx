import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../../GlobalState';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpsertProduct = () => {

  const { id } = useParams();
  const state = useGlobalState();
  const [products] = state.productAPI.products;
  const [categories] = state.categoryAPI.categories;
  const [token] = state.token;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    author: '',
    price: 0,
    category: '',
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [productImagesToBeDeleted, setProductImagesToBeDeleted] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(oldValues => ({
      ...oldValues,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 1) {
      toast.error("Please upload at least 2 files.");
      return;
    };

    // Convert images to form data
    const imagesFormData = new FormData();
    formData.images.forEach(image => {
      imagesFormData.append("files", image);
    })

    try {
      // store images to cloudinary 
      const uploadData = await axios.post("/api/upload", imagesFormData, {
        headers: { Authorization: token },
        'Content-Type': 'multipart/form-data'
      })
      const uploadedImages = uploadData.data.images;
      const updatedFormData = { ...formData, images: uploadedImages };
      if (id) {
        // delete images from cloudinary
        await deleteProductImage(productImagesToBeDeleted);
        // update product
        const updateData = await axios.put(`/api/products/${formData._id}`, updatedFormData, {
          headers: { Authorization: token },
          'Content-Type': 'multipart/form-data'
        });
        toast.success(updateData.data.message);
      } else {
        // create a new product
        const createData = await axios.post(`/api/products`, updatedFormData, {
          headers: { Authorization: token },
          'Content-Type': 'multipart/form-data'
        });
        toast.success(createData.data.message);
      }
      setTimeout(() => {
        window.location.href = "/content-management/products";
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  const deleteProductImage = async (images) => {
    try {
      await Promise.all(images.map(async image => {
        const res = await axios.post("/api/upload/destroy", { public_id: image.public_id }, {
          headers: { Authorization: token }
        })
        // toast.success(res.data.message);
      }))

    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if (id && products.length > 0) {
      setLoading(true);
      const foundProduct = products.find(product => product._id === id);
      if (foundProduct) {
        setFormData(foundProduct);
        setProductImagesToBeDeleted(foundProduct.images);
        setLoading(false);
      }
    }
  }, [id, products])

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen overflow-x-auto my-12">
      <h2 className="text-2xl font-semibold text-center">{id ? "Update" : "Create"} Product</h2>
      <div className="grid grid-cols-2">
        <div className="my-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="text-sm text-gray-700" htmlFor="title">Title</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              onChange={handleChange}
              name="title"
              value={formData.title}
              required
            />
            <label className="text-sm text-gray-700" htmlFor="description">Description</label>
            <textarea
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              onChange={handleChange}
              name="description"
              value={formData.description}
              required
            />
            {id ? (
              <>
                <label className="text-sm text-gray-700" htmlFor="isbn">ISBN</label>
                <input
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.isbn}
                  type="text"
                  disabled
                />
              </>) : (
                <>
                <label className="text-sm text-gray-700" htmlFor="isbn">ISBN</label>
                <input
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.isbn}
                  name="isbn"
                  onChange={handleChange}
                  type="text"
                  required
                />
              </>
              )}
            <label className="text-sm text-gray-700" htmlFor="author">Author</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              name="author"
              onChange={handleChange}
              value={formData.author}
              required />
            <label className="text-sm text-gray-700" htmlFor="price">Price</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required />
            <label className="text-sm text-gray-700" htmlFor="category">Category</label>
            <select
              className="px-2 py-2 border border-gray-300 rounded-md"
              value={formData.category}
              onChange={handleChange}
              name="category"
              required>
              <option value="" disabled>--Select--</option>
              {categories.length > 0 && categories.map((category, idx) => {
                return <option key={idx} value={category.name}>{category.name}</option>
              })}
            </select>
            <label className="text-sm text-gray-700" htmlFor="images">Images</label>
            <input
              className="px-3 py-2 border border-gray-300 rounded-md"
              type="file"
              name="images"
              onChange={e => setFormData({ ...formData, images: Array.from(e.target.files) })}
              multiple
              accept=".jpg, .jpeg, .png"
            />

            <button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 my-3 mx-auto px-4 rounded">{id ? "Update" : "Create"}</button>
          </form>
        </div>
        <div className="m-5">
          <ul className="flex flex-wrap justify-center items-center gap-5">
            {
              formData.images.length > 0 && (
                formData.images.map((image, idx) => {
                  return (
                    <li key={idx}>
                      <img src={image.url || URL.createObjectURL(image)} width={120} alt="Product Image" />
                    </li>
                  )
                })
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UpsertProduct