import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Button } from '@mui/material'
import { Select, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { StateSelect } from 'react-country-state-city/dist/cjs'

const Shipping = () => {
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?._id
  const [state, setState] = useState('')
  const [charges, setCharges] = useState('')
  const handleSave = async () => {
    const payload = {
      ShippingState: [
        {
          state,
          charges,
        },
      ],
      user_id,
    }
    console.log(payload)
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload)
    message.success(res.data.message)
  }
  const options = [
    { lable: 'Charge Applicable', value: 'Charge Applicable' },
    { lable: 'Free Delivery', value: 'Free Delivery' },
  ]
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [stateid, setstateid] = useState(0)
  const [addState, setAddState] = useState(false)
  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h4>Shipping States</h4>
        <Button onClick={() => setAddState(!addState)} variant="outlined">
          {addState ? 'Hide' : 'Add'} Field
        </Button>
      </div>
      <p style={{ fontSize: '12px', marginTop: '20px' }}>
        A shipping zone consists of the region(s) you'd like to ship to and the shipping method(s)
        offered. A shopper can only be matched to one zone, and we'll use their shipping address to
        show them the methods available in their area.
      </p>
      <CCard style={{ marginBottom: '20px' }}>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">State</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delivery Charges</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell className="shipping">
                  <StateSelect
                    countryid={10}
                    onChange={(e) => {
                      setstateid(e.id)
                      setState(e.name)
                    }}
                    placeHolder="Select State"
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <Select
                    value={charges}
                    style={{ height: '50px' }}
                    options={options}
                    onChange={(e) => {
                      setSelectedOption(e)
                      setCharges(e)
                    }}
                    defaultValue={selectedOption.value}
                  />
                </CTableDataCell>
              </CTableRow>
              {addState && (
                <CTableRow>
                  <CTableDataCell className="shipping">
                    <StateSelect
                      countryid={10}
                      onChange={(e) => {
                        setstateid(e.id)
                      }}
                      placeHolder="Select State"
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <Select
                      style={{ height: '50px' }}
                      options={options}
                      onChange={(e) => setSelectedOption(e)}
                      defaultValue={selectedOption.value}
                    />
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </div>
  )
}

export default Shipping
