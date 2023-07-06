import ProductCard from '@/components/ProductCard'
import { prisma } from '@/libs/db/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {id: "desc"}
  })
  return (
  <div className=''>
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
      <div className='my-4  md:w-3/4 m-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>

    {
      products.slice(1).map(product => (
        <ProductCard key={product.id} product={product}/>
      ))
    }
      </div>
  </div>
  )
}
