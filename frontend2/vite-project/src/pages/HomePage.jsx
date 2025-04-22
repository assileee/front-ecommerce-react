import { useEffect, useState } from "react"
import { fetchProducts } from "../utils/fetchProducts.js"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!products.length) return <p>No products found</p>
  console.log(products)

  return (
    <div>
      <h1 className="text-center">App</h1>
      <ul>
        {products.map((product,index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
