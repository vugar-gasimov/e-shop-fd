import React from 'react';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Ratings from '../Ratings';

const ShopProducts = ({ styles }) => {
  const containerClass =
    styles === 'grid'
      ? 'flex-col justify-start items-start'
      : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start';
  const imageWrapperClass =
    styles === 'grid'
      ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden'
      : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden';

  return (
    <div
      className={`w-full grid ${
        styles === 'grid'
          ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2 gap-3'
      }`}
    >
      {[1, 2, 3, 4, 5, 6].map((product, index) => (
        <div
          key={index}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${containerClass} w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div className={imageWrapperClass}>
            <img
              src={`http://localhost:3000/images/products/${index + 1}.webp`}
              alt={`Product ${index + 1}`}
              loading='lazy'
              className='w-full h-[270px] md:h-[270px] xs:h-[170px] rounded-md object-contain'
            />
            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaHeart />
              </li>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaEye />
              </li>
              <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                <FaShoppingCart />
              </li>
            </ul>
          </div>
          <div className='py-3 px-5 text-slate-700'>
            <h3 className='font-bold text-lg text-center text-slate-800 mb-2'>
              Product Name
            </h3>
            <div className='flex justify-center items-center gap-4'>
              <p className='text-base font-semibold text-green-600'>$499</p>
              <div className='flex justify-center items-center'>
                <Ratings ratings={3.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ShopProducts);
