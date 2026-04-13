import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Button, TextField } from '@mui/material'
import { message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { deleteCms, getFirstCmsEntry, patchCms, upsertCms } from '../../services/cmsService'
import { getAdminId } from '../../utils/adminIdentity'

const defaultIndexCms = {
  script: { src: '', type: '', async: '', defer: '', integrity: '', crossorigin: '' },
  link: {
    href: '',
    rel: '',
    type: '',
    media: '',
    sizes: '',
    crossorigin: '',
    as: '',
    integrity: '',
    title: '',
    hreflang: '',
  },
  meta: { name: '', content: '', charset: '', httpEquiv: '' },
  title: '',
}

const IndexCMS = () => {
  const user_id = useMemo(() => getAdminId(), [])
  const [index, setIndex] = useState(defaultIndexCms)
  const [existingId, setExistingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const loadIndexCms = async () => {
    setLoading(true)
    try {
      const entry = await getFirstCmsEntry('index')
      if (!entry) {
        setExistingId('')
        setIndex(defaultIndexCms)
        return
      }

      setExistingId(entry._id)
      setIndex({
        script: { ...defaultIndexCms.script, ...entry.script },
        link: { ...defaultIndexCms.link, ...entry.link },
        meta: { ...defaultIndexCms.meta, ...entry.meta },
        title: entry.title || '',
      })
    } catch (error) {
      message.error(error?.response?.data?.message || 'Failed to load Index CMS')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIndexCms()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    const [field, property] = name.split('-')
    setIndex((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [property]: value,
      },
    }))
  }

  async function addIndex() {
    if (!user_id) {
      message.error('No admin user found. Please login again.')
      return
    }

    setSaving(true)
    try {
      const payload = { ...index, user_id }
      if (existingId) {
        await patchCms('index', existingId, payload)
        message.success('Index CMS updated successfully')
      } else {
        const result = await upsertCms('index', payload)
        message.success(result?.message || 'Index CMS created successfully')
      }
      await loadIndexCms()
    } catch (error) {
      message.error(error?.response?.data?.message || 'Failed to save Index CMS')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!existingId) {
      message.warning('No Index CMS entry found to delete')
      return
    }

    setSaving(true)
    try {
      await deleteCms('index', existingId)
      message.success('Index CMS deleted successfully')
      setExistingId('')
      setIndex(defaultIndexCms)
    } catch (error) {
      message.error(error?.response?.data?.message || 'Failed to delete Index CMS')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <CCard>
        <CCardHeader>
          <h2>Index</h2>
        </CCardHeader>
        <CCardBody>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: '10px' }}>Script</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <TextField variant="standard" label="src" name="script-src" onChange={handleChange} value={index.script.src} />
                <TextField variant="standard" label="type" name="script-type" onChange={handleChange} value={index.script.type} />
                <TextField variant="standard" helperText="Enter true/false" label="async" name="script-async" onChange={handleChange} value={index.script.async} />
                <TextField variant="standard" helperText="Enter true/false" label="defer" name="script-defer" onChange={handleChange} value={index.script.defer} />
                <TextField variant="standard" label="integrity" name="script-integrity" onChange={handleChange} value={index.script.integrity} />
                <TextField variant="standard" label="crossorigin" name="script-crossorigin" onChange={handleChange} value={index.script.crossorigin} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: '10px' }}>Link</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <TextField variant="standard" label="href" name="link-href" onChange={handleChange} value={index.link.href} />
                <TextField variant="standard" label="rel" name="link-rel" onChange={handleChange} value={index.link.rel} />
                <TextField variant="standard" label="type" name="link-type" onChange={handleChange} value={index.link.type} />
                <TextField variant="standard" label="media" name="link-media" onChange={handleChange} value={index.link.media} />
                <TextField variant="standard" label="sizes" name="link-sizes" onChange={handleChange} value={index.link.sizes} />
                <TextField variant="standard" label="crossorigin" name="link-crossorigin" onChange={handleChange} value={index.link.crossorigin} />
                <TextField variant="standard" label="as" name="link-as" onChange={handleChange} value={index.link.as} />
                <TextField variant="standard" label="integrity" name="link-integrity" onChange={handleChange} value={index.link.integrity} />
                <TextField variant="standard" label="title" name="link-title" onChange={handleChange} value={index.link.title} />
                <TextField variant="standard" label="hreflang" name="link-hreflang" onChange={handleChange} value={index.link.hreflang} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 htmlFor="" style={{ marginBottom: '10px' }}>
                Meta
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <TextField variant="standard" label="name" name="meta-name" onChange={handleChange} value={index.meta.name} />
                <TextField variant="standard" label="content" name="meta-content" onChange={handleChange} value={index.meta.content} />
                <TextField variant="standard" label="charset" name="meta-charset" onChange={handleChange} value={index.meta.charset} />
                <TextField variant="standard" label="http-equiv" name="meta-httpEquiv" onChange={handleChange} value={index.meta.httpEquiv} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4 htmlFor="" style={{ marginBottom: '10px' }}>
                Title
              </h4>
              <TextField variant="standard" label="title" onChange={(e) => setIndex({ ...index, title: e.target.value })} value={index.title} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={addIndex} sx={{ width: '170px' }} variant="contained" disabled={saving || loading}>
                {saving ? 'Saving...' : existingId ? 'Update Index' : 'Create Index'}
              </Button>
              <Button onClick={loadIndexCms} sx={{ width: '120px' }} variant="outlined" disabled={saving}>
                Refresh
              </Button>
              <Button
                onClick={handleDelete}
                sx={{ width: '120px' }}
                variant="outlined"
                color="error"
                disabled={saving || !existingId}
              >
                Delete
              </Button>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default IndexCMS
