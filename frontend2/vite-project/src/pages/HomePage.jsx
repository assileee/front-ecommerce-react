import { useEffect, useState } from "react"
import { fetchProducts } from "../utils/fetchProducts.js"
import CardComponent from "../components/CardComponent.jsx"
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
<section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
  {products.map((product) => (
    <CardComponent
      key={product._id || product.id}
      title={product.name || product.productName}
      description={product.description || product.productDescription}
      price={product.price}
      imageUrl={
        typeof product.imageUrl === "string"
          ? product.imageUrl
          : "https://placehold.co/300x200"
      }
    />
  ))}
</section>
  )

}

export default HomePage
