import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UserAPI = (token) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false); // New flag for initialization
    const [activeUser, setActiveUser] = useState({});

    const getUserInfo = async() => {
        try {
            const res = await axios.get("/api/users/userinfo", {
                headers: { Authorization: token }
            })
            setActiveUser(res.data);
            setIsLoggedIn(true);
            res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
            toast.error(err.response.data.message);
        }
}

    const addToCart = (product) => {
        if(!isLoggedIn) {
            return toast.error("Please log in first.");
        }

        const check = cart.every(item => {
            return item._id !== product._id;
        })

        if(check) {
            setCart([...cart, { ...product, quantity: 1 }]);
            toast.success("Product has been added to the cart.")
        } else {
            toast.warning("This product has already been added to the cart.");
        }
    }

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    };
    
    const clearCart = () => {
        setCart([]);
    };

useEffect(() => {
    if(token) getUserInfo();

}, [token])

useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    setIsInitialized(true);
  }, []);

useEffect(() => {
    if (isInitialized) { 
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}, [cart, isInitialized]);

  return ({
    activeUser: activeUser,
    isAdmin: [isAdmin, setIsAdmin],
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    addToCart: addToCart,
    cart: [cart, setCart],
    removeFromCart: removeFromCart,
    clearCart: clearCart
  }
  )
}

export default UserAPI