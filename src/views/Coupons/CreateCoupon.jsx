import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import { useNavigate } from 'react-router-dom'
const Coupon = () => {
  const Profile = localStorage.getItem('admin')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?.id
  const navigate = useNavigate()
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )
  const [couponName, setCouponname] = useState('')
  const [discount, setDiscount] = useState(null)
  const [status, setStatus] = useState('Active')
  const setData = async (e) => {
    e.preventDefault()
    const payload = {
      couponName,
      discount,
      status,
      user_id,
    }
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/coupon`, payload)
    console.log(res.data)
    toast.success(res.data);
  }
  console.log(NewProfile)
  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
            Set Coupons{''}
          </motion.h2>
          <button
            onClick={() => navigate('/coupon-list')}
            className="btn btn-dark"
            style={{ height: '45px' }}
          >
            Coupon List
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={setData}>
              <div className="container">
                <div className="row">
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Coupon Name</label>
                    <div>
                      <input
                        value={couponName}
                        onChange={(e) => setCouponname(e.target.value)}
                        type="text"
                        required
                        placeholder="Coupon Name"
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Discount</label>
                    <div>
                      <input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="Discount in % 1-100"
                        type="number"
                        required
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Limit</label>
                    <div>
                      <input
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="coupon usage 1-1000"
                        type="number"
                        required
                      />
                    </div>
                  </div>

                </div>
                <div className="input-group  col mt-5" style={{ gap: '20px' }}>
                  <label>Status</label>
                  <div className="">
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
                Submit
              </button>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Coupon
