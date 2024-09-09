import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Products = ({ title, products }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },

    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className='flex justify-around items-center'>
        <div className='text-xl font-bold text-slate-600'>{title}</div>
        <div className='flex justify-center items-center gap-3 text-slate-600'>
          <button
            onClick={() => previous()}
            type='button'
            className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 rounded-lg'
          >
            {' '}
            <FaChevronLeft />
          </button>
          <button
            onClick={() => next()}
            type='button'
            className='w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 rounded-lg'
          >
            {' '}
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='flex gap-8 flex-col-reverse'>
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p) => {
          return (
            <div key={p._id} className='flex flex-col justify-start gap-2'>
              {p.map((pl, j) => (
                <Link
                  to='#'
                  key={pl._id}
                  className='flex justify-start items-start hover:scale-95 transition-transform duration-200'
                >
                  <img
                    src={pl.images[0]}
                    alt={pl.name}
                    className='w-[110px] h-[110px] object-contain'
                  />
                  <div className='px-3 flex justify-start items-start gap-1 flex-col text-slate-600'>
                    <h3 className='font-semibold text-lg'>{pl.name}</h3>
                    <p className='text-base font-bold '>${pl.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
