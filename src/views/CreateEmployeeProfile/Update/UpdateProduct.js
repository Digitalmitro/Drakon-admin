import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CHeader } from '@coreui/react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlusOutlined } from '@ant-design/icons'
import { Image, Upload } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';



const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState([])
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    size: [],
    weight: 0,
  })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/feature-products/${id}`)

      setFormData({
        title: res.data.title,
        description: res.data.description,
        category: res.data.category,
        price: res.data.price || 0,
        stock: res.data.stock || 0,
        size: res.data.size || [], // Ensure size is an array
        weight: res.data.weight || 0,
      })

      setData(res.data)
      setLoad(true)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoad(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        // image: fileList.map((file) => file.thumbUrl), // Adjust this according to how your server expects the image data
        title: formData.title,

        price: formData.price,

        description: formData.description,

        category: formData.category,

        stock: formData.stock,

        weight: formData.weight,

        size: formData.size,
      }
      if (fileList.length > 0) {
        payload.image = fileList.map((file) => file.thumbUrl)
      }
      console.log(payload);

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/feature-products/${id}`,
        payload,
      )

      console.log(response.data) // Log the response from the server
      toast.success('Product created successfully')
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        stock: '',
      })
      setFileList([])
      setTimeout(() => {
        navigate("/product-list")
      }, 500)
    } catch (error) {
      console.error(error)
      toast.error('Error creating product')
    }
  }

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
  )

  const sizeOptions = ["Youth", "Adult", "YS", "YM", "YL", "YXL", "XXL", "XL", "L", "M", "S", "XS"].map((size) => ({
    value: size,
    label: size,
  }));

  const defaultSizeValues = sizeOptions.filter(option =>
    [].includes(option.value)
  );



  return (
    <>
      <ToastContainer />
      <CCard>
        <CHeader>
          <h2>Update Product</h2>
        </CHeader>
        <CCardBody>
          <motion.div>
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">

                  <div className=" mb-4 col-md-6 col-12" style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Title</label>
                    <div>
                      <input
                        type="text"
                        // required
                        className="p-1"
                        placeholder="Product Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12" style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Description</label>
                    <div>
                      <input
                        placeholder="Product Description"
                        type="text"
                        // required
                        className="p-1"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12" style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Category</label>
                    <div className="">
                      <input
                        placeholder="product category"
                        type="text"
                        // required
                        className="p-1"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12" style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Price</label>
                    <div>
                      <input
                        placeholder="product price"
                        type="text"
                        // required
                        className="p-1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12 " style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Stock</label>
                    <div>
                      <input
                        placeholder="product stock"
                        type="number"
                        // required
                        className="p-1"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12 " style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Size</label>
                    <div>
                      <Select
                        defaultValue={defaultSizeValues}
                        isMulti
                        value={formData.size?.map(size => ({ value: size, label: size }))}
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
                        onChange={(selectedOptions) => {
                          setFormData({ ...formData, size: selectedOptions.map((option) => option.value) })
                        }
                        }
                        placeholder="Select sizes"
                        className="basic-multi-select "
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                  <div className=" mb-4 col-md-6 col-12 " style={{ gap: '20px' }}>
                    <label className='mb-2'>Product Weight</label>
                    <div>
                      <input
                        placeholder="product weight"
                        type="number"
                        // required
                        className="p-1"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      />
                    </div>
                  </div>
                  <div
                    className="input-group mb-2 col-md-6 col-12"
                    style={{ gap: '20px', alignItems: 'center' }}
                  >
                    <label>Product Image</label>
                    <div className="ms-5">
                      <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{
                            display: 'none',
                          }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                          }}
                          src={previewImage}
                        />
                      )}
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
      </CCard >
    </>
  )
}

export default UpdateProduct
