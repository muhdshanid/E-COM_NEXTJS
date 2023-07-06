import { getCart } from "@/libs/db/cart"
import { Metadata } from "next"
import CartEntry from "./CartEntry"
import { setProductQuantity } from "./actions"
import { formatPrice } from "@/libs/format"


export const metadata: Metadata = {
  title: "Your Cart - Flomazon"
}

const Cart = async() => {
  const cart = await getCart()
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping cart</h1>
      {
        cart?.items.map(item => (
          <CartEntry setProductQuantity={setProductQuantity} cartItem={item}
          key={item.id}/>
        ))
      }
      {!cart?.items.length && (
        <p>
          Cart is empty
        </p>
      )}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart