import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Home from './pages/Home';
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Poster from './components/Poster/Poster';
import { getCategories } from './redax/slices/categoriesSlice';
import { getProducts } from './redax/slices/productsSlice';
import SingleProduct from './components/Products/SingleProduct';
import UserForm from './components/User/UserForm';
import Profile from './components/Profile/Profile';
import Singlecategories from './components/Categories/SingleCategories';
import Cart from './components/Cart/Cart';

const App = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [])

  return (
    <div className='app'>
      <Header />
      <UserForm />
      <div className='container'>
        <Sidebar />
        {/* <Poster /> */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/products/:id"
            element={<SingleProduct />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/categories/:id"
            element={<Singlecategories />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
