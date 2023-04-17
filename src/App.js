import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
//import AdminHomePage from './pages/AdminHomePage';
//import AdminLoginPage from './pages/AdminLoginPage';
//import RegisterShopPage from './pages/RegisterShopPage';
//import DeleteShopPage from './pages/DeleteShopPage';
//import Footer from './UI/Footer';
import React from 'react';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AdminHomePage = React.lazy(() => import('./pages/AdminHomePage'));
const RegisterShopPage = React.lazy(() => import('./pages/RegisterShopPage'));
const DeleteShopPage = React.lazy(() => import('./pages/DeleteShopPage'));
const UpdateShopPage = React.lazy(() => import('./pages/UpdateShopPage'));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const ShopOwnerLoginPage = React.lazy(() => import('./pages/ShopOwnerLoginPage'));
const ShopOwnerHomePage = React.lazy(() => import('./pages/ShopOwnerHomePage'));
const ViewShopProdsPage = React.lazy(() => import('./pages/ViewShopProdsPage'));
const AddProdToShopePage = React.lazy(() => import('./pages/AddProdToShopePage'));
const UpdateProdPage = React.lazy(() => import('./pages/UpdateProdPage'));
const DeleteProdPage = React.lazy(() => import('./pages/DeleteProdPage'));
function App() {
  return (
    <>
      <main>
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<React.Suspense fallback={<>...</>}><HomePage /></React.Suspense>} />
          <Route path='/admin' element={<React.Suspense fallback={<>...</>}><AdminLoginPage /></React.Suspense>} />
          <Route path='/admin/home' element={<React.Suspense fallback={<>...</>}><AdminHomePage /></React.Suspense>} />
          <Route path='/admin/home/register-shop' element={<React.Suspense fallback={<>...</>}><RegisterShopPage /></React.Suspense>} />
          <Route path='/admin/home/delete-shop' element={<React.Suspense fallback={<>...</>}><DeleteShopPage /></React.Suspense>} />
          <Route path='/admin/home/update-shop' element={<React.Suspense fallback={<>...</>}><UpdateShopPage /></React.Suspense>} />
          <Route path='/shop-owner' element={<React.Suspense fallback={<>...</>}><ShopOwnerLoginPage /></React.Suspense>} />
          <Route path='/shop-owner/home' element={<React.Suspense fallback={<>...</>}><ShopOwnerHomePage /></React.Suspense>} />
          <Route path='/shop-owner/view-store' element={<React.Suspense fallback={<>...</>}><ViewShopProdsPage /></React.Suspense>} />
          <Route path='/shop-owner/add-prod' element={<React.Suspense fallback={<>...</>}><AddProdToShopePage /></React.Suspense>} />
          <Route path='/shop-owner/update-prod' element={<React.Suspense fallback={<>...</>}><UpdateProdPage /></React.Suspense>} />
          <Route path='/shop-owner/delete-prod' element={<React.Suspense fallback={<>...</>}><DeleteProdPage /></React.Suspense>} />
        </Routes>
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
}

export default App;
