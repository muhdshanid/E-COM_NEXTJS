import Button from "@/components/Button";
import { prisma } from "@/libs/db/prisma";
import { Metadata } from "next"
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Add Product - Flomazon'
}


export const addProduct = async (formData: FormData) => {

    "use server";

    const name = formData.get("name")?.toString()
    const desc = formData.get("desc")?.toString()
    const imageUrl = formData.get("imageUrl")?.toString()
    const price = Number(formData.get("price") || 0)

    if(!name || !desc || !imageUrl ||!price)  throw new Error("Missing required fields")

    await prisma.product.create({
        data: {
            name,
            desc,
            imageUrl,
            price
        }
    })

    redirect("/")
}


const AddProduct = () => {
  return (
    <div className="min-h-screen m-auto">
        <h1 className="text-lg font-bold mb-3">Add Product</h1>
        <form action={addProduct} className="w-2/6 m-auto">
            <input
            required name="name" placeholder="Name" className="mb-3 w-full input input-bordered" type="text" />
            <textarea required name="desc" placeholder="Description" className="textarea-bordered textarea
            mb-3 w-full"></textarea>
            <input
            required name="imageUrl" placeholder="Image Url" className="mb-3 w-full input input-bordered" type="url" />
            <input
            required name="price" placeholder="Price" className="mb-3 w-full input input-bordered" type="number" />
            <Button className="btn-block" >Add Product</Button>
        </form>
    </div>
  )
}

export default AddProduct