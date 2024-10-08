import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';

import Ratings from '../Ratings';

import {
  add_to_cart,
  add_to_wishlist,
  clearMessages,
  get_cart_products,
} from '../../store/reducers/cartReducer';

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth || {});
  const { successMessage, errorMessage } = useSelector(
    (state) => state.cart || {}
  );

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const add_cart = (id) => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          productId: id,
          quantity: 1,
        })
      );
    } else {
      navigate('/login');
      toast.warning('Please log in to add products to your cart.');
    }
    if (userInfo && userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  };

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

  const add_wishlist = (pro) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: pro._id,
          name: pro.name,
          price: pro.price,
          image: pro.images[0],
          discount: pro.discount,
          rating: pro.rating,
          slug: pro.slug,
        })
      );
    } else {
      navigate('/login');
      toast.warning('Please log in to add products to your wishlist.');
    }
  };

  return (
    <div className='w-[85%] flex flex-wrap mx-auto'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[40px]'>
          <h2> Featured Products</h2>
          <div className='w-[100px] h-[3px] bg-[#059473] mt-4 rounded-full'></div>
        </div>
      </div>
      <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {products.map((p, i) => (
          <div
            key={p._id}
            className='border group transition-all duration-500 hover:shadow-md rounded-lg overflow-hidden'
          >
            <div className='relative overflow-hidden'>
              {p.discount ? (
                <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                  {' '}
                  {p.discount}%{' '}
                </div>
              ) : (
                ''
              )}

              <img
                src={p.images[0]}
                alt={p.name}
                className=' w-full object-contain h-[240px]'
              />
              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li
                  onClick={() => add_wishlist(p)}
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
                  onClick={() => add_cart(p._id)}
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
  );
};

export default FeaturedProducts;
