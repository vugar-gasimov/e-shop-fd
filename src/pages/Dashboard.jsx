import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { FaList, FaShoppingBag } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { PiListHeartFill } from 'react-icons/pi';
import { IoMdChatbubbles } from 'react-icons/io';
import { GrShieldSecurity } from 'react-icons/gr';
import { GiExitDoor } from 'react-icons/gi';

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);
  return (
    <>
      <Header />
      <main className='bg-slate-200 mt-5'>
        <section className='w-[90%] mx-auto md-lg:block hidden'>
          <div className='py-2'>
            <button
              type='button'
              onClick={() => setFilterShow(!filterShow)}
              aria-label='Toggle navigation menu'
              className='text-center py-3 px-3  bg-[#059473] text-slate-100 border border-slate-100 rounded-md cursor-pointer'
            >
              <FaList />
            </button>
          </div>
        </section>
        <section className='h-full mx-auto '>
          <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
            <div
              className={` hover:shadow-lg rounded-md z-50 md-lg:absolute w-[270px] ml-4 bg-white ${
                filterShow ? '-left-4' : '-left-[360px]'
              } `}
            >
              <ul className='py-2 text-slate-600 px-4'>
                <li className='p-3 rounded-lg py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard'
                    className='group-hover:scale-110 font-semibold  flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <VscGraph />
                    </span>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className='p-3 rounded-lg  py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard/my-orders'
                    className=' group-hover:scale-110 font-semibold flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <FaShoppingBag />
                    </span>
                    <span>My Orders</span>
                  </Link>
                </li>
                <li className='p-3 rounded-lg  py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard/wishlist '
                    className=' group-hover:scale-110 font-semibold flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <PiListHeartFill />
                    </span>
                    <span> Wishlist</span>
                  </Link>
                </li>
                <li className='p-3 rounded-lg  py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard/chat'
                    className=' group-hover:scale-110 font-semibold flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <IoMdChatbubbles />
                    </span>
                    <span>Chat</span>
                  </Link>
                </li>
                <li className='p-3 rounded-lg  py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard/change-password'
                    className=' group-hover:scale-110 font-semibold flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <GrShieldSecurity />
                    </span>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li className='p-3 rounded-lg  py-2 group hover:shadow-lg transition-all duration-300'>
                  <Link
                    to='/dashboard'
                    className=' group-hover:scale-110 font-semibold flex justify-start items-center gap-2'
                  >
                    <span className='transform text-xl group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#045b46] transition-all duration-300'>
                      <GiExitDoor />
                    </span>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='w-[calc(100%-270px)] md-lg:w-full'>
              <div className='mx-4 md-lg:mx-0'>
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
