import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ErrorPage from './pages/ErrorPage.tsx'
import ShoppingPage from './pages/ShoppingPage.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import CartPage from './pages/CartPage.tsx'
import DeliveryPage from './pages/DeliveryPage.tsx'
import CheckoutPage from './pages/CheckoutPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import PrivateRoutes from './components/ProtectedRoute.tsx'
import ItemDetailPage from './pages/ItemDetailPage.tsx'
import { ItemCardObject } from './types/types.ts'
import('preline')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ':category',
        element: <ShoppingPage />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${params.category}`
          )
          const data = await response.json()
          const dataWithDates = data.map((item: ItemCardObject) => {
            const currentDate = new Date()
            const randomDate = new Date(
              currentDate.getTime() - Math.random() * 10000000000
            )
            return { ...item, createdAt: randomDate }
          })
          return { products: dataWithDates }
        },
      },
      {
        path: ':category/:id',
        element: <ItemDetailPage />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/${params.id}`
          )
          const data = await response.json()
          return { product: data }
        },
      },
      {
        path: 'cart',
        element: <PrivateRoutes />,
        children: [
          {
            path: '1',
            element: <CartPage />,
          },
          {
            path: '2',
            element: <DeliveryPage />,
          },
          {
            path: '3',
            element: <CheckoutPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'user-profile',
        element: <PrivateRoutes />,
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
