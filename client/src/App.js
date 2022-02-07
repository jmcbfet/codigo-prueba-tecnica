import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { 
  AuthPage,
  Register, 
  Home, 
  Product, 
  DashboardOrders, 
  DashboardUsers, 
  DashboardAddUser,
  DashboardEditUser,
  DashboardProducts, 
  DashboardAddProduct,
  DashboardEditProduct,
  DashboardDetailOrder, 
  DashboardOrdersPayment
} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />

        <Route path='/dashboard/orders' element={<DashboardOrders />} />

        <Route path='/dashboard/users' element={<DashboardUsers />} />
        <Route path='/dashboard/users/add' element={<DashboardAddUser />} />
        <Route path='/dashboard/users/edit' element={<DashboardEditUser />} />

        <Route path='/dashboard/products' element={<DashboardProducts />} />
        <Route path='/dashboard/products/add' element={<DashboardAddProduct />} />
        <Route path='/dashboard/products/edit' element={<DashboardEditProduct />} />

        <Route path='/dashboard/orders/:id' element={<DashboardDetailOrder />} />

        <Route path='/dashboard/orders/payment/:id' element={<DashboardOrdersPayment />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
