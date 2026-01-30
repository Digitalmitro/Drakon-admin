import { CCard, CCardBody, CHeader } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewOrder = () => {
  // Sample order data
//   const orderDetails = [
//     { id: 1, product: 'Product 1', quantity: 2, price: 20 },
//     { id: 2, product: 'Product 2', quantity: 1, price: 30 },
//     { id: 3, product: 'Product 3', quantity: 3, price: 15 },
//   ]

const {id} = useParams()
  const [orderDetails, setOrderDetails] = useState([])
  useEffect(() => {
    getOrderDetails()
  }, [])

  async function getOrderDetails() {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_API}/specific-order/${id}`)
        setOrderDetails(data)
    } catch (error) {
        console.log(error);
    }
  }

  console.log(orderDetails);
  return (
    <CCard>
      <CHeader><h2>View Order</h2></CHeader>
      <CCardBody>
        <div className="mb-3">
          <strong>Order ID:</strong> {orderDetails?._id}
          <div><strong>Purchase Date:</strong> {orderDetails?.orderDate ? new Date(orderDetails.orderDate).toLocaleString() : ''}</div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails?.items?.map((it, idx) => (
                <tr key={idx}>
                  <td>{it.name}</td>
                  <td>{it.size || '—'}</td>
                  <td>{it.quantity}</td>
                  <td>${(it.unitPrice || 0).toFixed(2)}</td>
                  <td>${((it.unitPrice || 0) * (it.quantity || 0)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default ViewOrder
