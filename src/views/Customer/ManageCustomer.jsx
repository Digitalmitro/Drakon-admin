import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CHeader } from '@coreui/react'
import axios from 'axios'
// import { Button } from '@mui/material'
import { Button, Modal } from 'antd'
const ManageCustomer = () => {
  const initialData = [
    {
      _id: 0,
      name: 'John Doe',
      username: 'John',
      lastActive: 'May 2nd 24',
      registerDate: 'May 2nd 24',
      email: 'johndoe100@gmail.com',
      order: [
        { _id: 0, title: 'xyz', price: 10, qty: 2 },
        { _id: 1, title: 'xyz', price: 20, qty: 2 },
        { _id: 2, title: 'xyz', price: 10, qty: 5 },
      ],
    },
    {
      _id: 1,
      name: 'John Doe',
      username: 'John',
      lastActive: 'May 2nd 24',
      registerDate: 'May 2nd 24',
      email: 'johndoe100@gmail.com',
      order: [
        { _id: 0, title: 'xyz', price: 10, qty: 2 },
        { _id: 1, title: 'xyz', price: 10, qty: 2 },
        { _id: 2, title: 'xyz', price: 10, qty: 2 },
      ],
    },
    {
      _id: 2,
      name: 'John Doe',
      username: 'John',
      lastActive: 'May 2nd 24',
      registerDate: 'May 2nd 24',
      email: 'johndoe100@gmail.com',
      order: [
        { _id: 0, title: 'xyz', price: 10, qty: 2 },
        { _id: 1, title: 'xyz', price: 10, qty: 2 },
        { _id: 2, title: 'xyz', price: 10, qty: 2 },
      ],
    },
    {
      _id: 3,
      name: 'May Doe',
      username: 'May',
      lastActive: 'Mar 2nd 24',
      registerDate: 'Jan 2nd 24',
      email: 'rajdeep@gmail.com',
      order: [
        { _id: 0, title: 'xyz', price: 30, qty: 2 },
        { _id: 1, title: 'xyz', price: 10, qty: 5 },
        { _id: 2, title: 'xyz', price: 60, qty: 2 },
      ],
    },
  ]

  const [data, setData] = useState([])
  const [filter, setFilter] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getData()
  }, [searchQuery])

  const getData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/getclients`)
      setData(data)
      setFilter(data)
    } catch (error) {
      console.log(error)
    }
  }
  const calculateTotalSpend = (orders) => {
    return orders?.reduce((total, order) => total + order.price * order.qty, 0)
  }
  console.log(data)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  const filteredData = data?.filter(
    (item) =>
      item?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const [orderData, setOrderData] = useState([])

  async function fetchClient(id) {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/order/${id}`)
      setOrderData(data.order)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(orderData)
  const [modal1Open, setModal1Open] = useState(false)
  return (
    <CCard>
      <CHeader>
        <h3>Manage Customers</h3>
      </CHeader>
      <CCardBody>
        <div className="d-flex mb-3">
          <h4>Customer</h4>
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            type="search"
            className="ms-5 border border-black"
            style={{ borderRadius: '5px' }}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Last Active</th>
                <th scope="col">Date Registered</th>
                <th scope="col">Email</th>
                <th scope="col">Orders</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((res) => (
                <tr key={res._id}>
                  <td>{res.firstName ? res.firstName + ' ' + res.lastName : "--"}</td>
                  <td>{res.displayName || "--"}</td>
                  <td>{res.lastActive || "--"}</td>
                  <td>{res.registerDate || "--"}</td>
                  <td>{res.email || "--"}</td>
                  <td>{res?.order?.length || "--"}</td>
                  <td>
                    <Button
                      onClick={() => {
                        fetchClient(res._id)
                        setModal1Open(true)
                      }}
                      variant="contained"
                      color="success"
                    >
                      View Orders
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          title="Order Details"
          style={{
            // top: 20,
            height: '400px',
            overflowY: 'auto',
          }}
          centered
          open={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
        >
          {
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Images</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((res) => (
                    <tr key={res._id}>
                      <td>{res._id}</td>
                      <td><img src={res.image[0]} alt='order img...' style={{width:"60px", height:"60px"}}/></td>
                      <td>{res.title}</td>
                      <td>$ {res.price}</td>
                      <td>{res.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Total Spent:</p>
                <p>$ {calculateTotalSpend(orderData).toFixed(2)}</p>
              </div>
              <hr />
            </div>
          }
        </Modal>
      </CCardBody>
    </CCard>
  )
}

export default ManageCustomer
