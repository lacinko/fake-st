import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addItemToCart,
  applyDiscount,
  deleteItemFromCart,
  removeItemFromCart,
  selectCartTotal,
  updateCartItemQuantity,
} from "../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { formatNumberToCurrency } from "../utils/utils";
import ProgressBar from "../components/ProgressBar";

function CartPage() {
  const [isHiddenCSS, setIsHiddenCSS] = useState("");
  const discountRef = useRef<HTMLInputElement>(null);

  const cartTotal = useAppSelector((state) => selectCartTotal(state.cart));
  const cartTotalBeforeTax = cartTotal.totalAmount / 1.21;
  const cart = useAppSelector((state) => state.cart);
  const discount = useAppSelector((state) => state.cart.discount);

  const dispatch = useAppDispatch();

  function toggleInputField() {
    setIsHiddenCSS((prev) => (prev === "" ? "hidden" : ""));
  }

  function handleDiscountSubmit() {
    const discount = discountRef.current?.value;
    if (discount) {
      dispatch(applyDiscount(discount));
    }
  }

  if (cart.cart.length === 0) {
    return (
      <div className="my-4 flex h-full flex-col justify-center gap-2">
        <div className="mx-6 my-6 flex flex-col">
          <img
            src="https://demo.ordu.io/images/empty-cart.png"
            alt="empty-shopping-cart"
            className="mt-8 h-48 w-full object-contain"
          />
          <p className="mt-4 text-center text-xl font-medium uppercase">
            Cart is Empty
          </p>
          <p className="mt-2 text-center text-gray-500">
            Find the product and add to the cart
          </p>
          <Link
            to="/electronics"
            type="button"
            className={`mt-10 inline-flex items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col gap-2">
      <ProgressBar />

      {cart.cart.map((item) => {
        const totalItemPrice = item.price * +item.quantity;
        return (
          <div
            className="relative mx-4 mt-6 rounded-md bg-slate-50 px-2 py-4 md:flex md:items-start md:justify-between"
            key={item.id}
          >
            <button
              type="button"
              className="absolute right-0 top-0 rounded-md border border-transparent p-1  text-sm font-semibold text-blue-500 transition-all hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                dispatch(deleteItemFromCart(item));
              }}
            >
              X
            </button>
            <div className="flex gap-2">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-md object-contain"
              />
              <div className="mx-2 flex flex-col">
                <Link
                  to="#"
                  className="text-xs font-medium text-blue-700 hover:text-blue-900"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs font-medium text-green-700">Stock</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between md:mr-2 md:gap-8">
              <div className="flex gap-4 md:gap-0">
                <input
                  type="number"
                  className="block w-12 rounded-md border-2 border-gray-200 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                  value={item.quantity}
                  onChange={(e) => {
                    const itemID = item.id;
                    const newQuantity =
                      e.target.value !== "" ? +e.target.value : "";

                    dispatch(
                      updateCartItemQuantity({
                        id: itemID,
                        quantity: newQuantity,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                      })
                    );
                  }}
                />
                <div className="flex justify-between gap-1 md:flex-col-reverse md:gap-0">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full border bg-white px-2 py-1 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    disabled={item.quantity === 1}
                    onClick={() => {
                      dispatch(removeItemFromCart(item));
                    }}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full border bg-white px-2 py-1 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    onClick={() => {
                      dispatch(addItemToCart(item));
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="font-semibold text-emerald-700">
                {formatNumberToCurrency(totalItemPrice, "USD")}
              </p>
            </div>
          </div>
        );
      })}
      <div className="mx-6 my-6 flex flex-col gap-2 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="inline-flex justify-between">
            Total excl. VAT{" "}
            <span>{formatNumberToCurrency(cartTotalBeforeTax, "USD")}</span>
          </p>
          <p className="inline-flex justify-between font-bold">
            Estimated price{" "}
            <span>{formatNumberToCurrency(cartTotal.totalAmount, "USD")}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="mt-6 inline-flex items-center gap-2 md:mt-0"
            onClick={toggleInputField}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-500 px-2 py-1 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              +
            </button>
            <p>Use discount / gift voucher</p>
          </div>
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                className={`${isHiddenCSS} block w-full rounded-md border-2 border-gray-200 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500`}
                ref={discountRef}
              />
              <button
                type="button"
                className={`${isHiddenCSS} inline-flex items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 px-2 py-1 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                onClick={handleDiscountSubmit}
              >
                Apply
              </button>
            </div>
          </div>
          <p className="text-sm text-red-500">
            {discount.errorMessage && discount.errorMessage}
          </p>
          <p className="text-sm text-green-500">
            {discount.message && discount.message}
          </p>
        </div>
      </div>
      <div className="flex md:justify-end">
        <Link
          to="/cart/2"
          type="button"
          className={`mx-6 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 md:w-auto md:px-6`}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
