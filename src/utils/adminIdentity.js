export const getStoredAdmin = () => {
  const raw = localStorage.getItem('admin') || localStorage.getItem('user')
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch (error) {
    return null
  }
}

export const getAdminId = () => {
  const admin = getStoredAdmin()
  if (!admin) {
    return ''
  }

  return admin._id || admin.id || ''
}
