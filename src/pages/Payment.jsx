import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';

const Payment = () => {
  const { state } = useLocation();
  const price = state?.price || 0;
  const items = state?.items || [];
  const orderId = state?.orderId || '';
  //   const {
  //     state: { price, items, orderId },
  //   } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  return (
    <>
      <Header />
      <main className='bg-[#eeeeee]'>
        <section className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] py-16 mt-4 mx-auto'>
          <div className='flex flex-wrap md:flex-col-reverse '>
            <div className='w-7/12 md:w-full'>
              <div className='pr-2 md:pr-0'>
                <div className='flex flex-wrap'>
                  <div
                    onClick={() => setPaymentMethod('stripe')}
                    className={`flex items-center justify-center flex-col w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'
                    }`}
                  >
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img
                        src='http://localhost:3000/images/payment/stripe.png'
                        alt='Payment status stripe img.'
                      />
                    </div>
                    <span className='text-slate-600'>Stripe</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-center flex-col w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === 'cod' ? 'bg-white' : 'bg-slate-100'
                    }`}
                  >
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img
                        src='http://localhost:3000/images/payment/cod.jpg'
                        alt='Payment status cash on delivery img.'
                      />
                    </div>
                    <span className='text-slate-600'>COD</span>
                  </div>
                </div>
              </div>
              {paymentMethod === 'stripe' && (
                <div>
                  <Stripe />
                </div>
              )}
              {paymentMethod === 'cod' && (
                <div className='w-full px-4 py-8 bg-white shadow-md'>
                  <button className=' px-10 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all hover:shadow-md hover:shadow-[#5daf9c] duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50'>
                    Pay now
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
