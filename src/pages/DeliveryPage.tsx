import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import OptionsList from "../components/OptionsList";
import { Icons } from "../icons/icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  CartState,
  selectDeliveryAndPaymentOption,
} from "../redux/cart/cartSlice";

type Props = {};

function DeliveryPage({}: Props) {
  const dispatch = useAppDispatch();
  const delivery = useAppSelector((state) => state.cart.delivery);
  const payment = useAppSelector((state) => state.cart.payment);

  const deliveryOptions = [
    {
      id: "DEL-1",
      label: "FakeBox - self-service dispensing boxes",
      description: "Tomorrow until 8:00,",
      value: "free",
      icon: <Icons.Box />,
    },
    {
      id: "DEL-2",
      label: "Showroom FakeStore",
      description: "Tomorrow until 8:00,",
      value: "free or from 1$",
      icon: <Icons.Store />,
    },
    {
      id: "DEL-3",
      label: "Shops and supply points",
      description: "Tomorrow until 8:00,",
      value: "free or from 1$",
      icon: <Icons.Shop />,
    },
    {
      id: "DEL-4",
      label: "Delivery to",
      description: "Tomorrow from 12:00,",
      value: "free or from 5$",
      icon: <Icons.Home />,
    },
  ];

  const paymentOptions = [
    {
      id: "PAY-1",
      label: "Cash",
      value: "free",
      icon: <Icons.Cash />,
    },
    {
      id: "PAY-2",
      label: "Card online",
      value: "free",
      icon: <Icons.Card />,
    },
    {
      id: "PAY-3",
      label: "Google Pay",
      value: "free",
      icon: <Icons.GooglePay />,
    },
    {
      id: "PAY-4",
      label: "Apple Pay",
      value: "free",
      icon: <Icons.ApplePay />,
    },
  ];

  return (
    <div className="my-4 flex flex-col gap-2">
      <ProgressBar />
      <div className="mx-6 my-6 flex flex-col gap-2">
        <p className="text-lg font-semibold">Choose delivery method</p>
        <OptionsList
          options={deliveryOptions}
          handleOnChange={(e) =>
            dispatch(
              selectDeliveryAndPaymentOption({
                name: e.target.name as keyof CartState,
                value: e.target.id,
              })
            )
          }
          selectedValue={delivery}
        />
        <p className="mt-8 text-lg font-semibold">Select a payment</p>
        <OptionsList
          options={paymentOptions}
          handleOnChange={(e) =>
            dispatch(
              selectDeliveryAndPaymentOption({
                name: e.target.name as keyof CartState,
                value: e.target.id,
              })
            )
          }
          selectedValue={payment}
        />
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

export default DeliveryPage;
