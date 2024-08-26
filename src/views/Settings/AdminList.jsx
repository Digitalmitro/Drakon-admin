import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'

const AdminList = () => {
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
    <div>
      <CCard>
        <CCardHeader>Admin List</CCardHeader>
        <CCardBody className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {adminDetails?.map((e) => (
                <tr key={e._id}>
                  <td>{e.email}</td>
                  <td>Admin</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default AdminList
