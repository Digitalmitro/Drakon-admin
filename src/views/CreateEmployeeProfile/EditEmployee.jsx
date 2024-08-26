import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, useParams } from 'react-router-dom'
const EditUserDetails = () => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const [name, setName] = useState('')
  const [aliceName, setAliceName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('Day')

  const [userData, setUserData] = useState(null)

  const navigate = useNavigate()

  const { id } = useParams()
  const handelUpdate = async (e) => {
    e.preventDefault()
    const payload = {
      user_id: id,
    }
    if (name !== '') {
      payload.name = name
    }
    if (aliceName !== '') {
      payload.aliceName = aliceName
    }
    if (email !== '') {
      payload.email = email
    }
    if (phone !== '') {
      payload.phone = phone
    }
    if (password !== '') {
      payload.password = password
    }
    if (type !== '') {
      payload.type = type
    }
    console.log(payload)
    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_API}/updateuser`, payload)

      toast.success(res.data, {})
      setName('')
      setAliceName('')
      setEmail('')
      setPhone('')
      setPassword('')
      setTimeout(() => {
        navigate('/all-leads')
      }, 1500)
    } catch (error) {
      toast.warning(error.response.data, {})
    }
  }
  const getDetails = async () => {
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/alluser/${id}`)
    console.log('testdata', data.data[0])
    setUserData(data.data[0])
  }

  useEffect(() => {
    getDetails()
  }, [])
  return (
    <>
      <ToastContainer />
      <motion.div className=" main-container1 container mb-5 ">
        <ToastContainer />
        <div className="container margin-container mb-5">
          <motion.h2 className="  fw-bold">Update Employee Profile</motion.h2>
          <motion.div>
            <form onSubmit={handelUpdate}>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Name</label>
                <div style={{ marginLeft: '27px' }}>
                  <input
                    type="text"
                    // required
                    value={name}
                    placeholder={userData?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Alice Name</label>
                <div style={{ marginLeft: '27px' }}>
                  <input
                    type="text"
                    // required
                    value={aliceName}
                    placeholder={userData?.aliceName}
                    onChange={(e) => setAliceName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Email</label>
                <div style={{ marginLeft: '30px' }}>
                  <input
                    type="email"
                    // required
                    value={email}
                    placeholder={userData?.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Phone</label>
                <div className="ms-4">
                  <input
                    minLength="10"
                    type="number"
                    // required
                    value={phone}
                    placeholder={userData?.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Password</label>
                <div>
                  <input
                    minLength="6"
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Employee Type</label>
                <div>
                  <select
                    // required
                    value={type}
                    placeholder={userData?.type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Day">Day</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-dark" type="submit">
                Update
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
export default EditUserDetails
