import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const RatingsTemp = ({ ratings }) => {
  if (ratings === 5) {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
      </>
    );
  } else if (ratings === 4) {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
      </>
    );
  } else if (ratings === 3) {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
      </>
    );
  } else if (ratings === 2) {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
      </>
    );
  } else if (ratings === 1) {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
        <span className=' transition-transform transform hover:scale-125 hover:text-[#f9c646] duration-300 ease-in-out cursor-pointer'>
          <FaRegStar color='goldenrod' />
        </span>
      </>
    );
  }
};

export default RatingsTemp;
