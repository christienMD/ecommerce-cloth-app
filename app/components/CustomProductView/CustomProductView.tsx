
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Product = {
  id: number
  name: string
  description: string
  price: number
  rating: number
  sizes: string[]
  colors: { name: string; hex: string }[]
  image: string
}

const product: Product = {
  id: 1,
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
}

const similarProducts: Product[] = [
  {
    id: 2,
    name: "V-Neck T-Shirt",
    description: "A stylish V-neck t-shirt for a more refined casual look.",
    price: 17000,
    rating: 4.3,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#FFFFFF" }],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Long Sleeve T-Shirt",
    description: "A comfortable long sleeve t-shirt for cooler days.",
    price: 19000,
    rating: 4.7,
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Black", hex: "#000000" }],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    name: "Polo Shirt",
    description: "A classic polo shirt for a smart-casual look.",
    price: 22000,
    rating: 4.6,
    sizes: ["M", "L", "XL", "XXL"],
    colors: [{ name: "Navy", hex: "#000080" }],
    image: "/placeholder.svg?height=200&width=200"
  }
]

export function CustomProductView() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className={`w-full h-auto transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4"
              onClick={handleZoom}
            >
              {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">{product.price.toLocaleString()} CFA</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Size</h2>
              <RadioGroup onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Color</h2>
              <RadioGroup onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.name}>
                    <RadioGroupItem
                      value={color.name}
                      id={`color-${color.name}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className="flex items-center justify-center rounded-full w-8 h-8 border-2 border-muted hover:border-primary peer-data-[state=checked]:border-primary"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="sr-only">{color.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button size="lg" className="w-full mb-4">Customize Now</Button>
            <p className="text-sm text-gray-600 text-center">
              Click &apos;Customize Now&apos; to proceed to the design studio and create your unique piece.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-auto mb-4 rounded-md"
                  />
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.price.toLocaleString()} CFA</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Our Story</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">FAQs</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Facebook</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Instagram</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Twitter</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>&copy; 2024 Clothing Design Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}