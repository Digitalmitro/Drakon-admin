import React from 'react'
import { Button } from '@mui/material'
const EmailTemplate = () => {
  return (
    <div>
      <h4>Email Template</h4>
      <div class="mt-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Subject</label>
        <div>
          <div class="mb-3 form-check">
            <textarea rows={2} cols={80} />
          </div>
        </div>
      </div>
      <div class="mt-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Section - 1</label>
        <div>
          <div class="mb-3 form-check">
            <textarea rows={5} cols={80} />
          </div>
        </div>
      </div>
      <div class="mt-5 d-flex" style={{ gap: '150px' }}>
        <label style={{ fontWeight: 'bold' }}>Section - 2</label>
        <div>
          <div class="mb-3 form-check">
            <textarea rows={5} cols={80} />
          </div>
        </div>
      </div>
      <Button variant='outlined'>Save changes</Button>
    </div>
  )
}

export default EmailTemplate
