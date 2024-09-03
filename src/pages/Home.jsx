import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CategoriesCarousel from '../components/CategoriesCarousel';
import FeaturedProducts from '../components/products/FeaturedProducts';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <CategoriesCarousel />
      <div className='py-[45px]'>
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
