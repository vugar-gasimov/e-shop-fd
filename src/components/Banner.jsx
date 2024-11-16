import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { get_banners } from '../store/reducers/homeReducer';

const Banner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(get_banners());
  }, [dispatch]);

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

  return (
    <section className='w-full md-lg:mt-6'>
      <div className='w-[85%] lg:w-[90%] mx-auto'>
        <div className='w-full flex flex-wrap md-lg:gap-8'>
          <div className='w-full'>
            <div className='my-8'>
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                showDots={true}
                responsive={responsive}
              >
                {banners.length > 0
                  ? banners.map((img, i) => (
                      <Link
                        key={img._id || i}
                        to={`/product/details/${img.link}`}
                      >
                        <img
                          src={img.banner}
                          alt={`Banner img ${img.link}`}
                          className='w-full h-[370px]  object-cover rounded-lg shadow-lg'
                        />
                      </Link>
                    ))
                  : [1, 2, 3, 4, 5, 6].map((img, i) => (
                      <Link key={i} to='#'>
                        <img
                          src={`http://localhost:3000/images/banner/${img}.jpg`}
                          alt='Default banners'
                          onError={(e) => {
                            e.target.src = `http://localhost:3001/images/banner/${img}.jpg`; // Fallback for default image
                          }}
                          className='w-full h-[370px]  object-cover rounded-lg shadow-lg'
                        />
                      </Link>
                    ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
