import { element, exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const blog = React.lazy(() => import('./views/blogs/CreateBlog'))
const blog_list = React.lazy(() => import('./views/blogs/AllBlogs'))
const Coupon = React.lazy(() => import('./views/Coupons/CreateCoupon'))
const CouponList = React.lazy(() => import('./views/Coupons/CouponList'))
const ProductList = React.lazy(() => import('./views/CreateEmployeeProfile/ProductList'))
const FeaturedProduct = React.lazy(() => import('./views/CreateEmployeeProfile/FeaturedList'))
const UpdateFeatured = React.lazy(
  () => import('./views/CreateEmployeeProfile/Update/UpdateFeature'),
)
const UpdateInventory = React.lazy(
  () => import('./views/CreateEmployeeProfile/Update/UpdateInventory'),
)
const InventoryList = React.lazy(() => import('./views/CreateEmployeeProfile/InventroyList'))
const CreateInventory = React.lazy(() => import('./views/CreateEmployeeProfile/CreateInventory'))
const CreateFeatured = React.lazy(() => import('./views/CreateEmployeeProfile/CreateFeatured'))
const AllOrder = React.lazy(() => import('./views/Orders/AllOrder'))
const HomeCms = React.lazy(() => import('./views/CMS/HomeCms'))
const FooterCms = React.lazy(() => import('./views/CMS/FooterCms'))
const HeaderCms = React.lazy(() => import('./views/CMS/HeaderCms'))
const IndexCms = React.lazy(() => import('./views/CMS/IndexCMS'))
const Settings = React.lazy(() => import('./views/Settings/Settings'))
const EmailTemplateSettings = React.lazy(() => import('./views/Settings/EmailTemplate'))
const AdminList = React.lazy(() => import('./views/Settings/AdminList'))
const User = React.lazy(() => import('./views/User/User'))
const UserList = React.lazy(() => import('./views/User/UserList'))
// Profile
const Login = React.lazy(() => import('./views/pages/login/Login'))
const category_list = React.lazy(() => import('./views/pages/category_list'))
const create_category = React.lazy(() => import('./views/pages/AddCategory'))
const CreateEmployeeProfile = React.lazy(
  () => import('./views/CreateEmployeeProfile/CreateEmployeeProfile'),
)

const Best_Purchased_Product = React.lazy(() => import('./views/Purchase/Best_Purchased_Product'))
const ProductReview = React.lazy(() => import('./views/Product/ProductReview'))
const ViewOrder = React.lazy(() => import('./views/Orders/ViewOrder'))
const UpdateCoupon = React.lazy(() => import('./views/Coupons/UpdateCoupon'))
const UpdateProduct = React.lazy(() => import('./views/CreateEmployeeProfile/Update/UpdateProduct'))
const ManageCustomer = React.lazy(() => import('./views/Customer/ManageCustomer'))

const ProductAnalytics = React.lazy(() => import('./views/Analytics/Products'))
const RevenueAnalytics = React.lazy(() => import('./views/Analytics/Revenue'))
const OrderAnalytics = React.lazy(() => import('./views/Analytics/Orders'))
const TaxAnalytics = React.lazy(() => import('./views/Analytics/Taxes'))
const StockAnalytics = React.lazy(() => import('./views/Analytics/Stocks'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },

  { path: '/Login', name: 'Login', element: Login, exact: true },
  { path: '/coupon', name: 'Coupon', element: Coupon, exact: true },
  { path: '/coupon-list', name: 'Coupon list', element: CouponList, exact: true },

  { path: '/update-coupon/:id', name: 'Coupon list', element: UpdateCoupon, exact: true },
  { path: '/home-cms', name: 'Home CMS', element: HomeCms, exact: true },
  { path: '/footer-cms', name: 'Footer CMS', element: FooterCms, exact: true },
  { path: '/header-cms', name: 'Header CMS', element: HeaderCms, exact: true },
  { path: '/index-cms', name: 'Index CMS', element: IndexCms, exact: true },
  { path: '/create-blog', name: 'Create Blog', element: blog, exact: true },
  { path: '/blog-list', name: 'Blog List', element: blog_list, exact: true },

  { path: '/update-coupon/:id', name: 'Update coupon', element: UpdateCoupon, exact: true },

  { path: '/product-list', name: 'Product-List', element: ProductList, exact: true },
  { path: '/category-list', name: 'Category-List', element: category_list, exact: true },
  { path: '/create-category', name: 'Add Category', element: create_category, exact: true },
  { path: '/inventory-list', name: 'Inventory-List', element: InventoryList, exact: true },
  { path: '/featured-list', name: 'Featured-List', element: FeaturedProduct, exact: true },
  {
    path: '/updatefeatured-list/:id',
    name: 'Update-Featured-List',
    element: UpdateFeatured,
    exact: true,
  },
  {
    path: '/updateInventory-list/:id',
    name: 'Update-Inventory-List',
    element: UpdateInventory,
    exact: true,
  },
  { path: '/update-product/:id', name: 'Update product', element: UpdateProduct, exact: true },
  { path: '/order-list', name: 'Order list', element: AllOrder, exact: true },
  { path: '/view-order/:id', name: 'View Order', element: ViewOrder, exact: true },
  { path: '/create-leads-profile', name: 'Products', element: CreateEmployeeProfile, exact: true },
  { path: '/create-inventory', name: 'Add Inventory', element: CreateInventory, exact: true },
  { path: '/create-featured', name: 'Add Featured Product', element: CreateFeatured, exact: true },

  {
    path: '/best-purchase-product',
    name: 'Best Selling Product',
    element: Best_Purchased_Product,
    exact: true,
  },
  { path: '/product-review', name: 'Product Review', element: ProductReview, exact: true },

  { path: '/manage-customer', name: 'Manage Customer', element: ManageCustomer, exact: true },

  { path: '/settings', name: 'Settings', element: Settings, exact: true },
  {
    path: '/settings/email-template/:id',
    name: 'Settings',
    element: EmailTemplateSettings,
    exact: true,
  },
  { path: '/admin-list', name: 'Admin List', element: AdminList, exact: true },
  { path: '/user', name: 'User', element: User, exact: true },
  { path: '/user-list', name: 'User_List', element: UserList, exact: true },

  { path: '/product-analytics', name: 'Product', element: ProductAnalytics, exact: true },
  { path: '/revenue-analytics', name: 'Revenue', element: RevenueAnalytics, exact: true },
  { path: '/order-analytics', name: 'Order', element: OrderAnalytics, exact: true },
  { path: '/tax-analytics', name: 'Tax', element: TaxAnalytics, exact: true },
  { path: '/stock-analytics', name: 'Stock', element: StockAnalytics, exact: true },
]

export default routes
