import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Shipping = () => {
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
                    <form>
                      <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                          <label htmlFor='name'>Name</label>
                          <input
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
                            type='text'
                            name='address'
                            id='address'
                            placeholder='Enter your address...'
                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                          />
                        </div>
                      </div>
                    </form>
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