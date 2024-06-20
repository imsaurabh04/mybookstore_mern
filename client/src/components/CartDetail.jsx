import React from 'react'
import { useGlobalState } from '../GlobalState';
import { RiDeleteBinLine } from 'react-icons/ri';

const CartDetail = () => {
  const state = useGlobalState();
  const [cart] = state.userAPI.cart;
  const removeFromCart = state.userAPI.removeFromCart;
  const clearCart = state.userAPI.clearCart;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen p-4 my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Cart Details</h1>
        <button onClick={clearCart} hidden={cart.length === 0 ? true : false} className="bg-[#00a99d] hover:bg-[#016A70] text-white font-bold py-2 px-4 rounded mr-2">
          Clear Cart
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="font-semibold border-b-2 p-2">Product</th>
                  <th className="font-semibold border-b-2 p-2">Quantity</th>
                  <th className="font-semibold border-b-2 p-2">Price</th>
                  <th className="font-semibold border-b-2 p-2">Total</th>
                  <th className="font-semibold border-b-2 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b p-2">{item.title}</td>
                    <td className="border-b p-2">{item.quantity}</td>
                    <td className="border-b p-2">₹{item.price.toFixed(2)}</td>
                    <td className="border-b p-2">₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="border-b p-2 text-red-600">
                      <RiDeleteBinLine onClick={() => removeFromCart(item._id)} className="cursor-pointer" size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <span className="font-bold">Total: ₹{calculateTotal()}</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <button disabled className="bg-[#00a99d] disabled:opacity-75 text-white font-bold py-2 px-4 rounded mr-2">
                Proceed
              </button>
              <span className="text-red-500 text-xs my-2">Payment integration has not been implemented yet.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDetail