import { useLoaderData } from 'react-router-dom'
import RatingComponent from '../components/RatingComponent'

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
  const { product } = useLoaderData() as ProductData
  console.log(product)
  return (
    <div className="mt-6">
      <div>
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="mt-2 flex gap-4">
          <RatingComponent rating={product.rating.rate} />
          <p>{product.rating.rate}</p>
        </div>
      </div>
      <div className="my-6 grid place-items-center border-2 border-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-1/2 w-1/2 object-contain"
        />
      </div>
      <p className="text-justify">{product.description}</p>
      <div className="mt-4 flex justify-end">
        <p className="bg-blue-500 px-12 py-4 text-2xl font-bold text-white">
          {product.price} €
        </p>
      </div>
    </div>
  )
}

export default ItemDetailPage
