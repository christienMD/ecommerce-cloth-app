'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type ClothingItem = {
  id: number
  name: string
  description: string
  price: number
  rating: number
  sizes: string[]
  color: string
  categories: string[]
  image: string
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    description: "A timeless white t-shirt for any occasion",
    price: 11994, // 19.99 * 600
    rating: 4.5,
    sizes: ["S", "M", "L", "XL"],
    color: "white",
    categories: ["men", "t-shirt"],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    name: "Women's V-Neck Blouse",
    description: "Elegant v-neck blouse for women",
    price: 17994, // 29.99 * 600
    rating: 4.2,
    sizes: ["XS", "S", "M", "L"],
    color: "blue",
    categories: ["women", "t-shirt"],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    name: "Kids' Colorful Pullover",
    description: "Fun and cozy pullover for kids",
    price: 14994, // 24.99 * 600
    rating: 4.8,
    sizes: ["XS", "S", "M"],
    color: "red",
    categories: ["kids", "pullover"],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    name: "Men's Athletic Fit Pullover",
    description: "Performance pullover for active lifestyles",
    price: 23994, // 39.99 * 600
    rating: 4.6,
    sizes: ["M", "L", "XL", "XXL"],
    color: "black",
    categories: ["men", "pullover"],
    image: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 8,
    name: "Unisex Hoodie",
    description: "Cozy hoodie suitable for all genders",
    price: 26994, // 44.99 * 600
    rating: 4.6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "gray",
    categories: ["men", "women", "pullover"],
    image: "/placeholder.svg?height=200&width=200"
  }
]

export function CustomProductList() {
  const [filters, setFilters] = useState({
    category: [] as string[],
    size: [] as string[],
    color: [] as string[],
  })

  const handleFilterChange = (type: 'category' | 'size' | 'color', value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }
      return newFilters
    })
  }

  const filteredClothingItems = clothingItems.filter(item => 
    (filters.category.length === 0 || filters.category.some(cat => item.categories.includes(cat))) &&
    (filters.size.length === 0 || item.sizes.some(size => filters.size.includes(size))) &&
    (filters.color.length === 0 || filters.color.includes(item.color))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Clothing Collection</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <div className="space-y-2">
              {["men", "women", "kids", "t-shirt", "pullover"].map(category => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => handleFilterChange('category', category)}
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Size</h2>
            <div className="space-y-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                <div key={size} className="flex items-center">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.size.includes(size)}
                    onCheckedChange={() => handleFilterChange('size', size)}
                  />
                  <label htmlFor={`size-${size}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Color</h2>
            <div className="space-y-2">
              {["white", "blue", "red", "black", "gray"].map(color => (
                <div key={color} className="flex items-center">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.color.includes(color)}
                    onCheckedChange={() => handleFilterChange('color', color)}
                    className="border-2 w-6 h-6 rounded-full p-0.5"
                    style={{ backgroundColor: color, borderColor: color === 'white' ? 'black' : color }}
                  />
                  <label htmlFor={`color-${color}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClothingItems.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">{item.price.toFixed(2)} CFA</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({item.rating})</span>
                      </div>
                    </div>
                    <div className="flex justify-end items-center mb-4">
                    <Link href={`/customize/${item.id}`} passHref>
                      <Button>Customize</Button>
                    </Link>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default CustomProductList;