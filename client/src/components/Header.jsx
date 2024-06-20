import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BsCart2 } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useGlobalState } from '../GlobalState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Header = () => {

    const state = useGlobalState();
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [isLoggedIn, setIsLoggedIn] = state.userAPI.isLoggedIn;
    const [cart, setCart] = state.userAPI.cart;
    const activeUser = state.userAPI.activeUser;
    const [hideDropdown, setHideDropdown] = useState(true);

    const location = useLocation();

    const handleLogOut = async() => {
        try {
            const res = await axios.get("/api/users/logout");
            localStorage.clear();
            setIsLoggedIn(false);
            setIsAdmin(false);
            setCart([]);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleDropdown = () => {
        setHideDropdown(oldValue => oldValue ? false : true);
    }

    useEffect(() => {
      if(location.pathname) setHideDropdown(true);

    }, [location.pathname])
    

  return (
    <header className="py-10 px-5 h-16 flex flex-col justify-center w-full shadow-md">
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <nav className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-5" >
                <Link className="flex justify-center items-center text-2xl font-bold" style={{fontFamily: '"Ubuntu", sans-serif' }} to="/">
                    <img src="/book.png" width={50} alt="logo" /> &nbsp;
                    MyBookStore
                </Link>

                {isAdmin && 
                <div className="relative inline-block text-left">
                    <button onMouseDown={handleDropdown} type="button" className="inline-flex w-full justify-center gap-x-1.5 py-2 text-gray-900 text-lg font-semibold" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Content Management
                    </button>
                    <div className={`${hideDropdown ? "hidden" : "block"} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            <Link to="/content-management/categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-0">Category</Link>
                            <Link to="/content-management/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Product</Link>
                        </div>
                    </div>
                </div>
                }
            </div>
            <div className="flex justify-center items-center gap-8">
                {
                    isLoggedIn ? 
                    <div className="flex gap-5">
                        <div title={activeUser.email} className="flex justify-center items-center text-gray-600 cursor-pointer">
                            <MdOutlineAccountCircle size={30}/>
                        </div>
                        <Link to="/">
                            <button onClick={handleLogOut} className="text-lg font-medium bg-[#00a99d] hover:bg-[#016A70] text-white px-3 py-1 rounded-md mx-2">Log Out</button>
                        </Link>
                    </div> :
                    <div className="flex justify-center items-center gap-5">
                    <Link to="/login">
                        <button className="text-lg font-medium hover:opacity-70" >Log In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="text-lg font-medium bg-[#00a99d] hover:bg-[#016A70] text-white px-3 py-1 rounded-md mx-2">Sign Up</button>
                    </Link>
                    </div>
                }

                <div className="flex justify-center items-center relative cursor-pointer">
                    <Link to={"/cart"}><span className="absolute top-0 right-0 transform translate-x-3 -translate-y-4 bg-red-500 rounded-full text-white px-2 py-1 text-xs">{cart.length | 0}</span>
                    <BsCart2 className="relative" size={25} /></Link>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header