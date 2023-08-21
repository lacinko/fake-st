import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import OptionsList from '../components/OptionsList'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  CartState,
  selectDeliveryAndPaymentOption,
} from '../redux/cart/cartSlice'
import { formatNumberToCurrency } from '../utils/utils'
import { deliveryOptions, paymentOptions } from '../redux/cart/OrderOptions'

function DeliveryPage() {
  const dispatch = useAppDispatch()
  const delivery = useAppSelector((state) => state.cart.delivery)
  const payment = useAppSelector((state) => state.cart.payment)
  const cart = useAppSelector((state) => state.cart)
  const disabledCSS =
    delivery && payment ? '' : 'opacity-50 pointer-events-none'

  return (
    <div className="my-4 flex flex-col gap-2">
      <ProgressBar />
      <div className="md:flex md:gap-2">
        <div className="mx-6 my-6 flex flex-col gap-2 md:w-[65%]">
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
          <div className="flex md:justify-end">
            <Link
              to="/cart/3"
              type="button"
              className={`${disabledCSS} mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-transparent bg-blue-500 py-2 text-sm font-semibold uppercase text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 md:w-auto md:px-6`}
            >
              Continue
            </Link>
          </div>
        </div>
        <div className="hidden md:flex md:w-[35%] md:flex-col ">
          {cart.items.map((item) => {
            const totalItemPrice = item.price * +item.quantity
            return (
              <div
                className="relative mx-4 mt-6 rounded-md bg-slate-50 px-2 py-4 md:flex md:flex-col md:items-start md:justify-between"
                key={item.id}
              >
                <div className="flex gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-contain md:hidden lg:block"
                  />
                  <div className="mx-2 flex flex-col">
                    <Link
                      to="#"
                      className="text-xs font-medium text-blue-700 hover:text-blue-900"
                    >
                      {`${item.quantity}x ${item.name}`}
                    </Link>
                    <p className="mt-1 text-xs font-medium text-green-700">
                      Stock
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between md:mr-2 md:gap-8">
                  <p className="font-semibold text-emerald-700">
                    {formatNumberToCurrency(totalItemPrice, 'USD')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DeliveryPage
