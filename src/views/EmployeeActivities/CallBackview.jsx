import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
const CallBackViewDetails = () => {
  const { id } = useParams()
  const Profile = localStorage.getItem('admin')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile._id
  console.log('NewProfile', NewProfile)
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const [data, setData] = useState({})
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/callback-1/${id}`)
    setData(res.data)
  }
  console.log(data)
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <motion.div className=" main-container1 container mb-5 ">
        <ToastContainer />
        <div className="container margin-container shadow-lg mb-5">
          <motion.h2 className="  fw-bold">CallBack</motion.h2>
          <motion.div>
            <form>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Name</label>
                <div style={{ marginLeft: '27px' }}>
                  <input type="text" disabled placeholder={data.name} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Email</label>
                <div style={{ marginLeft: '30px' }}>
                  <input type="email" disabled placeholder={data.email} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>Phone</label>
                <div className="ms-4">
                  <input type="number" disabled placeholder={data.phone} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>transferTo</label>
                <div>
                  <input type="text" disabled placeholder={data.transferTo} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>domainName</label>
                <div>
                  <input type="text" disabled placeholder={data.domainName} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>address</label>
                <div style={{ marginLeft: '16px' }}>
                  <input type="text" disabled placeholder={data.address} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>country</label>
                <div style={{ marginLeft: '20px' }}>
                  <input type="text" disabled placeholder={data.country} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>zipcode</label>
                <div style={{ marginLeft: '17px' }}>
                  <input type="text" disabled placeholder={data.zipcode} />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>comments</label>
                <div>
                  <textarea
                    minLength="6"
                    type="text"
                    disabled
                    placeholder={data.comments}
                    style={{ width: '700px', height: '70px' }}
                  />
                </div>
              </div>
              <div className="input-group mb-2" style={{ gap: '20px' }}>
                <label>buget</label>
                <div style={{ marginLeft: '27px' }}>
                  <input type="text" disabled placeholder={data.buget} />
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
export default CallBackViewDetails
