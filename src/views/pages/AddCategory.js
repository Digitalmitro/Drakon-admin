import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    title: '',
    description: '',
    desktop_image: null,
    mobile_image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryData({ ...categoryData, [type]: file });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryData.categoryName || !categoryData.title || !categoryData.description || !categoryData.desktop_image || !categoryData.mobile_image) {
      message.error('All fields are required!');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('categoryName', categoryData.categoryName);
      formData.append('title', categoryData.title);
      formData.append('description', categoryData.description);
      formData.append('desktop', categoryData.desktop_image);
      formData.append('mobile', categoryData.mobile_image);

      await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/category`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      message.success('Category added successfully!');
      navigate('/category-list');
    } catch (error) {
      message.error('Failed to add category!');
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="fw-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Category Name</label>
          <input type="text" name="categoryName" className="form-control" value={categoryData.categoryName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={categoryData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={categoryData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Desktop Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageUpload(e, 'desktop_image')} required />
          {categoryData.desktop_image && <img src={URL.createObjectURL(categoryData.desktop_image)} alt="Desktop Preview" className="mt-2 img-thumbnail" width="100" />}
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobile_image')} required />
          {categoryData.mobile_image && <img src={URL.createObjectURL(categoryData.mobile_image)} alt="Mobile Preview" className="mt-2 img-thumbnail" width="100" />}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
