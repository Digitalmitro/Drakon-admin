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
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Email = () => {
  const navigate = useNavigate("")
  const id = 123456
  return (
    <CCard>
      <CCardBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Case</CTableHeaderCell>
              <CTableHeaderCell scope="col">Content type</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Account creation</CTableDataCell>
              <CTableDataCell>text/html</CTableDataCell>
              <CTableDataCell>
                <Button onClick={() => navigate(`/settings/email-template/${id}`)} variant="outlined">Manage</Button>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Items in cart</CTableDataCell>
              <CTableDataCell>text/html</CTableDataCell>
              <CTableDataCell>
                <Button onClick={() => navigate(`/settings/email-template/${id}`)} variant="outlined">Manage</Button>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Order placed</CTableDataCell>
              <CTableDataCell>text/html</CTableDataCell>
              <CTableDataCell>
                <Button onClick={() => navigate(`/settings/email-template/${id}`)} variant="outlined">Manage</Button>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Refund/Replace</CTableDataCell>
              <CTableDataCell>text/html</CTableDataCell>
              <CTableDataCell>
                <Button onClick={() => navigate(`/settings/email-template/${id}`)} variant="outlined">Manage</Button>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Delivery date</CTableDataCell>
              <CTableDataCell>text/html</CTableDataCell>
              <CTableDataCell>
                <Button onClick={() => navigate(`/settings/email-template/${id}`)} variant="outlined">Manage</Button>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Email
