import { CartItem } from '../redux/cart/cartSlice'

export type ItemCardObject = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  createdAt: Date
}

export interface User {
  username: string
  //password: string;
}

export type OrderItem = {
  id: string
  date: string
  email: string
  phone: string
  delivery: string
  payment: string
  cart: CartItem[]
  total: string
}

export type UserInfo = {
  address: {
    geolocation: {
      lat: string
      long: string
    }
    city: string
    street: string
    number: number
    zipcode: string
  }
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
  __v: number
}
