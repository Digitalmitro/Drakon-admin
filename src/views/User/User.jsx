import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const User = () => {
  const navigate = useNavigate()
  return (
    <>
      <motion.div className="tax-area">
        <CCard className="mb-4">
          <CCardHeader className="d-flex" style={{ justifyContent: 'space-between' }}>
            <motion.h2 className="  fw-bold" style={{ marginBottom: '40px' }}>
              Add New User
            </motion.h2>
            <motion.h2
              onClick={() => navigate('/user-list')}
              className="  fw-bold"
              style={{ marginBottom: '40px' }}
            >
             <button className='btn '>User List</button> 
            </motion.h2>
          </CCardHeader>
          <CCardBody>
            <motion.div>
              <form name="tax">
                <div className="container">
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>Username (required)</label>
                      <div>
                        <input placeholder="Set Tax Rate in % 1-50" type="number" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>Email (required)</label>
                      <div>
                        <input placeholder="Set Tax Rate in % 1-50" type="email" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>First Name</label>
                      <div>
                        <input placeholder="Set Tax Rate in % 1-50" type="text" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>Last Name</label>
                      <div>
                        <input placeholder="Set Tax Rate in % 1-50" type="text" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>Password</label>
                      <div>
                        <input placeholder="Set Tax Rate in % 1-50" type="text" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="input-group mb-2 col" style={{ gap: '20px' }}>
                      <label>Role</label>
                      <div>
                        <select name="" id="">
                          <option value="SEO Editor">SEO Editor</option>
                          <option value="Shop Manager">Shop Manager</option>
                          <option value="Editor">Editor</option>
                          <option value="Editor">Customer</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="btn btn-dark" type="submit" style={{ marginTop: '20px' }}>
                  Add New User
                </button>
              </form>
            </motion.div>
          </CCardBody>
        </CCard>
      </motion.div>
    </>
  )
}
export default User
