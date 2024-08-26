import { motion } from 'framer-motion'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Modal, Select } from 'antd'

const AllOrder = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [selectedUserData, setSelectedUserData] = useState({})

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/order`)
      setData(res.data)
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error)
    }
  }

  // const handleDel = async (id) => {
  //   try {
  //     const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/coupon/${id}`)
  //     console.log(res.data)
  //     // Update the state after successful deletion
  //     getData()
  //     // Notify user
  //     toast.success('Coupon deleted successfully')
  //   } catch (error) {
  //     // Handle error
  //     console.error('Error deleting coupon:', error)
  //     // Notify user
  //     toast.error('Error deleting coupon')
  //   }
  // }

  useEffect(() => {
    getData()
  }, [])

  async function handleChange(status, orderId) {
    console.log('test')
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_API}/order/${orderId}`, {
        status,
      })
      getData()
    } catch (error) {
      console.log(error)
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Order List
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col"></th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th scope="col">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((res) => (
                  <tr key={res._id}>
                    <td>{res.user}</td>
                    <td
                      onClick={() => {
                        setModalOpen(true)
                        setSelectedUserData(res)
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <svg
                        height="20px"
                        width="20px"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        fill="#000000"
                        dangerouslySetInnerHTML={{
                          __html: `
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <style type="text/css"> .st0{fill:#000000;} </style>
              <g>
                <path class="st0" d="M512,282.163c-0.881-1.49-21.826-38.71-63.998-76.621c-21.106-18.932-47.584-38.03-79.667-52.494 c-32.041-14.455-69.743-24.183-112.337-24.162c-42.595-0.014-80.296,9.707-112.341,24.162 c-48.12,21.722-83.626,53.753-107.33,80.244C12.627,259.846,0.644,281.037,0,282.163l29.331,16.484l13.676,7.749l0.024-0.042 l0.007-0.014c0.895-1.629,20.324-34.688,56.487-66.326c18.068-15.848,40.244-31.331,66.274-42.786 c26.061-11.456,55.91-18.96,90.199-18.974c35.104,0.014,65.561,7.881,92.056,19.798c39.685,17.848,70.324,45.171,90.808,68.131 c10.245,11.462,17.938,21.785,22.98,29.1c2.525,3.657,4.385,6.566,5.574,8.49c0.594,0.966,1.02,1.679,1.286,2.119l0.252,0.448 l0.042,0.063l9.707-5.518l-9.734,5.469L512,282.163z"></path>
                <path class="st0" d="M255.999,210.339c-47.71,0-86.388,38.674-86.388,86.391c0,47.71,38.678,86.384,86.388,86.384 c47.71,0,86.388-38.674,86.388-86.384C342.386,249.014,303.708,210.339,255.999,210.339z"></path>
              </g>
            </g>
          `,
                        }}
                      />
                    </td>
                    <td>{res.createdDate}</td>
                    <td>
                      <Select
                        className={`order-${res.status}`}
                        defaultValue={res?.status}
                        style={{
                          width: 120,
                        }}
                        onChange={(e) => handleChange(e, res._id)}
                        options={[
                          {
                            value: 'Processing',
                            label: 'Processing',
                          },
                          {
                            value: 'Completed',
                            label: 'Completed',
                          },
                          {
                            value: 'Rejected',
                            label: 'Rejected',
                          },
                        ]}
                      />
                    </td>
                    <td>$ {(res.price * res.qty).toFixed(2)}</td>
                    <td>--</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>

      <Modal
        className="view-order"
        title=<div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            borderBottom: '1px solid lightgray',
            bottom: 0,
          }}
        >
          <h3>{selectedUserData?.user?.split(' ')[0]}</h3>
          <div
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor:
                selectedUserData?.status === 'Processing'
                  ? 'rgb(173, 166, 69)'
                  : selectedUserData?.status === 'Completed'
                    ? 'rgb(88, 190, 88)'
                    : 'rgb(187, 70, 70)',
              color: 'white',
            }}
          >
            {selectedUserData?.status}
          </div>
        </div>
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        cancelText="Completed"
        okText="Print"
      >
        <div className="row">
          <div className="col border me-2 p-2">
            <h4 className="mb-3">Billing Details</h4>
            <p>
              {selectedUserData?.billing?.billingfirstName +
                ' ' +
                selectedUserData?.billing?.billinglastName}
            </p>
            <p>{selectedUserData?.billing?.billingstreetAddress}</p>
            <p>{selectedUserData?.billing?.billingcity}</p>
            <p>{selectedUserData?.billing?.billingstate}</p>
            <p>{selectedUserData?.billing?.billingzipcode}</p>
            <p>{selectedUserData?.billing?.billingphone}</p>
            <p>{selectedUserData?.billing?.billingemail}</p>
          </div>
          <div className="col border p-2">
            <h4 className="mb-3">Shipping Details</h4>
            <p>
              {selectedUserData?.shipping?.shippingfirstName +
                ' ' +
                selectedUserData?.shipping?.shippinglastName}
            </p>
            <p>{selectedUserData?.shipping?.shippingstreetAddress}</p>
            <p>{selectedUserData?.shipping?.shippingcity}</p>
            <p>{selectedUserData?.shipping?.shippingstate}</p>
            <p>{selectedUserData?.shipping?.shippingzipcode}</p>
            <p>{selectedUserData?.shipping?.shippingphone}</p>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedUserData.title}</td>
                <td>{selectedUserData.qty}</td>
                <td>$ {(selectedUserData.price * selectedUserData.qty).toFixed(2)}</td>
                {/* <td>--</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  )
}

export default AllOrder
