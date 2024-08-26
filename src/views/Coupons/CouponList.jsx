import { motion } from 'framer-motion';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CouponList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/coupon`);
      setData(res.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching data:', error);
    }
  };

  const handleDel = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}/coupon/${id}`);
      console.log(res.data);
      // Update the state after successful deletion
      getData();
      // Notify user
      toast.success('Coupon deleted successfully');
    } catch (error) {
      // Handle error
      console.error('Error deleting coupon:', error);
      // Notify user
      toast.error('Error deleting coupon');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ToastContainer />
      <CCard className="mb-4">
        <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
          <motion.h2 className="fw-bold" style={{ marginBottom: '40px' }}>
            Coupons List
          </motion.h2>
          <button onClick={() => navigate('/coupon')} className="btn btn-dark" style={{ height: '45px' }}>
            Set Coupon
          </button>
        </CCardHeader>
        <CCardBody>
          <motion.div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Coupon Name</th>
                  <th scope="col">Discount%</th>
                  <th scope="col">limit</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((res) => (
                  <tr key={res._id}>
                    <td>{res.couponName}</td>
                    <td>{res.discount}</td>
                    <td>
                    {res.limit}
                      {/* <button className="btn btn-success">{res.status}</button> */}
                    </td>
                    <tb>{res.expiryDate}</tb>
                    <td>
                      <button className="btn btn-success" style={{background:"teal",  color:"white"}}>{res.status}</button>
                    </td>
                    
                    <td className="d-flex">
                      <button className="btn btn-danger" onClick={() => handleDel(res._id)}>Remove</button>
                      <button onClick={() => navigate(`/update-coupon/${res._id}`)} className="btn btn-dark ms-4">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CouponList;
