import { motion } from 'framer-motion';
import { useState } from 'react';
import { CCard, CCardHeader, CCardBody,CButton,CForm,CRow,CCol,CFormLabel, CFormInput } from '@coreui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateEmployeeProfile = () => {
  const navigate = useNavigate();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    stock: '',
  });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/feature-products`, {
        image: fileList.map((file) => file.thumbUrl), // Adjust this according to how your server expects the image data
        ...formData,
      });
      console.log(response.data); // Log the response from the server
      toast.success('Product created successfully');
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
      });
      setFileList([]);
    } catch (error) {
      console.error(error);
      toast.error('Error creating product');
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  // const categoryOptions = [
  //   'Shoes',
  //   'Sports Gloves',
  //   'Books',
  //   'Home Appliances',
  //   'Sports',
  // ];

  return (
    <>
      <ToastContainer />
      <CCard className="shadow-sm p-3">
      {/* Card Header */}
      <CCardHeader className="d-flex justify-content-between bg-primary text-white">
        <h4 className="fw-bold">Add Product</h4>
        <CButton color="info" className="text-white" onClick={() => navigate("/product-list")}>
          Product List
        </CButton>
      </CCardHeader>

      {/* Card Body */}
      <CCardBody >
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            {/* Product Title */}
            <CCol md={6}>
              <CFormLabel>Product Title</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Enter product title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </CCol>

            {/* Product Category */}
            <CCol md={6}>
              <CFormLabel>Category</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Enter category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* Product Description */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Description</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Enter product description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            {/* Product Price */}
            <CCol md={6}>
              <CFormLabel>Price</CFormLabel>
              <CFormInput
                type="number"
                placeholder="Enter price"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </CCol>

            {/* Product Stock */}
            <CCol md={6}>
              <CFormLabel>Stock</CFormLabel>
              <CFormInput
                type="number"
                placeholder="Enter stock quantity"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </CCol>
          </CRow>

          {/* Image Upload */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Product Image</CFormLabel>
              <Upload
                action="https://your-api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length >= 5 ? null : <CButton color="secondary">Upload</CButton>}
              </Upload>
            </CCol>
          </CRow>

          {/* Buttons */}
          <CRow className="mt-4">
            <CCol className="text-center">
              <CButton type="submit" color="success">
                Submit
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
    </>
  );
};

export default CreateEmployeeProfile;
