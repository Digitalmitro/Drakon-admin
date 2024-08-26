import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CWidgetStatsB,
  } from '@coreui/react'
  import React from 'react'
  import MainChart from '../dashboard/MainChart'
  import { CChartLine } from '@coreui/react-chartjs'
  import { Button, styled } from '@mui/material'
  import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
  
  const Taxes = () => {
    const random = () => Math.round(Math.random() * 100)
  
    return (
      <div>
        <CRow>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              progress={{ color: 'success', value: 75 }}
              text="..."
              title="Total tax"
              value="$4,281.85"
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              progress={{ color: 'success', value: 75 }}
              text="..."
              title="Order tax"
              value="$4,281.85"
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              progress={{ color: 'success', value: 75 }}
              text="..."
              title="Shipping tax"
              value="$0.00"
            />
          </CCol>
          <CCol xs={3}>
            <CWidgetStatsB
              className="mb-3"
              progress={{ color: 'success', value: 75 }}
              text="..."
              title="Orders"
              value="28"
            />
          </CCol>
          <CCol xs={3}>
            <h4 id="traffic" className="card-title mb-0">
              Tax
            </h4>
            <div className="small text-body-secondary">January - July 2023</div>
          </CCol>
          <MainChart />
          <CCard style={{ marginTop: '50px' }}>
            <CCardHeader style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
              <h4>Products</h4>
              <input type="search" style={{ width: '80%', borderRadius: "5px" }} />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudDownloadIcon />}
              >
                Download
              </Button>
            </CCardHeader>
            <CCardBody>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Select Day</th>
                    <th scope="col">Tax title</th>
                    <th scope="col">Items sold</th>
                    <th scope="col">Net sales</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Category</th>
                    <th scope="col">Variations</th>
                    <th scope="col">Status</th>
                    <th scope="col">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                        />
                      </div>
                    </td>
                    <td>Bootstrap 4 CDN and Starter Template</td>
                    <td>5</td>
                    <td>$ 12913</td>
                    <td>2</td>
                    <td>OEM</td>
                    <td>4</td>
                    <td>Sold</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
            <CCardFooter style={{ textAlign: 'center' }}>
              <p style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                <span style={{ fontWeight: 'bold' }}>2</span> Products{' '}
                <span style={{ fontWeight: 'bold' }}>5</span> Items sold{' '}
                <span style={{ fontWeight: 'bold' }}>$10,255.00</span> Net sales{' '}
                <span style={{ fontWeight: 'bold' }}>4</span> Orders
              </p>
            </CCardFooter>
          </CCard>
        </CRow>
      </div>
    )
  }
  
  export default Taxes
  