import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CategoriesCarousel from '../components/CategoriesCarousel';
import FeaturedProducts from '../components/products/FeaturedProducts';
import Products from './../components/products/Products';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <CategoriesCarousel />
      <div className='py-[45px]'>
        <FeaturedProducts />
      </div>
      <div className='py-10'>
        <div className='w-[85%] flex flex-wrap mx-auto'>
          <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
            <div className='overflow-hidden'>
              <Products title='Newest Products' />
            </div>
            <div className='overflow-hidden'>
              <Products title='Top Rated Products' />
            </div>
            <div className='overflow-hidden'>
              <Products title='Products in Discount ' />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
