import React, { useState } from 'react';
import { Button } from "@mui/material";
import { message } from 'antd';
import axios from 'axios'; // Import axios

const Accounts_Privacy = () => {
  const Profile = localStorage.getItem('user');
  const NewProfile = JSON.parse(Profile);
  const user_id = NewProfile ? NewProfile._id : null; // Ensure user_id is defined
  const [orderWithoutLogin, setOrderLogin] = useState(false);
  const [logExixtAccInCheckout, setExixtAcc] = useState(false);
  const [registerAccInCheckout, setRegAcc] = useState(false);
  const [createAccount, setCreateacc] = useState(false);
  const [sentLinkToReset, setLink] = useState(false); // State for sending link to reset
  const [deleteUserIDFromOrder, setDelid] = useState(false);

  const handleSave = async () => {
    const payload = {
      orderWithoutLogin,
      logExixtAccInCheckout,
      registerAccInCheckout,
      createAccount,
      sentLinkToReset,
      deleteUserIDFromOrder,
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
      <div className="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Guest checkout</label>
        <div>
          <div className="mb-3 form-check">
            <input
              checked={orderWithoutLogin}
              onChange={(e) => setOrderLogin(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout1" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout1">
              Allow customers to place orders without an account Login
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              checked={logExixtAccInCheckout}
              onChange={(e) => setExixtAcc(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout2" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout2">
              Allow customers to log into an existing account during checkout
            </label>
          </div>
        </div>
      </div>
      <div className="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Account creation</label>
        <div>
          <div className="mb-3 form-check">
            <input
              checked={registerAccInCheckout}
              onChange={(e) => setRegAcc(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout3" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout3">
              Allow customers to create an account during checkout
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              checked={createAccount}
              onChange={(e) => setCreateacc(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout4" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout4">
              Allow customers to create an account on the "My account" page
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              checked={sentLinkToReset}
              onChange={(e) => setLink(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout5" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout5">
              When creating an account, send the new user a link to set their password
            </label>
          </div>
        </div>
      </div>
      <div className="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Personal data removal</label>
        <div>
          <div className="mb-3 form-check">
            <input
              checked={deleteUserIDFromOrder}
              onChange={(e) => setDelid(e.target.checked)}
              type="checkbox"
              className="form-check-input"
              id="checkout6" // Unique ID
            />
            <label className="form-check-label" htmlFor="checkout6">
              Allow personal data to be removed in bulk from orders
            </label>
            <div id="emailHelp" className="form-text" style={{ fontSize: '12px' }}>
              Adds an option to the orders screen for removing personal data in bulk. Note that
              removing personal data cannot be undone.
            </div>
          </div>
        </div>
      </div>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </div>
  );
};

export default Accounts_Privacy;
