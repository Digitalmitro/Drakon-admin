import React from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { CCard, CCardHeader, CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Tax = () => {
  const admin = localStorage.getItem('user')
  const user_id = JSON.parse(admin)._id
  const [TaxRate, setTaxRate] = useState(0)


 

  useEffect(() => {
 
  }, [])

 
  async function handleSave(e) {
    e.preventDefault()
    const payload ={
      TaxRate,
      user_id
    }
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload)
    message.success(res.data.message)
  }

  const navigate = useNavigate()
  return (
    <motion.div className="tax-area">
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
            Tax Rates{''}
          </motion.h2>
        </CCardHeader>
        <CCardBody>
          <motion.div>
            <form name="tax" onSubmit={handleSave}>
              <div className="container">
                {' '}
                <div className="row">
                  {' '}
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Tax Rate</label>
                    <div>
                      <input
                        value={TaxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        placeholder="Set Tax Rate in % 1-50"
                        type="number"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button  type="submit" variant="outlined" style={{ marginTop: '20px' }}>
                Save
              </Button>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </motion.div>
  )
}

export default Tax
