import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import { prisma } from '@/libs/db/prisma'
import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {
  searchParams: {
    page: string
  }
}
export default async function Home({searchParams: {page = "1"}}: HomeProps) {
  const currentPage = parseInt(page)
  const pageSize = 6
  const heroItemCount = 1
  const totalItems = await prisma.product.count()
  const totalPages = Math.ceil((totalItems - heroItemCount) / pageSize)
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"},
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0)
  })
  return (
  <div className='flex flex-col items-center'>
    {
      currentPage === 1 && (
    <div className='hero rounded-xl bg-base-200'>
      <div className='hero-content flex-col lg:flex-row flex  '>
      <Image src={products[0].imageUrl} alt={products[0].name}
      width={600} height={800} className='w-full max-w-sm rounded-lg shadow-2xl'
      priority/>
      <div>
        <h1 className=' text-sm lg:text-5xl font-bold '>
          {products[0].name}
        </h1>
        <p className='py-6'>
          {products[0].desc}
        </p>
        <Link href={`/products/${products[0].id}`} className='btn btn-primary'>
          Check it out
        </Link>
      </div>
      </div>
    </div>
      )
    }
      <div className='my-4  md:w-3/4 m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>

    {
      (currentPage === 1 ? products.slice(1) : products).map(product => (
        <ProductCard key={product.id} product={product}/>
      ))
    }
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages}/>

      )}
  </div>
  )
}
