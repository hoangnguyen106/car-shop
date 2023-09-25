import { Switch } from 'antd';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import OverlayProvider from '../../context/OverlayContext';
import ProductAdmin from '../../pages/ProductAdmin/ProductAdmin';
import ProductDetail from '../../pages/ProductDetail/ProductDetail';
import ProductUpdate from '../../pages/ProductUpdate/ProductUpdate';
import ProductUser from '../../pages/ProductUser/ProductUser';

const publicRoutes = [
  {
    path: ['/'],
    exact: true,
    component: ProductUser,
  },

  {
    path: ['/danh-sach-sp'],
    exact: true,
    component: ProductUser,
  },
  {
    path: '/quan-ly-sp',
    component: ProductAdmin,
  },
  {
    path: ['/:id'],
    exact: true,
    component: ProductDetail,
  },
  {
    path: ['/update/:id'],
    exact: true,
    component: ProductUpdate,
  },
];
function Home() {
  return (
    <>
      <Router>
        <OverlayProvider>
          <Switch>
            {publicRoutes.map((route) => (
              <Route path={route.path}>{route.component}</Route>
            ))}
          </Switch> 

        </OverlayProvider>
      </Router>
    </>
  );
}

export default Home;
