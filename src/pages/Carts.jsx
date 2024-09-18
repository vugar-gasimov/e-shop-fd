import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearMessages,
  get_cart_products,
  remove_cart_product,
  quantity_increment,
  quantity_decrement,
} from '../store/reducers/cartReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth || {});
  const {
    cart_products,
    price,
    shipping_fee,
    out_of_stock,
    buy_product_item,
    loading,
    successMessage,
  } = useSelector((state) => state.cart || {});

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_cart_products(userInfo.id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, userInfo?.id]);

  useEffect(() => {
    if (successMessage === 'Product removed successfully') {
      dispatch(get_cart_products(userInfo.id));
    }
  }, [successMessage, dispatch, userInfo.id]);

  const increment = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_increment(cartId)).then(() => {
        if (userInfo && userInfo.id) {
          dispatch(get_cart_products(userInfo.id));
        }
      });
    }
  };
  const decrement = (quantity, cartId) => {
    let temp = quantity;
    if (temp > 0) {
      temp = quantity - 1;
      dispatch(quantity_decrement(cartId)).then(() => {
        if (userInfo && userInfo.id) {
          dispatch(get_cart_products(userInfo.id));
        }
      });
    }
  };
  const handleNavigate = () => {
    navigate('/shipping', {
      state: {
        products: cart_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };
  return (
    <>
      {loading && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}
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
            {cart_products.length > 0 || out_of_stock.length > 0 ? (
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
                        <div
                          key={i}
                          className='flex bg-white p-4 flex-col gap-2 shadow-md rounded-md'
                        >
                          <div className='flex justify-center items-center'>
                            <h3 className='text-md text-slate-600 font-bold'>
                              Shop Name: {p.shopName}
                            </h3>
                          </div>
                          {p.products.map((pt, i) => (
                            <div key={i} className='w-full flex flex-wrap'>
                              <div className='flex sm:w-full gap-2 w-7/12'>
                                <div className='flex gap-2 justify-start items-center'>
                                  <img
                                    src={pt.productsInfo.images[0]}
                                    alt={`Product ${pt.productsInfo.name} img`}
                                    loading='lazy'
                                    className='w-[80px] h-[80px] rounded-md object-cover'
                                  />
                                  <div className='pr-4 text-slate-600'>
                                    <h3 className='text-md font-semibold'>
                                      Name: {pt.productsInfo.name}
                                    </h3>
                                    <p className='text-sm'>
                                      Brand: {pt.productsInfo.brand}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                <div className='pl-4 sm:pl-0'>
                                  <h3 className='text-lg text-green-500'>
                                    $
                                    {pt.productsInfo.price -
                                      Math.floor(
                                        (pt.productsInfo.price *
                                          pt.productsInfo.discount) /
                                          100
                                      )}
                                  </h3>
                                  <p className='line-through'>
                                    {pt.productsInfo.discount > 0
                                      ? `${pt.productsInfo.price}`
                                      : ''}
                                  </p>
                                  <p className=''>
                                    {pt.productsInfo.discount > 0
                                      ? `Discount: -${pt.productsInfo.discount}%`
                                      : 'No Discount'}
                                  </p>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                    <button
                                      onClick={() =>
                                        decrement(pt.quantity, pt._id)
                                      }
                                      type='button'
                                      className='px-3 cursor-pointer'
                                    >
                                      <FaMinus size={15} />
                                    </button>
                                    <p className='px-3 font-bold'>
                                      {pt.quantity}
                                    </p>
                                    <button
                                      onClick={() =>
                                        increment(
                                          pt.quantity,
                                          pt.productsInfo.stock,
                                          pt._id
                                        )
                                      }
                                      type='button'
                                      className='px-3'
                                    >
                                      <FaPlus size={15} />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(remove_cart_product(pt._id))
                                    }
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
                      {out_of_stock.length > 0 && (
                        <div className='flex flex-col gap-3 '>
                          <div className='bg-white p-4 shadow-md rounded-md'>
                            <h3 className='text-md text-red-600 font-semibold'>
                              Products out of stock: {out_of_stock.length}
                            </h3>
                          </div>
                          <div className='bg-white p-4 shadow-md rounded-md '>
                            {out_of_stock.map((p, i, arr) => (
                              <div
                                key={i}
                                className={`w-full flex flex-wrap  ${
                                  i < arr.length - 1 ? 'mb-4' : ''
                                }`}
                              >
                                <div className='flex sm:w-full gap-2 w-7/12'>
                                  <div className='flex gap-2 justify-start items-center'>
                                    <img
                                      src={p.products[0].images[0]}
                                      alt={`Product ${p.products[0].name}`}
                                      loading='lazy'
                                      className='w-[80px] h-[80px] rounded-md object-cover'
                                    />
                                    <div className='pr-4 text-slate-600'>
                                      <h3 className='text-md font-semibold'>
                                        Name: {p.products[0].name}
                                      </h3>
                                      <p className='text-sm'>
                                        Brand: {p.products[0].brand}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                  <div className='pl-4 sm:pl-0'>
                                    <h3 className='text-lg text-green-500'>
                                      $
                                      {p.products[0].price -
                                        Math.floor(
                                          (p.products[0].price *
                                            p.products[0].discount) /
                                            100
                                        )}
                                    </h3>
                                    <p className='line-through'>
                                      {p.products[0].discount > 0
                                        ? `${p.products[0].price}`
                                        : ''}
                                    </p>
                                    <p className=''>
                                      {p.products[0].discount > 0
                                        ? `Discount: -${p.products[0].discount}%`
                                        : 'No Discount'}
                                    </p>
                                  </div>
                                  <div className='flex gap-2 flex-col'>
                                    <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                      <button
                                        onClick={() =>
                                          decrement(
                                            p.quantity,

                                            p._id
                                          )
                                        }
                                        type='button'
                                        className='px-3 cursor-pointer'
                                      >
                                        <FaMinus size={15} />
                                      </button>
                                      <p className='px-3 font-bold'>
                                        {p.quantity}
                                      </p>
                                      <button
                                        onClick={() =>
                                          increment(
                                            p.quantity,
                                            p.products.stock,
                                            p._id
                                          )
                                        }
                                        type='button'
                                        className='px-3'
                                      >
                                        <FaPlus size={15} />
                                      </button>
                                    </div>
                                    <button
                                      onClick={() =>
                                        dispatch(remove_cart_product(p._id))
                                      }
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
                          <span>{buy_product_item} items: </span>

                          <span>${price} </span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Shipping fee: </span>

                          <span>${shipping_fee} </span>
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

                          <span className='text-lg text-[#059473]'>
                            ${price + shipping_fee}{' '}
                          </span>
                        </div>
                        <button
                          onClick={handleNavigate}
                          type='button'
                          className=' px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#047b59] focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                        >
                          Process to checkout ({buy_product_item})
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
