import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";
import { Icons } from "../icons/icons";

type Props = {};

function CheckoutPage({}: Props) {
  const [orderDetails, setOrderDetails] = useState({
    email: "",
    phone: "",
    errorMsg: "",
    inputBorderEmailCSS: "",
    inputBorderPhoneCSS: "",
  });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (orderDetails.email !== "" && !emailRegex.test(orderDetails.email)) {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsg: "Please enter a valid email",
        inputBorderEmailCSS: "ring-2 ring-red-500",
      }));
    } else if (orderDetails.email !== "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsg: "",
        inputBorderEmailCSS: "ring-2 ring-green-500",
      }));
    }

    if (orderDetails.email === "") {
      setOrderDetails((prev) => ({
        ...prev,
        errorMsg: "",
        inputBorderEmailCSS: "ring-2 ring-blue-500",
      }));
    }
  }, [orderDetails.email]);

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
                if (prev.errorMsg === "" && prev.email !== "")
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
          {orderDetails.errorMsg !== "" ? (
            <Icons.RedX className="h-5 w-5" />
          ) : (
            orderDetails.email !== "" && (
              <Icons.GreenCheck className="h-5 w-5" />
            )
          )}
        </div>

        <p className="text-sm text-red-500">
          {orderDetails.errorMsg && orderDetails.errorMsg}
        </p>
        <p className="mt-6 text-sm">Phone number</p>
        <div className="flex justify-between">
          <select className="block w-full rounded-md border-gray-200 px-4 py-3 pr-9 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400">
            <option selected>Open this select menu</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>

          <div className="mr-10 mt-1 inline-flex w-1/2 items-center rounded-md border-2 px-2 py-1">
            <select
              className="w-full border-none p-0 text-base outline-none focus:ring-0"
              value="+91"
              onChange={(e) => {
                setOrderDetails((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </select>
          </div>
          <div
            className={`${orderDetails.inputBorderPhoneCSS} mt-1 inline-flex w-full items-center rounded-md border-2  px-2 py-1`}
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
                    inputBorderPhoneCSS: "ring-2 ring-blue-500",
                  };
                })
              }
              onBlur={() =>
                setOrderDetails((prev) => {
                  if (prev.errorMsg === "" && prev.email !== "")
                    return { ...prev };
                  return { ...prev, inputBorderPhoneCSS: "" };
                })
              }
              onChange={(e) => {
                setOrderDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
            {orderDetails.errorMsg !== "" ? (
              <Icons.RedX className="h-5 w-5" />
            ) : (
              orderDetails.email !== "" && (
                <Icons.GreenCheck className="h-5 w-5" />
              )
            )}
          </div>
        </div>

        <Link
          to="/cart/3"
          type="button"
          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;
