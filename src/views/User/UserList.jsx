import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
const UserList = () => {
    const navigate=useNavigate()
    const [adminDetails, setAdminDetails] = useState()
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/getalladmin`)
      setAdminDetails(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <motion.div className="tax-area">
        <CCard className="mb-4">
          <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
            <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
              User List
            </motion.h2>
            <motion.h2 onClick={()=>navigate('/user')} className="  fw-bold" style={{ marginBottom: '40px' }}>
              <button className='btn'>Add New User</button>
            </motion.h2>
          </CCardHeader>
          <CCardBody>
            <motion.div>
            <table className="table">
            <thead>
              <tr>
              <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {adminDetails?.map((e) => (
                <tr key={e._id}>
                     <td>{e.email}</td>
                  <td>{e.email}</td>
                  <td>Admin</td>
                </tr>
              ))}
            </tbody>
          </table>
            </motion.div>
          </CCardBody>
        </CCard>
      </motion.div>
    </>
  )
}
export default UserList