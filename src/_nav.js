import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibMinutemailer,
  cilSpeedometer,
  cibTelegramPlane,
  cibLaravel,
  cibMessenger,
  cilMedicalCross,
  cilMoney,
  cilBraille,
  cilShieldAlt,
  cilUserPlus,
  cilBarChart,
  cilUser,
  cibGoogleAnalytics,
  cilLifeRing,
  cibAzureArtifacts,
} from '@coreui/icons'

let _nav = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'MASTER',
  },
  {
    component: CNavItem,
    name: 'Manage Customers',
    to: '/manage-customer',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Manage Category',
    icon: <CIcon icon={cibAzureArtifacts} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Category',
        to: '/category-list',
        icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Manage Products',
    icon: <CIcon icon={cibAzureArtifacts} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' All Products',
        to: '/product-list',
        icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: ' Inventory Product',
        to: '/inventory-list',
        icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: ' Featured Product',
        to: '/featured-list',
        icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Manage Orders',
    to: '/order-list',
    icon: <CIcon icon={cibLaravel} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Coupons',
    to: '/coupon-list',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Blogs',
    to: '/blog-list',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Manage CMS',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Home ',
        to: '/home-cms',
      },
      // {
      //   component: CNavItem,
      //   name: 'Footer ',
      //   to: '/footer-cms',
      // },
      {
        component: CNavItem,
        name: 'Header ',
        to: '/header-cms',
      },
      {
        component: CNavItem,
        name: 'Index',
        to: '/index-cms',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Analytics',
  },
  {
    component: CNavGroup,
    name: 'Analytics Overview',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Products ',
        to: '/product-analytics',
      },
      {
        component: CNavItem,
        name: 'Revenue ',
        to: '/revenue-analytics',
      },
      {
        component: CNavItem,
        name: 'Orders ',
        to: '/order-analytics',
      },
      {
        component: CNavItem,
        name: 'Taxes',
        to: '/tax-analytics',
      },
      {
        component: CNavItem,
        name: 'Stocks',
        to: '/stock-analytics',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Setting',
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
]

export default _nav
