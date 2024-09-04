import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa';

const Shops = () => {
  const [filter, setFilter] = useState(true);

  const categories = [
    'Mobiles',
    'Laptops',
    'Speakers',
    'Top wear',
    'Foot wear',
    'Watches',
    'Home Decor',
    'Smart Watches',
  ];

  return (
    <div>
      <Header />
      <main>
        <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
          <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
              <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Shop Page</h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                  <Link to='/'>Home</Link>
                  <span className='pt-1'>
                    <FaChevronRight />
                  </span>
                  <p>Products</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-16'>
          <div className='flex justify-center flex-wrap w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
              <button
                onClick={() => setFilter(!filter)}
                type='button'
                className='bg-[#059473] hover:bg-[#047b59] py-2  px-6 md:px-8 font-semibold rounded-lg text-white text-center transition-all duration-300 ease-in-out flex justify-center items-center gap-2 '
              >
                Filter Products
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    filter ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            <div className='w-full flex flex-wrap'>
              <div
                className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 transition-all duration-500 ease-in-out ${
                  filter
                    ? 'md:max-h-0 md:opacity-0 md:overflow-hidden md:mb-6'
                    : 'md:max-h-[500px] md:opacity-100 md:overflow-auto md:mb-0'
                }`}
              >
                <h3 className='text-3xl font-bold mb-3 text-slate-600'>
                  Category
                </h3>
                <div className='py-2'>
                  {categories.map((c, i) => (
                    <div className='flex justify-start items-center gap-2 py-2'>
                      <input type='checkbox' name='category' id={c} />
                      <label
                        htmlFor={c}
                        className='text-slate-600 block cursor-pointer'
                      >
                        {c}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shops;
