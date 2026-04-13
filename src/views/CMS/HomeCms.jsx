import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { Button, TextField } from '@mui/material'
import { message } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { deleteCms, getFirstCmsEntry, patchCms, upsertCms } from '../../services/cmsService'
import { getAdminId } from '../../utils/adminIdentity'

const defaultHomeCms = {
    announcementBar: {
        text: '',
        linkText: '',
        linkUrl: '',
    },
    promoSection: {
        title: '',
        description1: '',
        description2: '',
        buttonText: '',
        buttonUrl: '',
    },
    heroSection: {
        title: '',
        buttonText: '',
        buttonUrl: '',
    },
}

const HomeCms = () => {
    const user_id = useMemo(() => getAdminId(), [])
    const [homeCms, setHomeCms] = useState(defaultHomeCms)
    const [existingId, setExistingId] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const loadHomeCms = async () => {
        setLoading(true)
        try {
            const entry = await getFirstCmsEntry('home')
            if (!entry) {
                setExistingId('')
                setHomeCms(defaultHomeCms)
                return
            }

            setExistingId(entry._id)
            setHomeCms({
                announcementBar: {
                    ...defaultHomeCms.announcementBar,
                    ...entry.announcementBar,
                },
                promoSection: {
                    ...defaultHomeCms.promoSection,
                    ...entry.promoSection,
                },
                heroSection: {
                    ...defaultHomeCms.heroSection,
                    ...entry.heroSection,
                },
            })
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to load Home CMS')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadHomeCms()
    }, [])

    const handleNestedChange = (section, field, value) => {
        setHomeCms((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }))
    }

    const handleSave = async () => {
        if (!user_id) {
            message.error('No admin user found. Please login again.')
            return
        }

        setSaving(true)
        try {
            const payload = { ...homeCms, user_id }
            if (existingId) {
                await patchCms('home', existingId, payload)
                message.success('Home CMS updated successfully')
            } else {
                const result = await upsertCms('home', payload)
                message.success(result?.message || 'Home CMS created successfully')
            }
            await loadHomeCms()
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to save Home CMS')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!existingId) {
            message.warning('No Home CMS entry found to delete')
            return
        }

        setSaving(true)
        try {
            await deleteCms('home', existingId)
            message.success('Home CMS deleted successfully')
            setExistingId('')
            setHomeCms(defaultHomeCms)
        } catch (error) {
            message.error(error?.response?.data?.message || 'Failed to delete Home CMS')
        } finally {
            setSaving(false)
        }
    }

    return (
        <CCard>
            <CCardHeader>
                <h2>Home CMS</h2>
            </CCardHeader>
            <CCardBody>
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div>
                        <h4 style={{ marginBottom: '12px' }}>Announcement Bar</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            <TextField
                                variant="standard"
                                label="Text"
                                value={homeCms.announcementBar.text}
                                onChange={(e) => handleNestedChange('announcementBar', 'text', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Link Text"
                                value={homeCms.announcementBar.linkText}
                                onChange={(e) => handleNestedChange('announcementBar', 'linkText', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Link URL"
                                value={homeCms.announcementBar.linkUrl}
                                onChange={(e) => handleNestedChange('announcementBar', 'linkUrl', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '12px' }}>Home Promo Section</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <TextField
                                variant="standard"
                                label="Title"
                                value={homeCms.promoSection.title}
                                onChange={(e) => handleNestedChange('promoSection', 'title', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Button Text"
                                value={homeCms.promoSection.buttonText}
                                onChange={(e) => handleNestedChange('promoSection', 'buttonText', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Description 1"
                                multiline
                                minRows={2}
                                value={homeCms.promoSection.description1}
                                onChange={(e) => handleNestedChange('promoSection', 'description1', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Description 2"
                                multiline
                                minRows={2}
                                value={homeCms.promoSection.description2}
                                onChange={(e) => handleNestedChange('promoSection', 'description2', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Button URL"
                                value={homeCms.promoSection.buttonUrl}
                                onChange={(e) => handleNestedChange('promoSection', 'buttonUrl', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '12px' }}>Hero Section (Banner Text Override)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                            <TextField
                                variant="standard"
                                label="Hero Title"
                                multiline
                                minRows={2}
                                value={homeCms.heroSection.title}
                                onChange={(e) => handleNestedChange('heroSection', 'title', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Hero Button Text"
                                value={homeCms.heroSection.buttonText}
                                onChange={(e) => handleNestedChange('heroSection', 'buttonText', e.target.value)}
                            />
                            <TextField
                                variant="standard"
                                label="Hero Button URL"
                                value={homeCms.heroSection.buttonUrl}
                                onChange={(e) => handleNestedChange('heroSection', 'buttonUrl', e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Button variant="contained" onClick={handleSave} disabled={saving || loading}>
                            {saving ? 'Saving...' : existingId ? 'Update Home CMS' : 'Create Home CMS'}
                        </Button>
                        <Button variant="outlined" onClick={loadHomeCms} disabled={saving}>
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

export default HomeCms