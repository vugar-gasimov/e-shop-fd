import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import CategoriesCarousel from '../components/CategoriesCarousel';
import FeaturedProducts from '../components/products/FeaturedProducts';
import Products from './../components/products/Products';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/reducers/homeReducer';

const Home = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.home || {});

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='w-full'>
      <Header />
      <main>
        <Banner />
        <CategoriesCarousel />
        <section className='py-[45px]'>
          <FeaturedProducts />
        </section>
        <section className='py-10'>
          <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
              <div className='overflow-hidden'>
                <Products title='New Arrivals' />
              </div>
              <div className='overflow-hidden'>
                <Products title='Customer Favorites' />
              </div>
              <div className='overflow-hidden'>
                <Products title='Special Offers' />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
