import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  FaChevronRight,
  FaChevronDown,
  FaStar,
  FaRegStar,
} from 'react-icons/fa';
import { Range } from 'react-range';
import Products from './../components/products/Products';
import { IoGrid } from 'react-icons/io5';
import { PiListBold } from 'react-icons/pi';
import ShopProducts from '../components/products/ShopProducts';

const FilterButton = ({ filter, setFilter }) => (
  <button
    onClick={() => setFilter(!filter)}
    type='button'
    className='bg-[#059473] hover:bg-[#047b59] py-2 px-6 md:px-8 font-semibold rounded-lg text-white text-center transition-all duration-300 ease-in-out flex justify-center items-center gap-2'
  >
    Filter Products
    <FaChevronDown
      className={`transition-transform duration-300 ${
        filter ? 'rotate-180' : ''
      }`}
    />
  </button>
);

const RatingFilter = ({ setRating }) => (
  <div className='py-3 flex flex-col gap-4'>
    <h3 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h3>
    {[5, 4, 3, 2, 1].map((ratingValue) => (
      <div
        key={ratingValue}
        onClick={() => setRating(ratingValue)}
        className='flex justify-start items-start gap-2 text-xl cursor-pointer'
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>
            {i < ratingValue ? (
              <FaStar color='goldenrod' />
            ) : (
              <FaRegStar color='goldenrod' />
            )}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const [state, setState] = useState({ values: [10, 10000] });
  const [rating, setRating] = useState('');
  const [style, setStyle] = useState('grid');

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
              <FilterButton filter={filter} setFilter={setFilter} />
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
                  {categories.map((c) => (
                    <div
                      key={c}
                      className='flex justify-start items-center gap-2 py-2'
                    >
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
                <div className='p-2 flex flex-col gap-5'>
                  <h3 className='text-3xl font-bold mb-3 text-slate-600'>
                    Price
                  </h3>
                  <Range
                    step={5}
                    min={10}
                    max={10000}
                    values={state.values}
                    onChange={(values) => setState({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        className='w-[15px] h-[15px] bg-[#059473] rounded-full'
                      />
                    )}
                  />
                  <div>
                    <span className='text-slate-800 font-bold text-lg'>
                      ${Math.floor(state.values[0])} - $
                      {Math.floor(state.values[1])}
                    </span>
                  </div>
                </div>
                <RatingFilter setRating={setRating} />
                <div className='py-5 flex flex-col gap-4 md:hidden'>
                  <Products title='New Arrivals' />
                </div>
              </div>
              <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                <div className='pl-8 md:pl-0'>
                  <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                    <h4 className='text-lg font-medium text-slate-600 p-1'>
                      14 Products
                    </h4>
                    <div className='flex justify-center items-center gap-3'>
                      <select
                        name='sort'
                        id='sort'
                        aria-label='Sort products'
                        className='p-1 border outline-0 text-slate-600 font-semibold rounded-md'
                      >
                        <option value=''>Sort by</option>
                        <option value='low-to-high'>Price: Low to High</option>
                        <option value='high-to-low'>Price: High to Low</option>
                      </select>
                      <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                        <button
                          type='button'
                          onClick={() => setStyle('grid')}
                          aria-label='Grid view'
                          className={`p-2 text-slate-600 hover:bg-slate-300 cursor-pointer rounded-md ${
                            style === 'grid' ? 'bg-slate-300' : ''
                          }`}
                        >
                          <IoGrid />
                        </button>
                        <button
                          type='button'
                          onClick={() => setStyle('list')}
                          aria-label='List view'
                          className={`p-2 text-slate-600 hover:bg-slate-300 cursor-pointer rounded-md ${
                            style === 'list' ? 'bg-slate-300' : ''
                          }`}
                        >
                          <PiListBold />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='pb-8'>
                    <ShopProducts styles={style} />
                  </div>
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
