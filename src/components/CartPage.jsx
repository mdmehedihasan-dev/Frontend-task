/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";

const CartPage = ({ setCart, setCartShow }) => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  console.log(items)
  const handleCart = () => {
    setCartShow(false);
    setCart(false);
  };

  return (
    <div className="w-full h-screen bg-[#11121B] bg-opacity-55 flex items-center justify-center">
      <div className="w-3/4 max-w-[800px] h-[500px] mx-auto relative bg-white rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl font-bold text-textColor">Your Cart</p>
          <IoCloseSharp
            className="text-xl cursor-pointer"
            onClick={handleCart}
          />
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-6">
              {/* Table header */}
              <div className="flex items-center justify-between pb-2 border-b">
                <div className="w-1/3">
                  <p className="text-sm font-medium text-gray-500">Item</p>
                </div>
                <div className="flex justify-between w-2/3">
                  <p className="text-sm font-medium text-gray-500">Color</p>
                  <p className="text-sm font-medium text-gray-500">Size</p>
                  <p className="text-sm font-medium text-gray-500">Qty</p>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                </div>
              </div>

              {/* Cart items */}
              {items.map((item, i) => (
                <div key={i} className="py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-1/3 gap-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-12 h-12 rounded-md"
                      />
                      <h2 className="text-sm text-gray-700">{item.name}</h2>
                    </div>
                    <div className="flex justify-between w-2/3">
                      <p className="font-medium text-gray-700">{item.color}</p>
                      <p className="font-medium text-gray-700">{item.size}</p>
                      <p className="font-medium text-gray-700">
                        {item.quantity}
                      </p>
                      <p className="font-medium text-gray-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ========= Total =========== */}
            <div className="flex items-center justify-between mb-6 text-lg font-bold">
              <p>Total</p>
              <div className="flex gap-x-28">
                <p>{totalQuantity}</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 font-bold text-gray-600 border-2 border-gray-400 rounded-md hover:bg-gray-100"
                onClick={handleCart}
              >
                Continue Shopping
              </button>
              <button className="px-6 py-2 text-white bg-[#6576FF] font-bold rounded-md hover:bg-[#5564e5]">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
