import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { FadeLoader } from 'react-spinners';

import { get_order_info } from '../../store/reducers/orderReducer';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrder, loader, errorMessage } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_order_info(orderId));
  }, [dispatch, orderId]);

  if (errorMessage) return <div className='text-red-500'>{errorMessage}</div>;

  return (
    <>
      {' '}
      {loader && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}
      <div className='bg-white p-4 rounded-md  hover:shadow-lg transition-all transform duration-300'>
        <h2 className='text-xl font-semibold text-slate-600'>Order Details</h2>
        <h3 className='text-slate-600 font-bold'>
          Order Id: <span className='font-normal'>#{myOrder._id},</span>
          <span className='pl-1'>
            Order Date: <span className='font-normal'>{myOrder.date}</span>
          </span>
        </h3>
        <div className='grid grid-cols-2 gap-3'>
          <div className='flex flex-col gap-1 p-2'>
            <h4 className='text-slate-600 font-bold font-sans'>
              Delivery to:{' '}
              <span className='font-normal'>{myOrder.shippingInfo?.name}</span>
            </h4>

            <span className='bg-blue-100 w-12 text-blue-800 text-xs font-medium mr-2 px-2 py-1 rounded '>
              Home
            </span>
            <div className='text-gray-600 text-sm'>
              <p>{myOrder.shippingInfo?.address}</p>
              <p>
                {myOrder.shippingInfo?.city}, {myOrder.shippingInfo?.province} -{' '}
                {myOrder.shippingInfo?.post}
              </p>
              <p>{myOrder.shippingInfo?.phone}</p>
            </div>

            <p className='text-slate-600 text-md font-bold '>
              Email to:{' '}
              <span className='text-gray-600 font-normal'>
                {userInfo?.email}
              </span>
            </p>
          </div>
          <div className='text-slate-600 p-2'>
            <h4 className='font-mono text-slate-600 font-bold'>
              Price:{' '}
              <span className='font-normal text-blue-700 text-lg'>
                ${myOrder.price}{' '}
              </span>
              <span className='font-normal italic'>shipping fee included</span>
            </h4>
            <p className='text-slate-600 font-bold  font-mono '>
              Payment Status:
              <span
                className={`font-normal rounded-md py-1 text-xs px-3 ${
                  myOrder.payment_status === 'paid'
                    ? 'bg-green-300 text-green-700'
                    : 'bg-red-300 text-red-700'
                }`}
              >
                {myOrder.payment_status}
              </span>
            </p>
            <p className='text-slate-600 font-bold font-mono '>
              Order Status:
              <span
                className={`font-normal rounded-md py-1 text-xs px-3 ${
                  myOrder.delivery_status === 'paid'
                    ? 'bg-green-300 text-green-700'
                    : 'bg-red-300 text-red-700'
                }`}
              >
                {myOrder.delivery_status}
              </span>
            </p>
          </div>
        </div>
        <div className='mt-4'>
          <h3 className='text-xl font-semibold text-slate-600 p-2'>
            Ordered Products
          </h3>
          <div className='flex gap-5 flex-col'>
            {myOrder.products?.map((p, i) => (
              <div key={i} className='p-2'>
                <div className='flex gap-5 justify-start items-center text-slate-600'>
                  <div className='flex gap-2 items-center'>
                    <div className='w-[55px] h-[55px] overflow-hidden rounded-md'>
                      <img
                        src={p?.images[0]}
                        alt={p?.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex text-sm flex-col justify-start items-start space-y-1'>
                      <Link
                        to='#'
                        className='text-blue-600 font-semibold hover:text-blue-700 focus:text-blue-700 transition duration-300 ease-in-out transform hover:scale-105 hover:rotate-1 focus:scale-105 focus:rotate-1 hover:shadow-lg focus:shadow-lg'
                      >
                        {p?.name}
                      </Link>
                      <p className='text-gray-600'>
                        <span className='block'>
                          Brand: <span className='font-medium'>{p?.brand}</span>
                        </span>
                        <span className='block '>
                          Quantity:{' '}
                          <span className='font-medium'>{p?.quantity}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='pl-4 flex flex-col'>
                    <h2 className='text-lg font-bold text-green-600'>
                      ${(p?.price - (p?.price * p?.discount) / 100).toFixed(2)}
                    </h2>

                    {p?.discount > 0 ? (
                      <>
                        <span className='text-sm text-red-500 font-medium'>
                          Discount: %{p?.discount}
                        </span>
                        <span className='text-sm text-gray-500 line-through'>
                          ${p?.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className='text-sm text-gray-500'>
                        No discount available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
