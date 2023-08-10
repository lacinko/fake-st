import { Link } from "react-router-dom";
import { ItemCardObject } from "../types/types";
import Button from "./Button";
import { useAppDispatch } from "../redux/hooks";
import { addItemToCart } from "../redux/cart/cartSlice";

function ItemCard(props: ItemCardObject) {
  const dispatch = useAppDispatch();

  function addItem() {
    const cartItem = {
      id: props.id,
      name: props.title,
      price: props.price,
      quantity: 1,
      image: props.image,
    };
    dispatch(addItemToCart(cartItem));
  }
  return (
    <div className="flex flex-col">
      <img
        src={props.image}
        alt={props.title}
        className="h-40 w-full object-contain"
      />
      <Link
        to={props.id.toString()}
        className="mt-4 text-base font-medium text-blue-600 first-letter:uppercase hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-500"
      >
        {props.title}
      </Link>
      <div className="mt-4 flex items-center justify-end gap-4">
        <p className="font-bold">{props.price} €</p>
        <Button handleOnClick={addItem}>
          {" "}
          Add to cart
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
          </svg>
        </Button>
      </div>
      <div className="relative -mr-4 mt-4 max-h-[3.6em] overflow-hidden overflow-ellipsis bg-white pr-8 text-justify leading-[1.2em] before:absolute before:bottom-0 before:right-5 before:content-['...'] after:absolute after:right-5 after:h-5 after:w-3 after:bg-white after:content-['']">
        {props.description}
      </div>
    </div>
  );
}

export default ItemCard;
