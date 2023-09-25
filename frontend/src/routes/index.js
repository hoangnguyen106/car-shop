import BadRequest from "../pages/ErrorEvents/BadRequest";
import NotFound from "../pages/ErrorEvents/NotFound";
import ServerError from "../pages/ErrorEvents/ServerError";
import ProductAdmin from "../pages/ProductAdmin/ProductAdmin";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductUpdate from "../pages/ProductUpdate/ProductUpdate";
import ProductUser from "../pages/ProductUser/ProductUser";

// Không cần login
const publicRoutes = [
  {
    path: '/server-error',
    component: ServerError,
  },
  {
    path: '/not-found',
    component: NotFound,
  },
  {
    path: '/bad-request',
    component: BadRequest,
  },
  {
    path: '/',
    exact: true,
    component: ProductUser,
  },

  {
    path: '/danh-sach-sp',
    exact: true,
    component: ProductUser,
  },
  {
    path: '/quan-ly-sp',
    component: ProductAdmin,
  },
  {
    path: '/products/:id',
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/update/:id',
    exact: true,
    component: ProductUpdate,
  },
];
// Phải cần login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
