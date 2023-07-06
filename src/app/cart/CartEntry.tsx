"use client"

import { CartItemWithProduct } from "@/libs/db/cart"
import { formatPrice } from "@/libs/format"
import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"
import { setProductQuantity } from "./actions"

interface CartEntryProps {
    cartItem: CartItemWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<void>
}
const CartEntry = ({cartItem: {product, quantity}}: CartEntryProps) => {
  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    ) 
  }
  let [isPending, startTransition] = useTransition()

  return (
    <div>
        <div className="flex flex-wrap items-center gap-3">
            <Image src={product.imageUrl} alt={product.name}
            width={200} height={200} className="rounded-lg"/>
            <div>
              <Link href={`/products/${product.id}`} className="font-bold">
                {product.name}
              </Link>
              <div>
                Price: {formatPrice(product.price)}
              </div>
              <div className="my-1 flex items-center gap-2">
                Quantity:
                <select onChange={e => {
                  const newQuantity = parseInt(e.currentTarget.value)
                  startTransition(async () => {
                    await setProductQuantity(product.id, newQuantity)
                  })
                }} defaultValue={quantity} className="select select-bordered w-full max-w-[80px]">
                  <option value={0}>
                    0 (Remove)
                  </option>
                  {quantityOptions}
                </select>
              </div>
              <div className="flex items-center gap-2">
                Total: {formatPrice(product.price * quantity)}
              {
                isPending && (
                  <span className="loading loading-spinner loading-sm"></span>
                )
              }
              </div>
            </div>
        </div>
        <div className="divider"/>
    </div>
  )
}

export default CartEntry