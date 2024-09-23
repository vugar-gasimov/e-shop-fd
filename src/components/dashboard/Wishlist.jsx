import React from 'react';
import Ratings from '../Ratings';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  return (
    <div className='bg-white p-4 rounded-md  hover:shadow-lg transition-all transform duration-300 '>
      <h2 className='text-xl font-semibold text-slate-600 text-center py-2'>
        Wish List
      </h2>
      <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {[1, 2, 3, 4].map((p, i) => (
          <div
            key={p._id || i}
            className='border group transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden hover:-mt-3'
          >
            <div className='relative overflow-hidden'>
              <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                4%
              </div>

              <img
                src='http://localhost:3000/images/products/1.webp'
                alt='Product img one'
                className=' w-full object-contain h-[240px]'
              />
              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaHeart />
                </li>
                <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                  <Link to='/product/details/new'>
                    <FaEye />
                  </Link>
                </li>
                <li
                  // onClick={() => add_cart(p._id || i)}
                  className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                >
                  <FaShoppingCart />
                </li>
              </ul>
            </div>

            <div className='py-3 px-2 text-slate-700'>
              <h3 className='font-bold text-lg text-center text-slate-800 mb-2'>
                Iphone 1000x gp pro
              </h3>
              <div className='flex justify-center items-center gap-4'>
                <p className='text-base font-semibold text-green-600'>$99</p>
                <div className='flex justify-center items-center'>
                  <Ratings ratings={4.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
