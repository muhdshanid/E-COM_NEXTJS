import PriceTag from "@/components/PriceTag"
import { prisma } from "@/libs/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./components/AddToCartButton"
import { incrementProductQuantity } from "./actions"

interface ProductPageProps {
    params: {
        id: string
    }
}

const getProduct = cache(async (id: string) => {

    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound()
    return product
})

export const generateMetadata = async ({params: {id}}: ProductPageProps): Promise<Metadata> => {
    const product = await getProduct(id)

    return {
        title: product.name + " - Flomazon",
        description: product.desc,
        openGraph: {
            images: [{url: product.imageUrl}]
        }
    }
}
const page = async ({params: {id}}: ProductPageProps) => {
    const product = await getProduct(id)
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center ">
        <Image src={product.imageUrl} alt={product.name}
        width={500} height={500} className="rounded-lg" priority/>
        <div>
            <h1 className="text-2xl">
                {product.name}
            </h1>
            <PriceTag price={product.price} className="mt-4"/>
            <p className="py-6">{product.desc}</p>
            <AddToCartButton incrementProductQuantity={incrementProductQuantity} productId={product.id}/>
        </div>
    </div>
  )
}

export default page