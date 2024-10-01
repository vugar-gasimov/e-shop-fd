import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  FaChevronRight,
  FaHeart,
  FaMinus,
  FaLinkedin,
  FaPlus,
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { ImFacebook2 } from 'react-icons/im';
import { VscGithub } from 'react-icons/vsc';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import toast from 'react-hot-toast';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';

import { product_details } from '../store/reducers/homeReducer';
import {
  add_to_cart,
  add_to_wishlist,
  clearMessages,
} from '../store/reducers/cartReducer';
import { FadeLoader } from 'react-spinners';

const Details = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, relatedProducts, sameVendorProducts, loading } = useSelector(
    (state) => state.home || {}
  );

  const { userInfo } = useSelector((state) => state.auth || {});
  const { successMessage, errorMessage } = useSelector(
    (state) => state.cart || {}
  );

  useEffect(() => {
    dispatch(product_details(slug));
  }, [dispatch, slug]);

  const [image, setImage] = useState('');
  const [state, setState] = useState('reviews');

  const responsive = {
    LargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },

    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error('You have reached the maximum available stock.');
    } else {
      setQuantity(quantity + 1);
      toast.success('Quantity updated successfully.');
    }
  };
  const dec = () => {
    if (quantity <= 1) {
      toast.error('Cannot reduce quantity below 1.');
    } else {
      setQuantity(quantity - 1);
      toast.success('Quantity updated successfully.');
    }
  };

  const add_cart = () => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          productId: product._id,
          quantity,
        })
      );
    } else {
      navigate('/login');
      toast.warning('Please log in to add products to your cart.');
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

  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate('/login');
      toast.warning('Please log in to add products to your wishlist.');
    }
  };

  const buy_now = () => {
    if (!product || !product.images || product.images.length === 0) {
      toast.error('Product information is missing or incomplete.');
      return;
    }
    let price = 0;
    if (product?.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product?.price;
    }
    const obj = [
      {
        vendorId: product.vendorId,
        shopName: product.shopName,
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productsInfo: product,
          },
        ],
      },
    ];
    navigate('/shipping', {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 50,
        items: 1,
      },
    });
  };

  if (errorMessage) return <div className='text-red-500'>{errorMessage}</div>;

  return (
    <>
      {loading && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}
      <Header />
      <main>
        {/* Banner Section */}
        <section
          className='h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'
          style={{ backgroundImage: `url("/images/banner/shop.png")` }}
        >
          <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
              <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Product Details</h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                  <Link to='/' className='hover:underline'>
                    Home
                  </Link>
                  <span className='pt-1'>
                    <FaChevronRight />
                  </span>
                  <p>Product Details</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb */}
        <section className=''>
          <div className='bg-slate-100 py-5 mb-5'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
              <div className='flex justify-start items-center text-md text-slate-600 w-full '>
                <Link to='/' className=' hover:underline'>
                  Home
                </Link>
                <span className='pt-1'>
                  <FaChevronRight />
                </span>
                <Link to='/' className=' hover:underline'>
                  {product.category}
                </Link>
                <span className='pt-1'>
                  <FaChevronRight />
                </span>
                <p>{product.name}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Product Details and Carousel */}
        <section className=''>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
              {/* Image Carousel */}
              <div className=''>
                <div className='p-5 border rounded-md'>
                  <img
                    src={image ? image : product.images?.[0]}
                    alt={
                      image
                        ? `Product img of ${product.name}`
                        : `Product img of ${product.name}`
                    }
                    className=' w-full object-contain h-[400px]'
                  />
                </div>
                <div className='py-3'>
                  {product.images && (
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                      transitionDuration={500}
                    >
                      {product.images.map((img, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => setImage(img)}
                            className='p-2 transition-transform transform hover:scale-110 duration-300 ease-in-out cursor-pointer'
                          >
                            <img
                              src={img}
                              alt={`Product img of ${product.name} - ${i + 1}`}
                              className=' w-full object-cover h-[120px] cursor-pointer rounded-lg'
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='text-3xl text-slate-600 font-bold'>
                  <h3 className=''>{product.name}</h3>
                </div>
                <div className='flex justify-start items-center gap-4'>
                  <div className='flex text-xl'>
                    <Ratings ratings={product.rating} />
                  </div>
                  <span className='text-green-600'>(24 reviews)</span>
                </div>
                <div className='text-xl md:text-2xl text-slate-700 font-semibold flex flex-col gap-2'>
                  {product.discount && product.discount > 0 ? (
                    <p className='space-x-2'>
                      <span>Original Price:</span>
                      <span className='line-through text-red-500'>
                        ${product.price}
                      </span>
                      <span>Discounted Price:</span>
                      <span className='text-green-600 font-bold'>
                        $
                        {Math.floor(
                          product.price -
                            (product.price * product.discount) / 100
                        )}
                      </span>
                      <span className='text-sm text-green-500'>
                        (-{product.discount}%)
                      </span>
                    </p>
                  ) : (
                    <p>
                      <span>Price: </span>
                      <span className='text-red-600 font-bold'>
                        ${product.price}
                      </span>
                    </p>
                  )}
                </div>
                <div className='text-slate-600'>
                  <p className='overflow-y-auto max-h-36'>
                    {product.description}
                  </p>
                </div>
                <div className='flex gap-3 pb-10 border-b justify-between'>
                  {product.stock ? (
                    <div className='flex justify-center items-center gap-4'>
                      <div className='flex bg-slate-200 h-[40px] justify-center items-center text-xl rounded-md'>
                        <button
                          onClick={dec}
                          disabled={quantity <= 1}
                          type='button'
                          className={`px-4 py-2 transition-transform duration-300 ease-in-out ${
                            quantity <= 1
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:scale-110 hover:rotate-6'
                          }`}
                        >
                          <FaMinus size={15} />
                        </button>
                        <p className='px-4 font-bold py-2'>{quantity}</p>
                        <button
                          onClick={inc}
                          disabled={quantity >= product.stock}
                          type='button'
                          className={`px-4 py-2 transition-transform duration-300 ease-in-out ${
                            quantity >= product.stock
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:scale-110 hover:rotate-6'
                          }`}
                        >
                          <FaPlus size={15} />
                        </button>
                      </div>
                      <div className=''>
                        <button
                          onClick={add_cart}
                          type='button'
                          className='h-[50px] hover:shadow-md hover:shadow-bg-[#047b59] px-8 py-3 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col justify-center items-start'>
                      <p className='text-red-600 text-lg font-bold'>
                        Out of Stock
                      </p>
                      <button
                        type='button'
                        className='h-[50px] mt-3 hover:shadow-md px-6 py-3 bg-gray-500 text-white font-bold text-md rounded-lg cursor-not-allowed opacity-50'
                        disabled
                      >
                        Add to Cart
                      </button>
                      <button
                        type='button'
                        className='mt-2 text-sm text-blue-500 hover:underline'
                        onClick={() =>
                          alert(
                            'We will notify you when the product is back in stock!'
                          )
                        }
                      >
                        Notify Me When Available
                      </button>
                    </div>
                  )}
                  <div className=''>
                    <button
                      onClick={add_wishlist}
                      type='button'
                      className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white transition-all  duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-300/60 hover:rotate-[720deg]'
                    >
                      <FaHeart size={20} />
                    </button>
                  </div>
                </div>
                <div className='flex py-5 gap-5'>
                  <div className='w-[150px] text-slate-800 font-bold text-xl flex flex-col gap-5'>
                    <span className=''>Avalibiability</span>
                    <span className=''>Share on</span>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <span
                      className={`text-${
                        product.stock ? 'green' : 'red'
                      }-500 font-semibold text-lg`}
                    >
                      {product.stock
                        ? `In stock(${product.stock})`
                        : `Out of stock`}
                    </span>
                    <ul className='flex justify-start items-center gap-3'>
                      <li>
                        <a
                          href='http://www.example.com'
                          className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-gray-800 to-black text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-300/60 hover:rotate-[360deg]'
                        >
                          <FaLinkedin size={19} />
                        </a>
                      </li>
                      <li>
                        <a
                          href='http://www.example.com'
                          className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-gray-800 to-black text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-300/60 hover:rotate-[360deg]'
                        >
                          <ImFacebook2 />
                        </a>
                      </li>
                      <li>
                        <a
                          href='http://www.example.com'
                          className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-gray-800 to-black text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-300/60 hover:rotate-[360deg]'
                        >
                          <FaSquareXTwitter size={19} />
                        </a>
                      </li>
                      <li>
                        <a
                          href='http://www.example.com'
                          className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-gray-800 to-black text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:shadow-gray-300/60 hover:rotate-[360deg]'
                        >
                          <VscGithub size={19} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='flex gap-3 '>
                  {product.stock ? (
                    <button
                      onClick={buy_now}
                      type='button'
                      className='px-6 py-3 bg-[#059473] text-white font-semibold hover:shadow-lg hover:shadow-bg-[#047b59] text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50'
                    >
                      Buy now
                    </button>
                  ) : (
                    <span className='text-red-500 font-semibold'>
                      Product Unavailable
                    </span>
                  )}
                  <Link
                    to='#'
                    className='px-6 py-3 text-[#059473] font-semibold hover:underline hover:text-[#047b59] transition-all duration-300'
                  >
                    Chat with vendor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-12'>
            <div className='flex flex-wrap '>
              <div className='w-[72%] md-lg:w-full'>
                <div className='pr-4 md-lg:pr-0 border-b border-slate-300 mb-4'>
                  <div className='grid grid-cols-2 '>
                    <button
                      type='button'
                      onClick={() => setState('reviews')}
                      className={`py-2 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
                        state === 'reviews'
                          ? 'bg-[#059473] text-white shadow-md'
                          : 'bg-slate-200 text-slate-800'
                      } hover:bg-[#047b59] hover:text-white`}
                    >
                      Reviews
                    </button>
                    <button
                      type='button'
                      onClick={() => setState('description')}
                      className={`py-2 px-6 text-lg font-semibold rounded-t-lg transition-colors duration-300 ease-in-out ${
                        state === 'description'
                          ? 'bg-[#059473] text-white shadow-md'
                          : 'bg-slate-200 text-slate-800'
                      } hover:bg-[#047b59] hover:text-white`}
                    >
                      Description
                    </button>
                  </div>
                  <div className=''>
                    {state === 'reviews' ? (
                      <Reviews product={product} />
                    ) : (
                      <p className='py-5 text-slate-600 overflow-y-auto max-h-96'>
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='w-[28%] md-lg:w-full'>
                <div className='pl-4 md-lg:pl-0'>
                  <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                    <h3 className='font-bold'>From {product.shopName}</h3>
                  </div>
                  <div className='flex flex-col gap-5 mt-3 border p-3 rounded-lg'>
                    {sameVendorProducts && sameVendorProducts.length > 0 ? (
                      sameVendorProducts.map((p, i) => {
                        return (
                          <Link
                            to={`/product/details/${p.slug}`}
                            key={i}
                            className='block group'
                          >
                            <div className='relative h-[270px] overflow-hidden rounded-lg'>
                              <div className='w-full h-full'>
                                <img
                                  src={p.images[0]}
                                  alt={`Same vendor Product img of ${p.name}`}
                                  className='w-full h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1'
                                />
                                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 ease-in-out'></div>
                              </div>
                              {p.discount && p.discount > 0 && (
                                <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                  {p.discount}%
                                </div>
                              )}
                            </div>
                            <div className='mt-2'>
                              <h3 className='text-lg md:text-xl font-semibold text-slate-700 group-hover:text-green-600 transition-colors duration-300'>
                                {p.name}
                              </h3>
                              <div className='flex items-center justify-between mt-1'>
                                <p className='text-lg font-bold text-green-600'>
                                  ${p.price}
                                </p>
                                <div>
                                  <Ratings ratings={p.rating} />
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className='text-center text-gray-500 font-semibold py-4'>
                        No products available from the same vendor.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-3'>
            <h3 className='w-[28%] text-center bg-slate-200 text-2xl py-4 text-slate-600 font-bold'>
              Related Products
            </h3>
            <div className=' border p-3 rounded-lg'>
              {relatedProducts && relatedProducts.length > 0 ? (
                <Swiper
                  slidesPerView='auto'
                  breakpoints={{
                    1536: {
                      // Extra large desktops
                      slidesPerView: 5,
                      spaceBetween: 35,
                    },
                    1280: {
                      // Large desktops
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                    1024: {
                      // Tablet landscape / small desktops
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                    768: {
                      // Tablet portrait
                      slidesPerView: 2.5,
                      spaceBetween: 20,
                    },
                    640: {
                      // Mobile
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    480: {
                      // Small mobile
                      slidesPerView: 1.5,
                      spaceBetween: 15,
                    },
                    320: {
                      // Extra small mobile
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                  }}
                  spaceBetween={25}
                  loop={true}
                  pagination={{
                    clickable: true,
                    el: '.custom_bullet',
                  }}
                  modules={[Pagination]}
                  className='mySwiper'
                >
                  {relatedProducts.map((p, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <Link
                          to={`/product/details/${p.slug}`}
                          className='block group'
                        >
                          <div className='relative h-[270px] overflow-hidden rounded-lg'>
                            <div className='w-full h-full'>
                              <img
                                src={p.images[0]}
                                alt={`Related Product img of ${p.name}`}
                                className='w-full h-full object-contain transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:rotate-1'
                              />

                              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 ease-in-out'></div>
                            </div>
                            {p.discount && p.discount > 0 && (
                              <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                {p.discount}%
                              </div>
                            )}
                          </div>
                          <div className='flex flex-col gap-1 p-4 mt-2'>
                            <h3 className='text-lg md:text-xl font-semibold text-slate-700 group-hover:text-green-600 transition-colors duration-300'>
                              {p.name}
                            </h3>
                            <div className='flex items-center justify-between mt-1'>
                              <p className='text-lg font-bold text-green-600'>
                                ${p.price}
                              </p>
                              <div className=''>
                                <Ratings ratings={3.5} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className='text-center text-gray-500 font-semibold py-4'>
                  No related products available.
                </div>
              )}
            </div>
            <div className='flex justify-center items-center w-full py-10'>
              <div className='custom_bullet flex justify-center gap-2'></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Details;
