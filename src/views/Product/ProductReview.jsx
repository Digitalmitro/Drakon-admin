import { Button, Rating } from '@mui/material'
import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductReview = () => {
  const [product, setProduct] = useState([])
  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/products`)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(product)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {product?.map(
        (e) =>
          e.review.length > 0 && (
            <>
              <div
                style={{
                  border: '1px solid gray',
                  borderRadius: '10px',
                  zoom: '0.5',
                  cursor: 'pointer',
                }}
              >
                <div style={{}}>
                  <img src={e.image} width={'100%'} />
                </div>
                <div style={{ padding: '5px', margin: '10px' }}>
                  <h3>{e.title}</h3>
                  <Button onClick={showModal} variant="contained">
                    See Review
                  </Button>
                </div>
              </div>

              <Modal
                title="Basic Modal"
                style={{
                  top: 100,
                  height: "500px",
                  overflowY: "auto"
                }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {e.review.map((p) => (
                  <div
                    style={{
                      border: '1px solid gray',
                      zoom: '0.5',
                      marginBottom: '20px',
                      padding: '10px',
                    }}
                  >
                    <h4>Email: {p.email}</h4>
                    <Rating name="simple-controlle" value={p.rating} />
                    <h4>Comment: {p.comments}</h4>
                  </div>
                ))}
              </Modal>
            </>
          ),
      )}
    </div>
  )
}

export default ProductReview
