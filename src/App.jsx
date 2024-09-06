import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Carts from './pages/Carts';
import Shipping from './pages/Shipping';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/product/details/:slug' element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
