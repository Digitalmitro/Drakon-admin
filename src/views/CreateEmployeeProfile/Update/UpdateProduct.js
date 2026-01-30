import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CForm, CRow, CCol, CFormLabel, CFormInput, CFormSelect, CFormCheck, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import API_BASE_URL from '../../../config/api';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    hasNoSize: false,
    size: [], // Array of {size, upc, weight}
    weight: 0, // fallback for hasNoSize
    upc: '', // fallback for hasNoSize
    isSoldOut: false,
    soldOutSizes: [],
  });

  const [newSize, setNewSize] = useState({ size: '', upc: '' });

  // Predefined size options
  const sizeOptions = ["Youth", "Adult", "YS", "YM", "YL", "YXL", "XXL", "XL", "L", "M", "S", "XS"].map((size) => ({
    value: size,
    label: size,
  }));

  // Add size from dropdown selection
  const addSizesFromDropdown = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) return;
    
    const newSizes = selectedOptions.map(option => ({
      size: option.value,
      upc: ''
    }));
    
    // Filter out duplicates
    const existingSizeNames = formData.size.map(s => s.size);
    const uniqueNewSizes = newSizes.filter(ns => !existingSizeNames.includes(ns.size));
    
    setFormData({
      ...formData,
      size: [...formData.size, ...uniqueNewSizes]
    });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const getData = async () => {
    try {
      // const res = await axios.get(`https://api.drakon-sports.com/feature-products/${id}`);
      const res = await axios.get(`${API_BASE_URL}/feature-products/${id}`);
      
      console.log('Fetched product data:', res.data); // Debug log
      console.log('Raw size data:', res.data.size); // Check raw size data
      
      // Check if size is array of objects or array of strings (migrated data)
      let sizeData = res.data.size || [];
      let hasNoSize = res.data.hasNoSize || false;
      
      // If size is empty or undefined, treat as hasNoSize
      if (sizeData.length === 0) {
        hasNoSize = true;
      }
      
      console.log('hasNoSize value:', hasNoSize, 'sizeData length:', sizeData.length);
      
      // If size array contains strings, it's old data - convert it
      if (sizeData.length > 0 && typeof sizeData[0] === 'string') {
        sizeData = sizeData.map(s => ({
          size: s,
          upc: null,
          weight: res.data.weight || 0
        }));
      }

      setFormData({
        title: res.data.title || '',
        description: res.data.description || '',
        category: res.data.category || '',
        price: res.data.price || 0,
        stock: res.data.stock || 0,
        hasNoSize: hasNoSize,
        size: sizeData,
        weight: res.data.weight || 0,
        upc: res.data.upc || '',
        isSoldOut: res.data.isSoldOut || false,
        soldOutSizes: res.data.soldOutSizes || [],
      });

      // Load existing images
      if (res.data.image && Array.isArray(res.data.image)) {
        const existingImages = res.data.image.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}.png`,
          status: 'done',
          url: url,
          thumbUrl: url,
        }));
        setFileList(existingImages);
      }

      setLoad(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading product');
      setLoad(true);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const addSize = () => {
    if (!newSize.size) {
      toast.error('Please enter size name');
      return;
    }
    setFormData({
      ...formData,
      size: [...formData.size, { ...newSize }]
    });
    setNewSize({ size: '', upc: '' });
  };

  const removeSize = (index) => {
    setFormData({
      ...formData,
      size: formData.size.filter((_, i) => i !== index)
    });
  };

  const updateSize = (index, field, value) => {
    const updatedSizes = formData.size.map((s, i) => 
      i === index ? { ...s, [field]: value } : s
    );
    setFormData({ ...formData, size: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.hasNoSize && formData.size.length === 0) {
      toast.error('Please add at least one size or check "Product has no size option"');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        stock: formData.stock,
        hasNoSize: formData.hasNoSize,
        size: formData.hasNoSize ? [] : formData.size, // Send empty array if no sizes
        weight: formData.weight,
        upc: formData.upc,
        isSoldOut: formData.isSoldOut,
        soldOutSizes: formData.soldOutSizes,
      };

      if (fileList.length > 0) {
        payload.image = fileList.map((file) => file.thumbUrl || file.url);
      }

      console.log('Update payload:', payload);

      const response = await axios.put(
        `${API_BASE_URL}/feature-products/${id}`,
        payload
      );

      console.log(response.data);
      toast.success('Product updated successfully');
      
      setTimeout(() => {
        navigate("/product-list");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Error updating product');
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
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  if (!load) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <CCard className="shadow-sm p-3">
        <CCardHeader className="d-flex justify-content-between bg-primary text-white">
          <h4 className="fw-bold">Update Product</h4>
          <CButton color="info" className="text-white" onClick={() => navigate("/product-list")}>
            Product List
          </CButton>
        </CCardHeader>

        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            {/* Basic Info */}
            <CRow className="mb-4">
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

              <CCol md={6}>
                <CFormLabel>Category</CFormLabel>
                <CFormSelect 
                  value={formData.category} 
                  required 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">--select-category--</option>
                  <option value="Sunglasses">Sunglasses</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Batting Gloves">Batting Gloves</option>
                  <option value="Equipment">Equipment</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <CRow className="mb-4">
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
              <CCol md={6}>
                <CFormLabel>Price ($)</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter price"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel>Stock</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter stock quantity"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                />
              </CCol>
            </CRow>

            {/* No Size Toggle */}
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormCheck
                  id="hasNoSize"
                  label="Product has no size option (e.g., Sunglasses)"
                  checked={formData.hasNoSize}
                  onChange={(e) => {
                    const isNoSize = e.target.checked;
                    setFormData({ 
                      ...formData, 
                      hasNoSize: isNoSize,
                      size: isNoSize ? [] : formData.size // Clear sizes when switching to no-size
                    });
                  }}
                />
              </CCol>
            </CRow>

            {/* If hasNoSize - show simple UPC */}
            {formData.hasNoSize ? (
              <CRow className="mb-4">
                <CCol md={6}>
                  <CFormLabel>UPC Code</CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="Enter UPC code"
                    value={formData.upc}
                    onChange={(e) => setFormData({ ...formData, upc: e.target.value })}
                  />
                </CCol>
              </CRow>
            ) : (
              <>
                {/* Size Dropdown - Select Multiple Sizes */}
                <CRow className="mb-4">
                  <CCol md={12}>
                    <CFormLabel>Available Sizes (Select from dropdown)</CFormLabel>
                    <Select
                      isMulti
                      name="sizes"
                      options={sizeOptions}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: '#212631',
                          borderColor: '#323a49',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: '#323a49',
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: '#323a49',
                          color: '#fff',
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? '#323a49' : '#212631',
                          color: state.isSelected ? '#fff' : '#aaa',
                          '&:hover': {
                            backgroundColor: '#323a49',
                            color: '#fff',
                          },
                        }),
                        multiValue: (base) => ({
                          ...base,
                          backgroundColor: '#5e5cd0',
                          color: '#fff',
                        }),
                        multiValueLabel: (base) => ({
                          ...base,
                          color: '#fff',
                        }),
                        multiValueRemove: (base) => ({
                          ...base,
                          color: '#fff',
                          ':hover': {
                            backgroundColor: 'transparent',
                            color: '#aaa',
                          },
                        }),
                      }}
                      onChange={addSizesFromDropdown}
                      placeholder="Select sizes to add"
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </CCol>
                </CRow>

                {/* Existing Sizes Table (Editable) */}
                {formData.size.length > 0 && (
                  <CRow className="mb-4">
                    <CCol md={12}>
                      <h5>Existing Sizes (Edit inline)</h5>
                      <CTable striped hover>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Size</CTableHeaderCell>
                            <CTableHeaderCell>UPC</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {formData.size.map((s, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell>
                                <CFormInput
                                  type="text"
                                  value={s.size}
                                  onChange={(e) => updateSize(index, 'size', e.target.value)}
                                  style={{ width: '100px' }}
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CFormInput
                                  type="text"
                                  value={s.upc || ''}
                                  onChange={(e) => updateSize(index, 'upc', e.target.value)}
                                  placeholder="Enter UPC"
                                  style={{ width: '150px' }}
                                />
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton color="danger" size="sm" onClick={() => removeSize(index)}>
                                  Remove
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                )}

                {/* Add New Size */}
                <CRow className="mb-3">
                  <CCol md={12}>
                    <h5>Add New Size</h5>
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={5}>
                    <CFormLabel>Size</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="e.g., YS, YM, Adult"
                      value={newSize.size}
                      onChange={(e) => setNewSize({ ...newSize, size: e.target.value })}
                    />
                  </CCol>
                  <CCol md={5}>
                    <CFormLabel>UPC Code</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Enter UPC"
                      value={newSize.upc}
                      onChange={(e) => setNewSize({ ...newSize, upc: e.target.value })}
                    />
                  </CCol>
                  <CCol md={2} className="d-flex align-items-end">
                    <CButton color="primary" onClick={addSize}>Add</CButton>
                  </CCol>
                </CRow>
              </>
            )}

            {/* Sold Out Controls */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormCheck
                  id="isSoldOut"
                  label="Mark Entire Product as Sold Out"
                  checked={formData.isSoldOut}
                  onChange={(e) => setFormData({ ...formData, isSoldOut: e.target.checked })}
                />
              </CCol>
            </CRow>

            {/* Image Upload */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel>Product Images</CFormLabel>
                <Upload
                  action="https://your-api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                  />
                )}
              </CCol>
            </CRow>

            {/* Submit Button */}
            <CRow className="mt-4">
              <CCol className="text-center">
                <CButton type="submit" color="success" size="lg">
                  Update Product
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default UpdateProduct;
