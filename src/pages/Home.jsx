import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CategoriesCarousel from '../components/CategoriesCarousel';

const Home = () => {
  return (
    <div className='w-full'>
      <Header />
      <Banner />
      <CategoriesCarousel />
    </div>
  );
};

export default Home;
