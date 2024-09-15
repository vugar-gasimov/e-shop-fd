import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_products } from '../store/reducers/cartReducer';
const Carts = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth || {});
  const navigate = useNavigate();
  const cart_products = [1, 2];
  const outOfStockProducts = [1, 2];

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, [dispatch, userInfo]);

  const redirect = () => {
    navigate('/shipping', {
      state: {
        products: [],
        price: 499,
        shipment_fee: 10,
        items: 2,
      },
    });
  };
  return (
    <>
      <Header />
      <main>
        <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
          <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
              <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Carts Page</h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                  <Link to='/'>Home</Link>
                  <span className='pt-1'>
                    <FaChevronRight />
                  </span>
                  <p>Carts</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-[#eeeeee]'>
          <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
            {cart_products.length > 0 || outOfStockProducts.length > 0 ? (
              <div className='flex flex-wrap '>
                <div className='w-[67%] md-lg:w-full'>
                  <div className='pr-3 md-lg:pr-0'>
                    <div className='flex flex-col gap-3'>
                      <div className='bg-white p-4 shadow-md rounded-md'>
                        <h3 className='text-md text-green-600 font-semibold'>
                          Products in stock: {cart_products.length}
                        </h3>
                      </div>
                      {cart_products.map((p, i) => (
                        <div className='flex bg-white p-4 flex-col gap-2 shadow-md rounded-md'>
                          <div className='flex justify-center items-center'>
                            <h3 className='text-md text-slate-600 font-bold'>
                              Easy Shop
                            </h3>
                          </div>
                          {[1, 2].map((p, i) => (
                            <div key={i} className='w-full flex flex-wrap'>
                              <div className='flex sm:w-full gap-2 w-7/12'>
                                <div className='flex gap-2 justify-start items-center'>
                                  <img
                                    src={`http://localhost:3000/images/products/${
                                      i + 1
                                    }.webp`}
                                    alt={`Product ${i + 1}`}
                                    loading='lazy'
                                    className='w-[80px] h-[80px] rounded-md object-cover'
                                  />
                                  <div className='pr-4 text-slate-600'>
                                    <h3 className='text-md font-semibold'>
                                      Product name:
                                    </h3>
                                    <p className='text-sm'>Brand: Tyera</p>
                                  </div>
                                </div>
                              </div>
                              <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                <div className='pl-4 sm:pl-0'>
                                  <h3 className='text-lg text-green-500'>
                                    $199
                                  </h3>
                                  <p className='line-through'>250</p>
                                  <p className=''>-20%</p>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                    <button
                                      type='button'
                                      className='px-3 cursor-pointer'
                                    >
                                      <FaMinus size={15} />
                                    </button>
                                    <p className='px-3 font-bold'>2</p>
                                    <button type='button' className='px-3'>
                                      <FaPlus size={15} />
                                    </button>
                                  </div>
                                  <button
                                    type='button'
                                    className='inline-block px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 whitespace-nowrap'
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                      {outOfStockProducts.length > 0 && (
                        <div className='flex flex-col gap-3 '>
                          <div className='bg-white p-4 shadow-md rounded-md'>
                            <h3 className='text-md text-red-600 font-semibold'>
                              Products out of stock: {cart_products.length}
                            </h3>
                          </div>
                          <div className='bg-white p-4 shadow-md rounded-md '>
                            {[1, 2].map((p, i, arr) => (
                              <div
                                key={i}
                                className={`w-full flex flex-wrap  ${
                                  i < arr.length - 1 ? 'mb-4' : ''
                                }`}
                              >
                                <div className='flex sm:w-full gap-2 w-7/12'>
                                  <div className='flex gap-2 justify-start items-center'>
                                    <img
                                      src={`http://localhost:3000/images/products/${
                                        i + 1
                                      }.webp`}
                                      alt={`Product ${i + 1}`}
                                      loading='lazy'
                                      className='w-[80px] h-[80px] rounded-md object-cover'
                                    />
                                    <div className='pr-4 text-slate-600'>
                                      <h3 className='text-md font-semibold'>
                                        Product name:
                                      </h3>
                                      <p className='text-sm'>Brand: Tyera</p>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                  <div className='pl-4 sm:pl-0'>
                                    <h3 className='text-lg text-green-500'>
                                      $199
                                    </h3>
                                    <p className='line-through'>250</p>
                                    <p className=''>-20%</p>
                                  </div>
                                  <div className='flex gap-2 flex-col'>
                                    <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                      <button
                                        type='button'
                                        className='px-3 cursor-pointer'
                                      >
                                        <FaMinus size={15} />
                                      </button>
                                      <p className='px-3 font-bold'>2</p>
                                      <button type='button' className='px-3'>
                                        <FaPlus size={15} />
                                      </button>
                                    </div>
                                    <button
                                      type='button'
                                      className='inline-block px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 whitespace-nowrap'
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='w-[33%] md-lg:w-full'>
                  <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                    {cart_products.length > 0 && (
                      <div className='bg-white p-3 text-slate-600 flex flex-col gap-3 shadow-md rounded-md'>
                        <h3 className='text-xl font-bold'>Order List</h3>
                        <div className='flex justify-between items-center'>
                          <span>2 items: </span>

                          <span>$99 </span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Shipping fee: </span>

                          <span>$10 </span>
                        </div>
                        <div className='flex border rounded-lg'>
                          <input
                            type='text'
                            name='coupon'
                            id='coupon'
                            placeholder='Input Coupon...'
                            className='w-full px-3 py-2  outline-0 rounded-lg'
                          />
                          <button
                            type='button'
                            className='inline-block px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 whitespace-nowrap'
                          >
                            Apply
                          </button>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Total: </span>

                          <span className='text-lg text-[#059473]'>$10 </span>
                        </div>
                        <button
                          onClick={redirect}
                          type='button'
                          className=' px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#047b59] focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                        >
                          Process to checkout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex justify-center items-center'>
                <Link
                  to='/shops'
                  className='flex justify-center items-center gap-1 px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                >
                  Shop now
                  <BsCart4 />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Carts;
