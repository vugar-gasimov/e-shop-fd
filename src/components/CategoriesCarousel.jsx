import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

const CategoriesCarousel = () => {
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

  const responsive = {
    LargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },

    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mediumTablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smallMobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    extraSmallMobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='w-[87%] mx-auto relative'>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.map((c, i) => (
          <Link key={i} to='#' className='h-[185px] border rounded-md block'>
            <div className='w-full h-full relative p-3'>
              <img
                src={`http://localhost:3000/images/products/${i + 1}.webp`}
                alt={`Category ${i + 1} img`}
              />
              <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                <span className='py-[2px] px-6 bg-[#0000005c] text-white rounded-xl'>
                  {c}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;
