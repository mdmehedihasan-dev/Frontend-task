/* eslint-disable no-unused-vars */
import { useState } from "react";
import ProductData from "../data/ProductData";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import CartPage from "./CartPage";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(ProductData[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0].color);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0].size);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const colorData = selectedProduct.colors.find((c) => c.color === color);
    if (colorData) {
      setSelectedProduct({
        ...selectedProduct,
        image: colorData.image,
      });
    }
  };

  const handleSizeSelect = (size, price) => {
    setSelectedSize(size);
    setSelectedProduct({
      ...selectedProduct,
      price, 
    });
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price, 
        image: selectedProduct.image,
        color: selectedColor,
        size: selectedSize,
        quantity,
      })
    );
    setCartCount(cartCount + quantity);
    setCartShow(true);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="py-20">
      <div>
        <div className="flex items-center justify-center gap-x-16">
          <div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-md mx-auto"
            />
          </div>

          <div>
            <div className="flex items-center mb-5 gap-x-2">
              <div className="text-[#FFD200] flex gap-1">
                <FaStar /> <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="text-secondTextColor">(2 Review)</p>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="line-through text-secondTextColor text-[18px]">
                ${selectedProduct.originalPrice}.00
              </span>
              <p className="mb-2 text-2xl font-bold text-blue-500">
                ${selectedProduct.price.toFixed(2)}
              </p>
            </div>
            <p className="mt-4 text-[18px] w-[630px] text-secondTextColor">
              {selectedProduct.description}
            </p>

            <div className="flex py-5 gap-x-11">
              <div>
                <span className="text-lg text-secondTextColor">Type</span>
                <p className="text-xl font-bold text-textColor">Watch</p>
              </div>

              <div>
                <span className="text-lg text-secondTextColor">Brand</span>
                <p className="text-xl font-bold text-textColor">{selectedProduct.name}</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-bold text-textColor">Band Color:</span>
              <div className="flex items-center mt-2 space-x-3">
                {selectedProduct.colors.map(({ color }) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color ? "border-blue-500" : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-bold text-textColor">Wrist Size</span>
              <div className="flex items-center mt-2 space-x-3">
                {selectedProduct.sizes.map(({ size, price }) => (
                  <button
                    key={size}
                    className="px-3 py-1 text-sm font-medium border rounded-lg hover:bg-gray-100"
                    onClick={() => handleSizeSelect(size, price)}
                  >
                    {size} 
                    <span className="ml-3 text-secondTextColor">
                      ${price.toFixed(2)}
                      </span> 
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-x-3">
              <div className="flex items-center">
                <button
                  className="px-3 py-1 text-lg font-medium border-[#DBDFEA] border-2 rounded-tl-lg rounded-bl-lg "
                  // onClick={decrementQuantity}
                >
                  -
                </button>
                <span className="text-lg px-3 py-1 font-medium border-[#DBDFEA] border-t-2 border-b-2">
                  {quantity}
                </span>
                <button
                  className="px-3 py-1 rounded-tr-lg rounded-br-lg text-lg font-medium border-[#DBDFEA] border-2 "
                  // onClick={incrementQuantity}
                >
                  +
                </button>
              </div>
             <div className="flex items-center gap-x-3">
             <button
                className="px-6 py-2 text-white bg-[#6576FF] font-bold rounded hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <CiHeart  size={40}  className="font-bold text-blue-500 " />
             </div>
            </div>
          </div>
        </div>
      </div>

      {cartCount > 0 && (
        <div
          onClick={() => setCart(true)}
          className="fixed flex items-center justify-center gap-2 p-4 text-white rounded-full shadow-2xl cursor-pointer animate-bounce bg-textColor top-10 right-10"
        >
          <FaCartShopping size={20} />
          <p>{cartCount}</p>
        </div>
      )}

      {cart && (
        <div className="absolute top-0 left-0 w-full max-h-svh">
          <CartPage setCart={setCart} setCartShow={setCartShow} />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
