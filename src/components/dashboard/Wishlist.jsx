import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import Ratings from '../Ratings';

import {
  clearMessages,
  get_wishlist_products,
  remove_wishlist_product,
} from '../../store/reducers/cartReducer';

const Wishlist = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth || {});
  const {
    wish_products,

    successMessage,
    errorMessage,
    loading,
  } = useSelector((state) => state.cart || {});

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  return (
    <>
      {loading && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}
      <div className='bg-white p-4 rounded-md  hover:shadow-lg transition-all transform duration-300 '>
        <h2 className='text-xl font-semibold text-slate-600 text-center py-2'>
          Wish List
        </h2>
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
          {wish_products.map((p, i) => (
            <div
              key={p._id || i}
              className='border group transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden hover:-mt-3'
            >
              <div className='relative overflow-hidden'>
                {p.discount !== 0 && (
                  <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                    {p.discount}%
                  </div>
                )}

                <img
                  src={p.image}
                  alt={`Product img of ${p.name}`}
                  className='w-full object-contain h-[240px]'
                />
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                  <li
                    onClick={() => dispatch(remove_wishlist_product(p._id))}
                    className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'
                  >
                    <FaHeart />
                  </li>
                  <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                    <Link to={`/product/details/${p.slug}`}>
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
                  {p.name}
                </h3>
                <div className='flex justify-center items-center gap-4'>
                  <p className='text-base font-semibold text-green-600'>
                    ${p.price}
                  </p>
                  <div className='flex justify-center items-center'>
                    <Ratings ratings={p.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
