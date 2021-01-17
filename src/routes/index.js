import React from "react";
import { AreaChartOutlined, ShopOutlined } from "@ant-design/icons";

import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";
import Notice from "../pages/admin/notices/index";
/* Login 404 */

export const mainRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/404",
    component: PageNotFound,
  },
];

/* Validate */

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Index,
    isShow: true,
    title: "Dashboard",
    icon: <AreaChartOutlined />,
  },
  {
    path: "/admin/products",
    component: List,
    exact: true, //全路径匹配
    isShow: true,
    title: "Commodity",
    icon: <ShopOutlined />,
  },
  {
    path: "/admin/products/edit/:id?",
    component: Edit,
    isShow: false,
  },
  {
    path: "/admin/notices",
    component: Notice,
    isShow: false,
  },
];
