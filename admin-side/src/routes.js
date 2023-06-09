/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Users from "views/Users.js";
import Product from "views/Product";
import AddProduct from "views/AddProduct";
import Category from "views/Category";
import AddCategory from "views/AddCategory";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/all-users",
    name: "Users",
    icon: "nc-icon nc-notes",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/category-list",
    name: "Category",
    icon: "nc-icon nc-notes",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/add-category",
    name: "AddCategory",
    icon: "nc-icon nc-notes",
    component: AddCategory,
    layout: "/admin"
  },
  {
    path: "/product-list",
    name: "Product",
    icon: "nc-icon nc-notes",
    component: Product,
    layout: "/admin"
  },
  {
    path: "/add-product",
    name: "AddProduct",
    icon: "nc-icon nc-notes",
    component: AddProduct,
    layout: "/admin"
  },
  
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },

];

export default dashboardRoutes;
