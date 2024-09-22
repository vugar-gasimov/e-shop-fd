import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Shops from './pages/Shops';
import Carts from './pages/Carts';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoryShop from './pages/CategoryShop';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';

import Main from './components/dashboard/Main';
import Orders from './components/dashboard/Orders';
import SearchProducts from './components/SearchProducts';

import { getCategories } from './store/reducers/homeReducer';

import ProtectUser from './utils/ProtectUser';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/products?' element={<CategoryShop />} />
        <Route path='/products/search?' element={<SearchProducts />} />
        <Route path='/product/details/:slug' element={<Details />} />

        <Route path='/dashboard' element={<ProtectUser />}>
          <Route path='' element={<Dashboard />}>
            <Route path='' element={<Main />} />
            <Route path='my-orders' element={<Orders />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
