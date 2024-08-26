import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Best_Purchased_Product = () => {
  // Function to find best selling products
  const findBestSellingProducts = (ordersData) => {
    // Aggregate orders data to find best selling products
    const productMap = new Map()
    ordersData.forEach((product) => {
      const productId = product._id
      const quantity = product.qty
      if (productMap.has(productId)) {
        productMap.set(productId, productMap.get(productId) + quantity)
      } else {
        productMap.set(productId, quantity)
      }
    })

    // Sort products by quantity sold
    const sortedProducts = Array.from(productMap.entries()).sort((a, b) => b[1] - a[1])

    // Return top 5 best selling products (adjust as needed)
    return sortedProducts.slice(0, 1).map(([productId, quantity]) => ({
      productId,
      quantity,
    }))
  }

  const [products, setProducts] = useState([])
  useEffect(() => {
    getOrders()
  }, [])

  async function getOrders() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/order`)

      // Create a map to store the count of each _id
      const idCountMap = new Map()
      data.forEach((item) => {
        const id = item.product_id
        idCountMap.set(id, (idCountMap.get(id) || 0) + 1)
      })

      // Find the highest count
      let maxCount = 0
      idCountMap.forEach((count) => {
        if (count > maxCount) {
          maxCount = count
        }
      })

      // Filter the data based on the highest count
      const filteredIds = []
      idCountMap.forEach((count, id) => {
        if (count === maxCount) {
          filteredIds.push(id)
        }
      })
      console.log(filteredIds)
      const filteredData = data.filter((item) => item.product_id === filteredIds[0])

      setProducts(filteredData)
    } catch (error) {
      console.log(error)
    }
  }

  const bestSellingProduct = products.filter(
    (e) => e._id === findBestSellingProducts(products)[0].productId,
  )
  console.log(products)
  return (
    <div>
      {
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid gray',
            borderRadius: '10px',
          }}
        >
          <div style={{border: '1px solid gray'}}>
            <img src={products[0]?.image[0]} width={300} />
          </div>
          <div style={{padding: "5px"}}>
            <h3>{products[0]?.title}</h3>
            <h4>Price: $ {products[0]?.price}</h4>
            <h5>Total Sales: {products.length}</h5>
          </div>
        </div>
      }
    </div>
  )
}

export default Best_Purchased_Product
