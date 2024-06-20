import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(oldValues => (
      {
        ...oldValues,
        [name]: value
      }
    ))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`, formData);
        localStorage.setItem("access-token", res.data.accessToken);
        toast.success("You have logged in successfully.")
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

        setFormData({
          email: "",
          password: ""
        })

    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen mt-24 w-full flex justify-center">
      <div className="h-96 w-96">
      <div
        className="flex justify-center items-center text-2xl font-bold mb-8"
        style={{ fontFamily: '"Ubuntu", sans-serif' }}
      >
        <img src="/book.png" width={50} alt="logo" /> &nbsp; Log In
      </div>
      <p className="text-gray-500">Log in to your account</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-3 justify-center">
        <label htmlFor="email">Email</label>
        <input
          className="px-3 py-2 border border-gray-300 rounded-md"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="px-3 py-2 border border-gray-300 rounded-md"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 my-3 px-4 rounded">
          Log in
        </button>
      </form>
      <div className="flex items-center gap-2">
        <p className="text-gray-500">Don't have an account?</p>
        <Link className="font-bold text-[#00a99d]" to="/signup">Sign Up</Link>
      </div>
    </div>
    </div>
  );
};

export default Login;
