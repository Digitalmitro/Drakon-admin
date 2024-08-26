import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
import moment from 'moment';
// import { color } from "chart.js/helpers";
const AttendaceList = () => {
  const { id } = useParams()

  const [date, setDate] = useState("")

  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const navigate = useNavigate()

  const [data3, setData3] = useState([])
  console.log(process.env.REACT_APP_BACKEND_API)
  const Getdata = async () => {
    const ressss = await axios.get(`${process.env.REACT_APP_BACKEND_API}/attendance/${id}`)

    setData3(ressss.data.attendance)
   
  }
  const groupedData = Object.values(
    data3.reduce((acc, curr) => {
      // Group entries by currentDate
      const currentDate = curr.currentDate
      // console.log("Current:", curr);
      if (!acc[currentDate]) {
        acc[currentDate] = {
          currentDate,
          userName: '',
          userEmail: '',
          punchin: '',
          punchOut: '',
          time: '',
          status: '',
          ip: '',
        }
      }

      // Merge punchin, punchOut, status, and ip
      if (curr.userName) {
        acc[currentDate].userName = curr.userName
      }
      if (curr.userEmail) {
        acc[currentDate].userEmail = curr.userEmail
      }
      if (curr.punchin) {
        acc[currentDate].punchin = curr.punchin
      }
      if (curr.punchOut) {
        acc[currentDate].punchOut = curr.punchOut
      }
      if (curr.time) {
        acc[currentDate].time = curr.time
      }
      if (curr.status) {
        acc[currentDate].status = curr.status
      }
      if (curr.ip) {
        acc[currentDate].ip = curr.ip
      }
      console.log("acc[currentDate]:", acc[currentDate]);
      return acc
    }, {}),
  )
  console.log(groupedData)
  // State to store the selected month
  const [selectedMonth, setSelectedMonth] = useState('')

  // Function to handle the change in the select input
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value)
  }

// Filter the data based on the selected month and date
const filteredData = groupedData.filter((entry) => {
  // Check if the entry's currentDate includes the selected month
  if (!entry.currentDate.includes(selectedMonth)) {
    return false;
  }

  // Check if the entry's currentDate matches the selected date
  const formattedDate = moment(date).format("MMM Do YY");;
  // console.log(formattedDate);
  if (date && entry.currentDate === formattedDate) {
    return true;
  }

  // If no date is selected, return true to include all entries for the selected month
  return !date;
});

  // console.log('filter', filteredData)


  useEffect(() => {
    Getdata()
  }, [])
  const downloadExcel = () => {
    if (filteredData.length === 0) {
      console.error('No data to download')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Convert workbook to array buffer
    const arrayBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    // Convert array buffer to Blob
    const excelBlob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // Create a download link
    const url = URL.createObjectURL(excelBlob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'attendance.xlsx')
    document.body.appendChild(link)

    // Trigger the download
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }


  const totalLate = filteredData.filter((e) => e.status === "LATE").length



  return (
    <>
      <CCard>
        <motion.div className=" main-container1 container  ">
          <ToastContainer />
          <div className="container margin-container ">
            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
              <CCardHeader>
                <motion.h2 className=" fw-bold ms-3">Attendance Activities</motion.h2>
              </CCardHeader>

              <motion.h1 className=" fw-bold ms-3">
                <button className="btn btn-success" onClick={downloadExcel}>
                  <i class="fa-solid fa-download"></i> Attendance Data
                </button>
              </motion.h1>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "10px" }}>
              <div style={{ display: 'flex', gap: "20px"}}>
                <select
                  style={{ width: '130px', height: '45px' }}
                  onChange={handleMonthChange}
                  
                >
                  <option value="">Select Month</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="July">July</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </select>
                <input onChange={(e) => setDate(e.target.value)} style={{ width: '130px', height: '45px' }} type="date" />
              </div>
              <p style=
              {{ fontWeight: 'bold', border: "1px solid", padding: "10px", borderRadius: "10px", background: "orange", color: "white", textTransform: "uppercase" }}>No. of Late: {totalLate}</p>
            </div>

            <motion.div className="table-responsive  container">
              <table class="table table-striped">
                <thead>
                  <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                    <th scope="col">Date</th>
                    <th scope="col">PunchIn</th>
                    <th scope="col">PunchOut</th>
                    <th scope="col">production</th>
                    <th scope="col">Status</th>
                    <th scope="col">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((res, index) => {
                    return (
                      <tr key={res._id}>
                        <td>{res.userName}</td>
                        <td>{res.userEmail}</td>
                        <td>{res.currentDate}</td>
                        <td>{res.punchin}</td>
                        <td>{res.punchOut}</td>
                        <td>{res.time}</td>
                        <td
                          style={{
                            color: res.status === 'LATE' ? 'red' : 'green',
                          }}
                        >
                          {res.status}
                        </td>
                        <td>{res.ip}</td>
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
export default AttendaceList
