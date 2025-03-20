import { motion } from 'framer-motion'
import { message } from 'antd'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import * as XLSX from "xlsx";

const ProductList = () => {
  const [jsonData, setJsonData] = useState(null)
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [latestData, setLatestData] = useState([])
  const itemsPerPage = 5

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        let allData = []; // Array to accumulate data from all sheets

        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            allData = allData.concat(parsedData); // Concatenate data from each sheet
        });

        // Send allData in a single POST request
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_API}/products/batch`, allData)
                .then((res) => {
                    message.success(res.data);
                    getData(); // Assuming this function gets data from somewhere
                })
                .catch((e) => message.error(e));
        } catch (error) {
            console.error(error);
        }
    };

    reader.readAsArrayBuffer(file);
};

  console.log(jsonData)
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/feature-products`)
      setData(res.data.reverse())
     
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error)
    }
  }

  const handleDel = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/feature-products/${id}`)
      console.log(res.data)
      // Update the state after successful deletion
      getData()
      // Notify user
      message.error('Product deleted successfully')
    } catch (error) {
      // Handle error
      console.error('Error deleting Product:', error)
      // Notify user
      message.error('Error deleting Product')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Product List
          </motion.h2>
          <div className="d-flex" style={{ gap: '10px' }}>
            <Button
              style={{ height: '45px' }}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Excel
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
            </Button>
            <button
              onClick={() => navigate('/create-leads-profile')}
              className="btn btn-dark"
              style={{ height: '45px' }}
            >
              Add Products
            </button>
          </div>
        </CCardHeader>
        <CCardBody>
          <input
            type="text"
            placeholder="Search by Product Title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((res) => (
                  <tr key={res._id}>
                    <td>{res.title}</td>
                    <td style={{ width: '5%' }}>
                      <img src={res.image[0]} className="img-fluid" alt="" />
                    </td>
                    <td>
                      <p style={{ color: 'green' }}>{res.price}</p>
                    </td>
                    <td>
                      <p>{res.stock}</p>
                    </td>
                    <td>
                      <p>{res.category}</p>
                    </td>
                    <td className="d-flex">
                      <button className="btn btn-danger" onClick={() => handleDel(res._id)}>
                        Remove
                      </button>
                      <button
                        onClick={() => navigate(`/update-product/${res._id}`)}
                        className="btn btn-dark ms-4"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ProductList
