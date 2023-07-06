import ProductCard from "@/components/ProductCard"
import { prisma } from "@/libs/db/prisma"
import { Metadata } from "next"

interface SearchPageProps {
    searchParams: {
      query: string
    }
  }

export function generateMetadata({searchParams: {query}}: SearchPageProps): Metadata {
    return {
        title: `Search: ${query} - Flomazon`
    }
}
const Search = async ({searchParams: {query}}: SearchPageProps) => {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive"}},
                { desc: { contains: query, mode: "insensitive"}},
            ]
        },
        orderBy: {id: "desc"}
    })

    if(products.length === 0){
        return (
            <div className="text-center">
                No product found for {query}
            </div>
        )
    }
  return (
    <div className="md:w-3/4 m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {
            products.map(product => (
                <ProductCard product={product} key={product.id}/>
            ))
        }
    </div>
  )
}

export default Search