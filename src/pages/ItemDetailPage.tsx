import { useLoaderData } from 'react-router-dom'
import RatingComponent from '../components/RatingComponent'
import Button from '../components/Button'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addItemToCart } from '../redux/cart/cartSlice'

interface ProductData {
  product: {
    id: number
    category: string
    description: string
    price: number
    image: string
    rating: {
      rate: number
      count: number
    }
    title: string
  }
}

function ItemDetailPage() {
  const dispatch = useAppDispatch()
  const { product } = useLoaderData() as ProductData
  const isInStock = product.id % 2 === 0
  const cart = useAppSelector((state) => state.cart)
  const isInCart = cart.items.some((item) => item.id === product.id)
  const productQuantity = cart.items.find(
    (item) => item.id === product.id
  )?.quantity

  function handleOnClick() {
    const productInfo = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    }

    dispatch(addItemToCart(productInfo))
  }

  return (
    <div className="mt-6">
      <div>
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="mt-2 flex gap-4">
          <RatingComponent rating={product.rating.rate} />
          <p>{product.rating.rate}</p>
          <a href="#" className="italic text-gray-500 underline">
            {product.rating.count} ratings
          </a>
        </div>
      </div>
      <div className="mb-2 mt-6 grid place-items-center border-2 border-slate-200 py-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-56 object-contain"
        />
      </div>
      {isInStock ? (
        <p className="text-green-500">In Stock</p>
      ) : (
        <p className="text-red-500">Out of Stock</p>
      )}
      <p className="mt-6 text-justify">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="py-4 text-2xl font-bold text-blue-500">
          {product.price} €
        </p>

        <p className="text-green-500">
          <span className="rounded-full border-2 border-green-500">✔</span> Best
          price guarantee
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div>
          <label htmlFor="Quantity">Quantity</label>
          <div>
            <button>-</button>
            <input type="number" className="w-10" />
            <button>+</button>
          </div>
        </div>
        <Button handleOnClick={handleOnClick} styles="w-full">
          {isInCart ? `Add more` : 'Add to cart'}
        </Button>
      </div>
    </div>
  )
}

export default ItemDetailPage
