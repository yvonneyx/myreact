import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";

/* Login 404 */

export const mainRoutes = [{
	path: "/login",
	component: Login,
}, {
	path: "/404",
	component: PageNotFound,
}]

/* Validate */

export const adminRoutes = [{
	path: "/admin/dashboard",
	component: Index,
}, {
	path: "admin/products",
	component: List,
	exact: true, //全路径匹配
}, {
	path: "admin/products/edit/:id",
	component: Edit,
}]