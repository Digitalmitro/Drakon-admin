import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
const AttendanceDayShift = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Date')
  const [searchResults, setSearchResults] = useState([])
  const Getdata = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/alluser`)
    setData(res.data)
    const filteredData = res.data.filter((e) => e.type === "Day")
    filterAndSortResults(searchTerm, sortBy, filteredData)
  }
  console.log(data)
  const handleDel = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API}/alluser/${id}`)
      Getdata()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    Getdata()
  }, [searchTerm, sortBy])
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const filterAndSortResults = (searchTerm, sortBy, data) => {
    let filteredResults = data.filter((item) =>
      Object.values(item).join(' ').toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (sortBy === 'Date') {
      filteredResults.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else if (sortBy === 'Name') {
      filteredResults.sort((a, b) => a.name.localeCompare(b.name))
    }

    setSearchResults(filteredResults)
  }
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <>
      <CCard>
        <motion.div className=" main-container1 margin-container">
          <div className="container margin-container">
            <CCardHeader>
              <motion.h2 className=" fw-bold ms-3">Day Shift Attendance</motion.h2>
            </CCardHeader>

            <motion.div className="mt-4">
              <div className="d-flex">
                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    className="ms-2"
                    name="sortBy"
                    id="sortBy"
                    style={{ height: '30px' }}
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="Date">Date</option>
                    <option value="Name">Name</option>
                  </select>
                </div>
              </div>
            </motion.div>
            <motion.div className="table-responsive  container">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((res, index) => {
                    return (
                      <tr key={res._id}>
                        <td>{res.name}</td>
                        <td>{res.email}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => navigate(`/attendace-list/${res._id}`)}
                          >
                            View Attendance
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.div>
      </CCard>
    </>
  )
}
export default AttendanceDayShift
