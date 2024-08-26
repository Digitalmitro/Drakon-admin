import React, { useState } from 'react';
import { Button, FormControlLabel, Switch } from '@mui/material';
import { message } from 'antd';
import axios from 'axios';
import { CCard, CCardBody, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const Payments = () => {
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?._id
  // Initialize state variables outside of the component function
  const [CashOnDelivery, setCashOnDelivery] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [stripe, setStripe] = useState(false);
  const [authorizeNet, setAuthorize] = useState(false);

  const handleSave = async () => {
    const payload = {
      CashOnDelivery,
      paypal,
      stripe,
      authorizeNet,
      user_id, // Assuming user_id is defined elsewhere
    };
    console.log(payload);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload);
      message.success(res.data.message);
    } catch (error) {
      console.error('Error saving payment settings:', error);
      message.error('Failed to save payment settings');
    }
  };

  return (
    <div>
      <h4>Payment Methods</h4>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <CCard style={{ width: '100%' }}>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Method</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Enabled</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>
                    <h6>Cash On Delivery(COD)</h6>
                  </CTableDataCell>
                  <CTableDataCell>
                    <FormControlLabel control={<Switch checked={CashOnDelivery} onChange={(e) => setCashOnDelivery(e.target.checked)} />} />
                  </CTableDataCell>
                  <CTableDataCell>
                    Have your customers pay with cash (or by other means) upon delivery.
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>
                    <h6>PayPal Gateway</h6>
                  </CTableDataCell>
                  <CTableDataCell>
                    <FormControlLabel control={<Switch checked={paypal} onChange={(e) => setPaypal(e.target.checked)} />} />
                  </CTableDataCell>
                  <CTableDataCell>Offer PayPal gateway integration</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>
                    <h6>Stripe Gateway</h6>
                  </CTableDataCell>
                  <CTableDataCell>
                    <FormControlLabel control={<Switch checked={stripe} onChange={(e) => setStripe(e.target.checked)} />} />
                  </CTableDataCell>
                  <CTableDataCell>Offer Stripe gateway integration</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>
                    <h6>Authorize.Net</h6>
                  </CTableDataCell>
                  <CTableDataCell>
                    <FormControlLabel control={<Switch checked={authorizeNet} onChange={(e) => setAuthorize(e.target.checked)} />} />
                  </CTableDataCell>
                  <CTableDataCell>Offer Authorize.net gateway integration</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </div>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </div>
  );
};

export default Payments;
