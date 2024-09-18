import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  clearMessages,
  get_cart_products,
  remove_cart_product,
  quantity_increment,
  quantity_decrement,
} from '../store/reducers/cartReducer';
import { place_order } from '../store/reducers/orderReducer';

const Shipping = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();

  const { userInfo } = useSelector((state) => state.auth || {});
  const { successMessage } = useSelector((state) => state.cart || {});
  const [res, setRes] = useState(false);
  const [stateValues, setStateValues] = useState({
    name: '',
    address: '',
    phone: '',
    post: '',
    province: '',
    city: '',
    area: '',
  });

  const inputHandler = (e) => {
    setStateValues({
      ...stateValues,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = stateValues;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };
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

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: stateValues,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  return (
    <>
      <Header />
      <main>
        <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
          <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
              <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                <h2 className='text-3xl font-bold'>Shipping Page</h2>
                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                  <Link to='/'>Home</Link>
                  <span className='pt-1'>
                    <FaChevronRight />
                  </span>
                  <p>Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-[#eeeeee]'>
          <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
            <div className='w-full flex flex-wrap'>
              <div className='w-[67%] md-lg:w-full'>
                <div className='flex flex-col gap-3'>
                  <div className='bg-white p-6 shadow-md rounded-md'>
                    <h3 className='text-slate-600 font-bold pb-3'>
                      Shipping information
                    </h3>
                    {!res && (
                      <>
                        {' '}
                        <form onSubmit={saveChanges}>
                          <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='name'>Name</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.name}
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter your name...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='address'>Address</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.address}
                                type='text'
                                name='address'
                                id='address'
                                placeholder='Enter your address...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                          </div>
                          <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='phone'>Phone</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.phone}
                                type='tel'
                                name='phone'
                                id='phone'
                                placeholder='Enter your phone number...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='post'>Post</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.post}
                                type='text'
                                name='post'
                                id='post'
                                placeholder='Enter your post...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                          </div>
                          <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='province'>Province</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.province}
                                type='text'
                                name='province'
                                id='province'
                                placeholder='Enter your province...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='city'>City</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.city}
                                type='text'
                                name='city'
                                id='city'
                                placeholder='Enter your city...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                          </div>
                          <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <label htmlFor='area'>Area</label>
                              <input
                                onChange={inputHandler}
                                value={stateValues.area}
                                type='text'
                                name='area'
                                id='area'
                                placeholder='Enter your area...'
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                              />
                            </div>
                            <div className='flex flex-col gap-1 mb-2 w-full'>
                              <button
                                type='submit'
                                className='mt-[28px] px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#047b59] focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                    {res && (
                      <div className='flex flex-col gap-1'>
                        <h4 className='text-slate-600 font-semibold pb-2'>
                          Deliver to {stateValues.name}, {stateValues.phone}
                        </h4>
                        <p>
                          <span className='bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>
                            Home
                          </span>
                          <span>
                            {stateValues.address}, {stateValues.province},{' '}
                            {stateValues.city},{stateValues.area}
                          </span>
                        </p>
                        <div className='flex justify-between items-center'>
                          <p className='text-slate-600 text-sm'>
                            Email to blabla@gmail.com
                          </p>
                          <button
                            onClick={() => setRes(false)}
                            className=' px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-[#047b59] focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {products.map((p, i) => (
                    <div
                      key={i}
                      className='flex bg-white p-4 flex-col gap-2 shadow-md rounded-md'
                    >
                      <div className='flex justify-center items-center'>
                        <h3 className='text-md text-slate-600 font-bold'>
                          {p.shopName}
                        </h3>
                      </div>
                      {p.products &&
                        p.products.map((pt, i) => (
                          <div key={i} className='w-full flex flex-wrap '>
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
                </div>
              </div>
              <div className='w-[33%] md-lg:w-full'>
                <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                  <div className='bg-white p-3 text-slate-600 flex flex-col gap-3 shadow-md rounded-md'>
                    <h3 className='text-xl font-bold'>Order Summary</h3>
                    <div className='flex justify-between items-center'>
                      <span>Total items: ({items})</span>
                      <span>${price} </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Delivery fee: </span>

                      <span>${shipping_fee} </span>
                    </div>

                    <div className='flex justify-between items-center'>
                      <span>Total payment: </span>

                      <span className='text-lg text-[#059473]'>
                        ${price + shipping_fee}{' '}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span>Total: </span>

                      <span className='text-lg text-[#059473]'>
                        ${price + shipping_fee}{' '}
                      </span>
                    </div>
                    <button
                      onClick={placeOrder}
                      disabled={res ? false : true}
                      type='button'
                      className={`px-4 py-2  text-white font-bold text-md rounded-lg  transition-all duration-300 ease-in-out focus:outline-none  ${
                        res
                          ? 'cursor-pointer hover:bg-[#047b59] bg-[#059473] hover:shadow-md hover:shadow-[#047b59] focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                          : 'cursor-not-allowed bg-slate-500'
                      }`}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Shipping;
