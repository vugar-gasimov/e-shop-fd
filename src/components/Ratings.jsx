import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Ratings = ({ ratings }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (ratings >= starValue) {
      return (
        <span key={index}>
          <FaStar color='goldenrod' />
        </span>
      );
    } else if (ratings >= starValue - 0.5) {
      return (
        <span key={index}>
          <FaStarHalfAlt color='goldenrod' />
        </span>
      );
    } else {
      return (
        <span key={index}>
          <FaRegStar color='goldenrod' />
        </span>
      );
    }
  });

  return <>{stars}</>;
};

export default Ratings;
