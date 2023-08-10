import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import ShoppingPage from "./pages/ShoppingPage.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import CartPage from "./pages/CartPage.tsx";
import DeliveryPage from "./pages/DeliveryPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import("preline");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":category",
        element: <ShoppingPage />,
      },
      {
        path: "cart",
        children: [
          {
            path: "1",
            element: <CartPage />,
          },
          {
            path: "2",
            element: <DeliveryPage />,
          },
          {
            path: "3",
            element: <CheckoutPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
