import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Button, TextField } from '@mui/material'
import { message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { deleteCms, getFirstCmsEntry, patchCms, upsertCms } from '../../services/cmsService'
import { getAdminId } from '../../utils/adminIdentity'

const defaultHeaderCms = {
    logo: '',
    navItems: [{ name: '', path: '' }],
}

const HeaderCms = () => {
    const user_id = useMemo(() => getAdminId(), [])
    const [headerCms, setHeaderCms] = useState(defaultHeaderCms)
    const [existingId, setExistingId] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const loadHeaderCms = async () => {
        setLoading(true)
        try {
            const entry = await getFirstCmsEntry('header')
            if (!entry) {
                setExistingId('')
                setHeaderCms(defaultHeaderCms)
                return
            }

            setExistingId(entry._id)
            setHeaderCms({
                logo: entry.logo || '',
                navItems: entry.navItems?.length ? entry.navItems : [{ name: '', path: '' }],
            })
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to load Header CMS')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadHeaderCms()
    }, [])

    const handleNavItemChange = (index, field, value) => {
        setHeaderCms((prev) => ({
            ...prev,
            navItems: prev.navItems.map((item, itemIndex) =>
                itemIndex === index ? { ...item, [field]: value } : item,
            ),
        }))
    }

    const addNavItem = () => {
        setHeaderCms((prev) => ({
            ...prev,
            navItems: [...prev.navItems, { name: '', path: '' }],
        }))
    }

    const removeNavItem = (index) => {
        setHeaderCms((prev) => {
            const nextItems = prev.navItems.filter((_, itemIndex) => itemIndex !== index)
            return {
                ...prev,
                navItems: nextItems.length ? nextItems : [{ name: '', path: '' }],
            }
        })
    }

    const imageToDataURI = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => resolve(event.target.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(file)
        })

    const handleLogoUpload = async (file) => {
        if (!file) return
        try {
            const dataUri = await imageToDataURI(file)
            setHeaderCms((prev) => ({ ...prev, logo: dataUri }))
        } catch (error) {
            message.error('Failed to read logo file')
        }
    }

    const handleSave = async () => {
        if (!user_id) {
            message.error('No admin user found. Please login again.')
            return
        }

        setSaving(true)
        try {
            const payload = {
                ...headerCms,
                navItems: headerCms.navItems.filter((item) => item.name || item.path),
                user_id,
            }

            if (existingId) {
                await patchCms('header', existingId, payload)
                message.success('Header CMS updated successfully')
            } else {
                const result = await upsertCms('header', payload)
                message.success(result?.message || 'Header CMS created successfully')
            }
            await loadHeaderCms()
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to save Header CMS')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!existingId) {
            message.warning('No Header CMS entry found to delete')
            return
        }

        setSaving(true)
        try {
            await deleteCms('header', existingId)
            message.success('Header CMS deleted successfully')
            setExistingId('')
            setHeaderCms(defaultHeaderCms)
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to delete Header CMS')
        } finally {
            setSaving(false)
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <h2>Header CMS</h2>
            </CCardHeader>
            <CCardBody>
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'end' }}>
                        <TextField
                            variant="standard"
                            label="Logo URL or Data URI"
                            value={headerCms.logo}
                            onChange={(e) => setHeaderCms((prev) => ({ ...prev, logo: e.target.value }))}
                        />
                        <Button component="label" variant="outlined">
                            Upload Logo
                            <input type="file" hidden onChange={(e) => handleLogoUpload(e.target.files?.[0])} />
                        </Button>
                    </div>

                    {headerCms.logo ? (
                        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', maxWidth: '360px' }}>
                            <img src={headerCms.logo} alt="Header Logo" style={{ maxHeight: '60px', objectFit: 'contain' }} />
                        </div>
                    ) : null}

                    <div>
                        <h4 style={{ marginBottom: '12px' }}>Navigation Items</h4>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {headerCms.navItems.map((item, index) => (
                                <div
                                    key={`${index}-${item.name}`}
                                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px' }}
                                >
                                    <TextField
                                        variant="standard"
                                        label="Name"
                                        value={item.name}
                                        onChange={(e) => handleNavItemChange(index, 'name', e.target.value)}
                                    />
                                    <TextField
                                        variant="standard"
                                        label="Path"
                                        value={item.path}
                                        onChange={(e) => handleNavItemChange(index, 'path', e.target.value)}
                                    />
                                    <Button variant="outlined" color="error" onClick={() => removeNavItem(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outlined" sx={{ marginTop: '12px' }} onClick={addNavItem}>
                            Add Nav Item
                        </Button>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="contained" onClick={handleSave} disabled={saving || loading}>
                            {saving ? 'Saving...' : existingId ? 'Update Header CMS' : 'Create Header CMS'}
                        </Button>
                        <Button variant="outlined" onClick={loadHeaderCms} disabled={saving}>
                            Refresh
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDelete} disabled={saving || !existingId}>
                            Delete
                        </Button>
                    </div>
                </div>
            </CCardBody>
        </CCard>
    )
}

export default HeaderCms