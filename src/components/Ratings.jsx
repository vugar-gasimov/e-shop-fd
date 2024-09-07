import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = ({ ratings }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (ratings >= starValue) {
      return (
        <span
          key={index}
          className='text-goldenrod transition-transform transform hover:scale-125 hover:text-green-500 duration-300 ease-in-out cursor-pointer'
        >
          <FaStar color='goldenrod' />
        </span>
      );
    } else if (ratings >= starValue - 0.5) {
      return (
        <span
          key={index}
          className='text-goldenrod transition-transform transform hover:scale-125 hover:text-green-500 duration-300 ease-in-out cursor-pointer'
        >
          <FaStarHalfAlt color='goldenrod' />
        </span>
      );
    } else {
      return (
        <span
          key={index}
          className='text-goldenrod transition-transform transform hover:scale-125 hover:text-green-500 duration-300 ease-in-out cursor-pointer'
        >
          <FaRegStar color='goldenrod' />
        </span>
      );
    }
  });

  return <div className='flex space-x-1'>{stars}</div>;
};

export default Ratings;
