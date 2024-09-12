import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useSelector } from 'react-redux';

const CategoriesCarousel = () => {
  const { categories } = useSelector((state) => state.home || {});

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
    <section className='w-[87%] mx-auto relative'>
      <div className='w-full'>
        <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[30px]'>
          <h2> Top Categories </h2>
          <div className='w-[150px] h-[3px] bg-[#059473] mt-4 rounded-full'></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category.name}`}
              className='h-[185px] border rounded-md block'
            >
              <div className='w-full h-full relative p-3'>
                <img
                  src={category.image}
                  alt={category.name}
                  className=' object-contain w-full h-full rounded-md'
                />
                <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                  <span className='py-[2px] px-6 bg-[#0000005c] text-white rounded-xl truncate'>
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </Carousel>
    </section>
  );
};

export default CategoriesCarousel;
