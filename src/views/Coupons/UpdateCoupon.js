import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CHeader } from '@coreui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCoupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    couponName: '',
    discount: '',
    limit: '',
    status: '',
    expiryDate: '',
  });

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/coupon/${id}`);
      setFormData({
        couponName: res.data.couponName,
        discount: res.data.discount,
        limit: res.data.limit,
        status: res.data.status,
        expiryDate: res.data.expiryDate,
      });
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        couponName: formData.couponName,
        discount: formData.discount,
        limit: formData.limit,
        status: formData.status,
        expiryDate: formData.expiryDate,
      };
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_API}/coupon/${id}`, payload);
      console.log(response.data); // Log the response from the server
      toast.success('Coupon updated successfully');
      setFormData({
        couponName: '',
        discount: '',
        limit: '',
        status: '',
        expiryDate: '',
      });
      setTimeout(() => {
        navigate("/coupon-list");
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error('Error updating coupon');
    }
  };

  return (
    <>
      <ToastContainer />
      <CCard>
        <CHeader>
          <h2>Update Coupon</h2>
        </CHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Coupon Name</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Coupon Name"
                        value={formData.couponName}
                        onChange={(e) => setFormData({ ...formData, couponName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Discount</label>
                    <div>
                      <input
                        type="number"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Limit</label>
                    <div>
                      <input
                        type="number"
                        placeholder="Limit"
                        value={formData.limit}
                        onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Status</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                    <label>Expiry Date</label>
                    <div>
                      <input
                        type="date"
                        placeholder="Expiry Date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
                Update
              </button>
            </form>
          </motion.div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default UpdateCoupon;
