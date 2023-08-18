import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { Icons } from "../icons/icons";
import { useAppSelector } from "../redux/hooks";
import { formatNumberToCurrency } from "../utils/utils";
import { deliveryOptions, paymentOptions } from "../redux/cart/OrderOptions";
import { selectCartTotal } from "../redux/cart/cartSlice";

function CheckoutPage() {
  const delivery = useAppSelector((state) => state.cart.delivery);
  const payment = useAppSelector((state) => state.cart.payment);
  const cart = useAppSelector((state) => state.cart);
  const cartTotal = useAppSelector((state) => selectCartTotal(state.cart));
  const cartTotalBeforeTax = cartTotal.totalAmount / 1.21;

  const deliveryOption = deliveryOptions.find(
    (option) => option.id === delivery
  );
  const paymentOption = paymentOptions.find((option) => option.id === payment);

  const mobilePrefixes = [
    {
      image: "https://cdn.alza.cz/images/flags/country/cz.svg",
      prefix: "+420",
    },
    {
      image: "https://cdn.alza.cz/images/flags/country/sk.svg",
      prefix: "+421",
    },
    {
      image: "https://cdn.alza.cz/images/flags/country/de.svg",
      prefix: "+49",
    },
    {
      image: "https://cdn.alza.cz/images/flags/country/at.svg",
      prefix: "+43",
    },
    {
      image: "https://cdn.alza.cz/images/flags/country/hu.svg",
      prefix: "+36",
    },
    {
      image: "https://cdn.alza.cz/Styles/images/svg/globe-earth-blue.svg",
      prefix: "",
    },
  ];
  const [orderDetails, setOrderDetails] = useState({
    email: "",
    phone: {
      image: mobilePrefixes[0].image,
      prefix: mobilePrefixes[0].prefix,
      number: "",
    },
    errorMsgEmail: "",
    errorMsgPhone: "",
    inputBorderEmailCSS: "",
    inputBorderPhoneCSS: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const expandedCSS = isExpanded ? "flex" : "hidden";

  function handleDropDown() {
    setIsExpanded((prev) => !prev);
  }

  function selectPhonePrefix(idx: number) {
    setOrderDetails((prev) => ({
      ...prev,
      phone: {
        image: mobilePrefixes[idx].image,
        prefix: mobilePrefixes[idx].prefix,
        number: prev.phone.number,
      },
    }));
    setIsExpanded(false);
  }

  function handleOrderSubmit() {
    console.log("Order submitted");
  }

  useEffect(() => {
    //EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (orderDetails.email !== "" && !emailRegex.test(orderDetails.email)) {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgEmail: "Please enter a valid email",
        inputBorderEmailCSS: "ring-2 ring-red-500",
      }));
    } else if (orderDetails.email !== "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgEmail: "",
        inputBorderEmailCSS: "ring-2 ring-green-500",
      }));
    }

    if (orderDetails.email === "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgEmail: "",
        inputBorderEmailCSS: "",
      }));
    }

    //PHONE
    const czechPhoneRegex = /^[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
    const slovakPhoneRegex = /^[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/;
    const germanPhoneRegex = /^[1-9][0-9]{3} ?[0-9]{3} ?[0-9]{4}$/;
    const austrianPhoneRegex = /^[1-9][0-9]{3} ?[0-9]{3} ?[0-9]{4}$/;
    const hungarianPhoneRegex = /^[1-9][0-9]{1} ?[0-9]{3} ?[0-9]{4}$/;

    if (
      (orderDetails.phone.number !== "" &&
        orderDetails.phone.prefix === "+420" &&
        !czechPhoneRegex.test(orderDetails.phone.number)) ||
      (orderDetails.phone.number !== "" &&
        orderDetails.phone.prefix === "+421" &&
        !slovakPhoneRegex.test(orderDetails.phone.number)) ||
      (orderDetails.phone.number !== "" &&
        orderDetails.phone.prefix === "+49" &&
        !germanPhoneRegex.test(orderDetails.phone.number)) ||
      (orderDetails.phone.number !== "" &&
        orderDetails.phone.prefix === "+43" &&
        !austrianPhoneRegex.test(orderDetails.phone.number)) ||
      (orderDetails.phone.number !== "" &&
        orderDetails.phone.prefix === "+36" &&
        !hungarianPhoneRegex.test(orderDetails.phone.number))
    ) {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgPhone: "Please enter a valid phone number",
        inputBorderPhoneCSS: "ring-2 ring-red-500",
      }));
    } else if (orderDetails.phone.number !== "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgPhone: "",
        inputBorderPhoneCSS: "ring-2 ring-green-500",
      }));
    }

    if (orderDetails.phone.number === "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsgPhone: "",
        inputBorderPhoneCSS: "",
      }));
    }
  }, [
    orderDetails.email,
    orderDetails.phone.number,
    orderDetails.phone.prefix,
  ]);

  return (
    <div className="my-4 flex flex-col gap-2">
      <ProgressBar />
      <div className="mx-6 my-6 flex flex-col">
        <p className="text-sm">Enter your email</p>
        <div
          className={`${orderDetails.inputBorderEmailCSS} mt-1 inline-flex w-full items-center rounded-md border-2  px-2 py-1`}
        >
          <input
            type="text"
            value={orderDetails.email}
            className="w-full border-none p-0 text-base outline-none focus:ring-0"
            onFocus={() =>
              setOrderDetails((prev) => {
                if (prev.email !== "") return { ...prev };
                return {
                  ...prev,
                  inputBorderEmailCSS: "ring-2 ring-blue-500",
                };
              })
            }
            onBlur={() =>
              setOrderDetails((prev) => {
                if (prev.errorMsgEmail === "" && prev.email !== "")
                  return { ...prev };
                return { ...prev, inputBorderEmailCSS: "" };
              })
            }
            onChange={(e) => {
              setOrderDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
          {orderDetails.errorMsgEmail !== "" ? (
            <Icons.RedX className="h-5 w-5" />
          ) : (
            orderDetails.email !== "" && (
              <Icons.GreenCheck className="h-5 w-5" />
            )
          )}
        </div>

        <p className="text-sm text-red-500">
          {orderDetails.errorMsgEmail && orderDetails.errorMsgEmail}
        </p>
        <p className="mt-6 text-sm">Phone number</p>
        <div className="flex justify-between">
          <div className="relative">
            <button
              className="inline-flex w-28 justify-between rounded-md border-2 border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
              onClick={handleDropDown}
            >
              <img
                src={orderDetails.phone.image}
                alt={orderDetails.phone.prefix}
              />
              <p>{orderDetails.phone.prefix}</p>
              <div className="h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="h-full w-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>
            <div
              className={`${expandedCSS} absolute left-0 top-10 z-10 w-full flex-col gap-2 rounded-md border-2 bg-white px-4 py-3 shadow-lg`}
            >
              {mobilePrefixes.map((country, idx) => (
                <div
                  key={country.prefix}
                  className="flex cursor-pointer gap-2"
                  onClick={() => selectPhonePrefix(idx)}
                >
                  <img
                    src={country.image}
                    alt={country.prefix}
                    className="h-4 w-4"
                  />
                  <p>{country.prefix}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`${orderDetails.inputBorderPhoneCSS} ml-6 inline-flex w-full items-center rounded-md border-2  px-2 py-1`}
          >
            <input
              type="text"
              value={orderDetails.phone.number}
              className="w-full border-none p-0 text-base outline-none focus:ring-0"
              onFocus={() =>
                setOrderDetails((prev) => {
                  if (prev.phone.number !== "") return { ...prev };
                  return {
                    ...prev,
                    inputBorderPhoneCSS: "ring-2 ring-blue-500",
                  };
                })
              }
              onBlur={() =>
                setOrderDetails((prev) => {
                  if (prev.errorMsgPhone === "" && prev.phone.number !== "")
                    return { ...prev };
                  return { ...prev, inputBorderPhoneCSS: "" };
                })
              }
              onChange={(e) => {
                setOrderDetails((prev) => ({
                  ...prev,
                  phone: {
                    ...prev.phone,
                    number: e.target.value,
                  },
                }));
              }}
            />
            {orderDetails.errorMsgPhone !== "" ? (
              <Icons.RedX className="h-5 w-5" />
            ) : (
              orderDetails.phone.number !== "" && (
                <Icons.GreenCheck className="h-5 w-5" />
              )
            )}
          </div>
        </div>
      </div>
      <div className="mx-6 my-6">
        <p className="text-lg font-semibold">Order Summary</p>
        {cart.cart.map((item) => {
          const totalItemPrice = item.price * +item.quantity;
          return (
            <div
              className="relative mt-2 rounded-md bg-slate-50 px-2 py-4 md:flex md:items-start md:justify-between"
              key={item.id}
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-6 w-6 rounded-md object-contain md:hidden lg:block"
                  />
                  <div className="mx-2 flex flex-col">
                    <Link
                      to="#"
                      className="text-xs font-medium text-blue-700 hover:text-blue-900"
                    >
                      {`${item.quantity}x ${item.name}`}
                    </Link>
                  </div>
                </div>
                <p className="font-semibold text-emerald-700">
                  {formatNumberToCurrency(totalItemPrice, "USD")}
                </p>
              </div>
            </div>
          );
        })}
        <div className="relative mt-2 rounded-md bg-slate-50 px-2 py-4 md:flex md:items-start md:justify-between">
          <div className="flex items-center gap-2">
            {deliveryOption?.icon}
            <div className="mx-2 flex flex-col">
              <p className="text-xs font-medium text-blue-700 hover:text-blue-900">
                {deliveryOption?.label}
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-2 rounded-md bg-slate-50 px-2 py-4 md:flex md:items-start md:justify-between">
          <div className="flex items-center gap-2">
            {paymentOption?.icon}
            <div className="mx-2 flex flex-col">
              <p className="text-xs font-medium text-blue-700 hover:text-blue-900">
                {paymentOption?.label}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="inline-flex justify-between">
            Total excl. VAT{" "}
            <span>{formatNumberToCurrency(cartTotalBeforeTax, "USD")}</span>
          </p>
          <p className="inline-flex justify-between font-bold">
            Estimated price{" "}
            <span>{formatNumberToCurrency(cartTotal.totalAmount, "USD")}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        className={`mx-6 mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        onClick={handleOrderSubmit}
      >
        Complete order
      </button>
    </div>
  );
}

export default CheckoutPage;
