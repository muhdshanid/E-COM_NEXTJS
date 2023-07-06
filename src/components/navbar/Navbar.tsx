import Image from "next/image"
import Link from "next/link"
import logo from '@/assets/logo (1).png'
import { redirect } from "next/navigation"
import { getCart } from "@/libs/db/cart"
import CartButton from "./CartButton"

const searchProducts = async (formData: FormData) => {

    "use server"

    const searchQuery = formData.get("search")?.toString()


    if(searchQuery){
        redirect(`/search?query=${searchQuery}`)
    }
}
const Navbar = async() => {

    const cart = await getCart()
  return (
    <div className="bg-base-100">
        <div className="navbar max-w-7x  m-auto flex-col sm:flex-row gap-2">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost text-xl normal-case">
                    <Image src={logo} height={40} width={40} alt="logo"/>
                    Flomazon
                </Link>
            </div>
            <div className="flex-none gap-2">
                <form action={searchProducts}>
                    <div className="form-control">
                        <input name="search" placeholder="Search..." className="input input-bordered w-full
                        min-w-[100px]" type="text" />
                    </div>
                </form>
                <CartButton cart={cart}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar