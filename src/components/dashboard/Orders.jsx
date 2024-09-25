import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';

import { get_orders } from '../../store/reducers/orderReducer';
import { FadeLoader } from 'react-spinners';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderStatus, setOrderStatus] = useState('all');

  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders, loader, errorMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_orders({ customerId: userInfo.id, status: orderStatus }));
    }
  }, [dispatch, orderStatus, userInfo]);

  const handlePaymentClick = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = order.products[i].quantity + items;
    }
    navigate(`/payment`, {
      state: {
        price: order.price,
        orderId: order._id,
        items,
      },
    });
  };

  if (errorMessage) return <div className='text-red-500'>{errorMessage}</div>;

  return (
    <>
      {loader && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}

      <div className='bg-white p-4 rounded-md  hover:shadow-lg transition-all transform duration-300'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold text-slate-600'>My Orders</h3>
          <div className='relative'>
            <select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              className='outline-none border rounded-md text-slate-600 px-3 py-1 bg-white transition-all duration-200 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 appearance-none'
            >
              <option value='all'>--status-- </option>
              <option value='placed'>Placed</option>
              <option value='pending'>Pending</option>
              <option value='cancelled'>Cancelled</option>
              <option value='warehouse'>Warehouse</option>
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='pt-4'>
          <div className='relative overflow-x-auto rounded-md'>
            <table className='w-full text-sm text-left text-gray-500 '>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Order Id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Payment Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Order Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((o, i) => (
                  <tr key={o._id} className='bg-white border-b '>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
                      #{o._id}
                    </td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
                      ${o.price}
                    </td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
                      {o.payment_status}
                    </td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>
                      {o.delivery_status}
                    </td>
                    <td className='flex gap-2 justify-start items-center px-6 py-4 font-medium whitespace-nowrap'>
                      {/* View */}
                      <Link
                        to={`/dashboard/order/details/${o._id}`}
                        className='flex items-center relative group'
                      >
                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:rotate-6 hover:bg-green-300'>
                          <HiOutlineDocumentMagnifyingGlass size={25} />
                        </span>
                        <span className='absolute left-0 transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                          {' '}
                          View
                        </span>
                      </Link>
                      {/* Pay now */}
                      {o.payment_status !== 'paid' && (
                        <button
                          onClick={() => handlePaymentClick(o)}
                          className='flex items-center relative group'
                        >
                          <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:-rotate-6 hover:bg-green-300'>
                            <AiOutlineDollar size={25} />
                          </span>
                          <span className='absolute left-[-15px] transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                            Pay now
                          </span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
