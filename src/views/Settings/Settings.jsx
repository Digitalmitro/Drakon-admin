

import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import General from './General'
import Product from './Product'
import Tax from './Tax'
import Shipping from './Shipping'
import Payments from './Payments'
import Accounts_Privacy from './Accounts_Privacy'
import Email from './Email'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Product" {...a11yProps(1)} />
          <Tab label="Tax" {...a11yProps(2)} />
          <Tab label="Shipping" {...a11yProps(3)} />
          <Tab label="Payments" {...a11yProps(4)} />
          <Tab label="Accounts & Privacy" {...a11yProps(5)} />
          <Tab label="Emails" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <General />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Product />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Tax />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Shipping />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Payments />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Accounts_Privacy />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Email />
      </CustomTabPanel>
    </Box>
  )
}
