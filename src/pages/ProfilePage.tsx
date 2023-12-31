import { useState } from 'react'
import Button from '../components/Button'
import { useAppDispatch } from '../redux/hooks'
import { useAuth } from '../redux/user/userHooks'
import { logout } from '../redux/user/userSlice'
import { OrderItem, UserInfo } from '../types/types'
import { CartItem } from '../redux/cart/cartSlice'
import { useLoaderData } from 'react-router-dom'
import { flattenObject } from '../utils/utils'
import Accordion from '../components/Accordion'

function ProfilePage() {
  const { user } = useAuth()
  const { users } = useLoaderData() as { users: UserInfo[] }
  const objectKeys = ['username', 'password', '__v', 'lat', 'long']
  const [userInfo, setUserInfo] = useState(
    flattenObject(
      users.find((userInfo) => userInfo.username === user?.username) as object
    )
  )

  enum userInfoID {
    id = 0,
    firstname = 1,
    lastname = 2,
    email = 3,
    phone = 4,
    street = 5,
    number = 6,
    city = 7,
    zipcode = 8,
  }

  const orders = JSON.parse(localStorage.getItem('orders') as string)

  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUserInfo((prev) => ({ ...prev, [name]: value }))
  }

  async function handleUserInfoSubmit() {
    const userInfoObjPost = userInfo as UserInfo
    try {
      const response = await fetch(
        `https://fakestoreapi.com/users/${userInfoObjPost?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        }
      )

      console.log('userInfoUpdated', response)
    } catch (error) {
      console.error(error)
    } finally {
      console.log('FINALLY')
    }
  }

  return (
    <div className="mb-10 mt-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-[2.875rem] w-[2.875rem] overflow-hidden rounded-full bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.62854"
                y="0.359985"
                width="15"
                height="15"
                rx="7.5"
                fill="white"
              />
              <path
                d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                fill="currentColor"
              />
              <path
                d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <h2 className="text-lg font-bold tracking-wider ">
            {user?.username}
          </h2>
        </div>
        <Button handleOnClick={handleLogout} styles="uppercase">
          Logout
        </Button>
      </div>

      <Accordion title="My Info">
        <div className="flex flex-col">
          {Object.entries(userInfo)
            .filter(([key]) => !objectKeys.includes(key))
            .map(([key, value]) => {
              const id = userInfoID[key as keyof typeof userInfoID]
              return {
                id: id,
                key: key,
                value: value,
              }
            })
            .sort((a, b) => a.id - b.id)
            .map((info) => {
              if (info.key === 'id') return

              const capitalizedStr =
                info.key.charAt(0).toUpperCase() + info.key.slice(1)
              const multipleWords = capitalizedStr.includes('name')
              const formatedKey = multipleWords
                ? capitalizedStr.split('n').join(' n')
                : capitalizedStr

              return (
                <div
                  key={info.key}
                  className="mt-4 flex items-center justify-between gap-4"
                >
                  <label
                    htmlFor={info.key}
                    className="mb-2 block whitespace-nowrap text-sm font-medium dark:text-white"
                  >
                    {formatedKey}
                  </label>
                  <input
                    type="text"
                    name={info.key}
                    id={info.key}
                    className="block w-3/4 rounded-md border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400"
                    value={info.value.toString()}
                    onChange={handleChange}
                  />
                </div>
              )
            })}
          <div className="mx-2 my-4 flex justify-end">
            <Button styles="uppercase" handleOnClick={handleUserInfoSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Accordion>

      <Accordion title="My orders">
        {orders?.map((order: OrderItem) => {
          return (
            <div key={order.id} className="lg:inline-flex lg:w-full ">
              <div className="mt-3 inline-flex w-full items-center justify-between text-sm lg:justify-start lg:gap-8">
                <p className="text-gray-800">{order.date}</p>
                <p className="font-semibold text-green-600">{order.id}</p>
                <p className="font-semibold text-red-600">{order.total}</p>
              </div>
              <div className="mt-2 inline-flex items-center gap-2">
                {[...order.cart.slice(0, 6)].map(
                  (item: CartItem, idx: number) => {
                    const remainingItems = order.cart.length - 5
                    if (idx > 5) return
                    if (idx === 5)
                      return (
                        <div className="relative flex h-10 w-10 items-center justify-center bg-white p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>

                          <span className="absolute bottom-[-10%] right-[-10%] rounded-full bg-blue-500 px-2 py-1 text-xs font-bold leading-none text-red-100">
                            {remainingItems}
                          </span>
                        </div>
                      )

                    const isHidden = +item.quantity > 1 ? '' : 'hidden'
                    return (
                      <div className="relative" key={item.id}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 bg-white object-contain p-1"
                        />
                        <span
                          className={`${isHidden} absolute bottom-[-10%] right-[-10%] rounded-full bg-blue-500 px-2 py-1 text-xs font-bold leading-none text-red-100`}
                        >
                          {item.quantity}
                        </span>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )
        })}
      </Accordion>
    </div>
  )
}

export default ProfilePage
