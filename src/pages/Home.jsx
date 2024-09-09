import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import CategoriesCarousel from '../components/CategoriesCarousel';
import FeaturedProducts from '../components/products/FeaturedProducts';
import Products from './../components/products/Products';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProducts } from '../store/reducers/homeReducer';

const Home = () => {
  const dispatch = useDispatch();
  const {
    categories,
    products,
    latest_products,
    topRated_products,
    discounted_products,
  } = useSelector((state) => state.home || {});

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='w-full'>
      <Header categories={categories} />
      <main>
        <Banner />
        <CategoriesCarousel categories={categories} />
        <section className='py-[45px]'>
          <FeaturedProducts products={products} />
        </section>
        <section className='py-10'>
          <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7'>
              <div className='overflow-hidden'>
                <Products products={latest_products} title='New Arrivals' />
              </div>
              <div className='overflow-hidden'>
                <Products
                  products={topRated_products}
                  title='Customer Favorites'
                />
              </div>
              <div className='overflow-hidden'>
                <Products
                  products={discounted_products}
                  title='Special Offers'
                />
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
