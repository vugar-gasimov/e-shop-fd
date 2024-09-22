import React from 'react';
import { Link } from 'react-router-dom';

import { FaShoppingBasket } from 'react-icons/fa';
import { AiOutlineDollar } from 'react-icons/ai';
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';

const Main = () => {
  return (
    <div>
      <div className='grid grid-cols-3 md:grid-cols-1 gap-5 '>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <FaShoppingBasket />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>45</h3>
            <span className=''>Orders</span>
          </div>
        </div>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <FaShoppingBasket />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>45</h3>
            <span className=''>Pending</span>
          </div>
        </div>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 group hover:shadow-lg'>
          <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl group hover:shadow-lg transition-all duration-300'>
            <span className='text-xl text-[#067158] cursor-pointer transform group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#045b46] transition-all duration-300'>
              <FaShoppingBasket />
            </span>
          </div>
          <div className='flex flex-col justify-start items-star text-slate-600'>
            <h3 className='text-3xl font-bold'>2</h3>
            <span className=''>Cancelled</span>
          </div>
        </div>
      </div>
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
                <tr className='bg-white border-b '>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    #344
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    $244
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    pending
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    pending
                  </td>
                  <td className='flex gap-2 justify-start items-center px-6 py-4 font-medium whitespace-nowrap'>
                    {/* View */}
                    <Link className='flex items-center relative group'>
                      <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:rotate-6 hover:bg-green-300'>
                        <HiOutlineDocumentMagnifyingGlass size={25} />
                      </span>
                      <span className='absolute left-0 transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        {' '}
                        View
                      </span>
                    </Link>
                    {/* Pay now */}
                    <Link className='flex items-center relative group'>
                      <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:-rotate-6 hover:bg-green-300'>
                        <AiOutlineDollar size={25} />
                      </span>
                      <span className='absolute left-[-15px] transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        Pay now
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr scope='row' className='bg-white border-b '>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    #344
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    $244
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    pending
                  </td>
                  <td className='px-6 py-4 font-medium whitespace-nowrap'>
                    pending
                  </td>
                  <td className='flex gap-3 justify-start items-center px-6 py-4 font-medium whitespace-nowrap'>
                    {/* View */}
                    <Link className='flex items-center relative group'>
                      <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:rotate-6 hover:bg-green-300'>
                        <HiOutlineDocumentMagnifyingGlass size={25} />
                      </span>
                      <span className='absolute left-0 transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        {' '}
                        View
                      </span>
                    </Link>
                    {/* Pay now */}
                    <Link className='flex items-center relative group'>
                      <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded transition-all duration-300 ease-in-out transform hover:shadow-md hover:scale-110 hover:-rotate-6 hover:bg-green-300'>
                        <AiOutlineDollar size={25} />
                      </span>
                      <span className='absolute left-[-15px] transform -translate-y-8 bg-white text-black text-sm font-semibold px-2 py-1 rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
                        Pay now
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
