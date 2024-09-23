import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FaRegClock, FaShoppingBasket } from 'react-icons/fa';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';
import { TbBasketCancel } from 'react-icons/tb';

import { get_dashboard } from '../../store/reducers/dashboardReducer';

import { FadeLoader } from 'react-spinners';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    recentOrders,
    totalOrders,
    pendingOrders,
    cancelledOrders,
    loader,
    successMessage,
    errorMessage,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_dashboard(userInfo.id));
  }, [dispatch, userInfo]);

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
    <div>
      {loader && (
        <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
          <FadeLoader />
        </div>
      )}
      {/* Stats Section */}
      <div className='grid grid-cols-3 md:grid-cols-1 gap-5 '>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <FaShoppingBasket />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>{totalOrders}</h3>
            <span className=''>Orders</span>
          </div>
        </div>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <FaRegClock />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>{pendingOrders}</h3>
            <span className=''>Pending</span>
          </div>
        </div>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <TbBasketCancel />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>{cancelledOrders}</h3>
            <span className=''>Cancelled</span>
          </div>
        </div>
      </div>
      {/* Recent Orders Section */}
      <div className='bg-white p-5 mt-5 rounded-md hover:shadow-lg'>
        <h3 className=''>Recent orders</h3>
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
                {recentOrders.map((o, i) => (
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
            {recentOrders.length === 0 && (
              <div className='text-center text-gray-500 py-5'>
                No recent orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
