import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating';

import { FaRegStar, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

import Ratings from './Ratings';
import RatingsTemp from './RatingsTemp';

import Pagination from '../components/Pagination';

import {
  clearMessages,
  customer_review,
  get_reviews,
} from '../store/reducers/homeReducer';

const Reviews = ({ product }) => {
  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const { userInfo } = useSelector((state) => state.auth || {});
  const { successMessage, errorMessage } = useSelector(
    (state) => state.home || {}
  );

  const [rate, setRate] = useState('');
  const [review, setReview] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: review,
      rating: rate,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setRate('');
      setReview('');
      dispatch(clearMessages());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        get_reviews({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [dispatch, pageNumber, product]);

  return (
    <div className='mt-8'>
      <div className='flex gap-10 md-lg:flex-col'>
        <div className='flex flex-col gap-2 justify-start items-start'>
          <div className=''>
            <span className='text-6xl font-semibold'>4.5</span>
            <span className='text-3xl font-semibold text-slate-600'>/5</span>
          </div>
          <div className='flex text-3xl'>
            <Ratings ratings={4.5} />
          </div>
          <p className='text-sm text-slate-600'>15 Reviews</p>
        </div>
        <div className='flex gap-2 flex-col py-4'>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={5} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[60%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>10</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={4} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[75%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>20</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={3} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[40%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>8</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={2} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[30%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>5</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={1} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[60%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>4</p>
          </div>
          <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
              <RatingsTemp ratings={0} />
            </div>
            <div className='w-[200px] h-[14px] bg-slate-200 relative'>
              <div className='w-[5%] h-full bg-[#DAA520]'></div>
            </div>
            <p className='text-sm text-slate-600 w-[0%]'>1</p>
          </div>
        </div>
      </div>
      <h3 className='text-slate-600 text-xl font-bold py-5'>
        Product Reviews 10
      </h3>
      <div className='flex flex-col gap-8 pb-10 pt-4'>
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className='flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 text-xl'>
                <RatingsTemp ratings={4} />
              </div>
              <span className='text-slate-600'>8 Jan 2024</span>
            </div>
            <span className='text-slate-600 text-md'>Victor Johns</span>
            <p className='text-slate-600 text-sm'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
              voluptas dolore error voluptate expedita illum dolorum
              necessitatibus autem, aspernatur ullam magni sunt delectus? Quae
              veniam doloribus aliquam autem vel id voluptate ratione? Officia
              incidunt aliquid doloremque ducimus nulla, vero nesciunt dolores
              iure eius ipsa voluptatum illum suscipit voluptas. Cum, maxime!
            </p>
          </div>
        ))}
        <div className='flex justify-end'>
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              perPage={perPage}
              showItem={Math.floor(10 / 3)}
            />
          }
        </div>
      </div>
      <div className='mt-6 mb-3 p-4 bg-white rounded-lg shadow-md'>
        {userInfo ? (
          <div className='flex flex-col gap-4'>
            {/* Rating Section */}
            <div className='flex items-center gap-2'>
              <RatingReact
                onChange={(rate) => setRate(rate)}
                initialRating={rate}
                emptySymbol={
                  <span className='text-[#DAA520] text-4xl'>
                    <FaRegStar />
                  </span>
                }
                fullSymbol={
                  <span className='text-[#DAA520] text-4xl'>
                    <FaStar />
                  </span>
                }
              />
            </div>
            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className='flex flex-col gap-3'>
              <label
                htmlFor='review'
                className='text-lg font-semibold text-gray-700'
              >
                Write Your Review:
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                name=''
                id='review'
                cols='30'
                rows='5'
                placeholder='Write your review here...'
                className='border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition duration-200'
              ></textarea>
              <button
                type='submit'
                className='py-2 px-4 bg-[#059473] text-white rounded-lg font-semibold hover:bg-[#15bc95] transition duration-200'
              >
                Submit Review
              </button>
            </form>
          </div>
        ) : (
          <div className='text-center'>
            <Link
              to='/login'
              className='py-2 px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200'
            >
              Login First
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
