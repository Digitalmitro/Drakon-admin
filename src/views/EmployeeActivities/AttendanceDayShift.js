import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
const DayShift = () => {
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
                    <th scope="col">Phone</th>
                    {/* <th scope="col">callBacks</th>
                    <th scope="col">Transfers</th>
                    <th scope="col">Sales</th> */}

                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((res, index) => {
                    return (
                      <tr key={res._id}>
                        <td>{res.name}</td>
                        <td>{res.email}</td>
                        <td>{res.phone}</td>
                        {/* <td>{res.callback.length}</td>
                        <td>{res.transfer.length}</td>

                        <td>{res.sale.length}</td> */}

                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => navigate(`/view-details/${res._id}`)}
                          >
                            View
                          </button>

                          <button
                            className="btn btn-dark ms-2"
                            onClick={() => navigate(`/edit-details/${res._id}`)}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#ffffff"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {' '}
                                <title></title>{' '}
                                <g id="Complete">
                                  {' '}
                                  <g id="edit">
                                    {' '}
                                    <g>
                                      {' '}
                                      <path
                                        d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                                        fill="none"
                                        stroke="#ffffff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                      ></path>{' '}
                                      <polygon
                                        fill="none"
                                        points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                                        stroke="#ffffff"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                      ></polygon>{' '}
                                    </g>{' '}
                                  </g>{' '}
                                </g>{' '}
                              </g>
                            </svg>
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDel(res._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
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
export default DayShift
