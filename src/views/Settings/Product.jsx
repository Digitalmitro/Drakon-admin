import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Button } from '@mui/material'
import { message } from 'antd'

const Product = () => {
  const Profile = localStorage.getItem('user')
  const NewProfile = JSON.parse(Profile)
  const user_id = NewProfile?._id
  const [EnableReview,setReview]=useState(false)
  const [EnableRating,setRating]=useState(false)
  const handleSave = async () => {
    const payload = {
      EnableReview,
      EnableRating,
      user_id,
    }
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/general-settings`, payload)
    message.success(res.data.message)
  }
  return (
    <div>
      <h4>Review</h4>
      <div class="my-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Product reviews
        </label>
        <div>
          <div class="mb-3 form-check">
            <input value={EnableReview} onChange={(e) => setReview(e.target.checked)} type="checkbox" class="form-check-input" id="review" />
            <label class="form-check-label" for="review">
              Enable product reviews
            </label>
          </div>
        </div>
      </div>
      <div class="mb-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }} htmlFor="tax">
          Product ratings
        </label>
        <div>
          <div class="mb-3 form-check">
            <input value={EnableRating} onChange={(e) => setRating(e.target.checked)} type="checkbox" class="form-check-input" id="rating" />
            <label class="form-check-label" for="rating">
              Enable star rating on reviews
            </label>
          </div>
        </div>
      </div>
      <Button onClick={handleSave} variant="outlined">
        Save changes
      </Button>
    </div>
  )
}

export default Product
