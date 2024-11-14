import { notFound } from 'next/navigation'
import {CustomProductView} from '@/app/components/CustomProductView/CustomProductView'

// This is a mock function to simulate fetching product data
// In a real application, this would be an API call or database query
async function getProduct(id: string) {
  const products = [
    {
      id: '1',
      name: "Classic T-Shirt",
      description: "A versatile and comfortable t-shirt perfect for everyday wear. Made from 100% organic cotton for a soft feel and eco-friendly appeal.",
      price: 15000,
      rating: 4.5,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "White", hex: "#FFFFFF" },
        { name: "Black", hex: "#000000" },
        { name: "Navy", hex: "#000080" },
        { name: "Red", hex: "#FF0000" }
      ],
      image: "/placeholder.svg?height=600&width=600"
    },
    {
      id: '2',
      name: "V-Neck T-Shirt",
      description: "A stylish V-neck t-shirt for a more refined casual look.",
      price: 17000,
      rating: 4.3,
      sizes: ["S", "M", "L", "XL"],
      colors: [{ name: "White", hex: "#FFFFFF" }],
      image: "/placeholder.svg?height=600&width=600"
    },
    // Add more products as needed
  ]

  const product = products.find(p => p.id === id)
  if (!product) {
    return null
  }
  return product
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return <CustomProductView product={product} />
}