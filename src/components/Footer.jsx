import React from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2 } from 'react-icons/im';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { VscGithub } from 'react-icons/vsc';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-[#f3f6fa]'>
      <section className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
        <div className='w-3/12 lg:w-4/12 sm:w-full'>
          <div className='flex flex-col gap-3'>
            {' '}
            <Link to='/'>
              <img
                src='http://localhost:3000/images/logo.png'
                alt='Website logo'
                className='w-[190px] h-[70px] hover:scale-105 transition-transform duration-200'
              />
            </Link>
            <ul className='flex flex-col gap-2 text-slate-600'>
              <li className=''>
                Address: Acme Corporation 123 Main Street Anytown, CA 12345
                United States
              </li>
              <li className=''>Phone: +1 (123) 456-7890</li>
              <li className=''>Email: eshopsupport.gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='w-5/12 lg:w-8/12 sm:w-full'>
          <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
            <div className=''>
              <h3 className='font-bold text-lg mb-2 italic'>Useful Links</h3>
              <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      About Us
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      About our Shop
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Delivery Information
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Privacy Policy
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Blogs
                    </Link>
                  </li>
                </ul>
                <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Contact Us
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      FAQ
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Terms of Services
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Returns & Exchanges
                    </Link>
                  </li>
                  <li className=''>
                    <Link to='#' className='hover:text-green-600'>
                      Gift Cards
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='w-4/12 lg:w-full lg:mt-6'>
          <div className='w-full flex flex-col justify-start gap-3'>
            <h3 className='font-bold text-lg mb-1 italic'>Join our Shop</h3>
            <p className='text-sm font-medium  text-slate-600 '>
              {' '}
              Sign up to get exclusive offers, the latest product updates, and
              access to special promotions. Become a member of our community and
              enjoy early access to new arrivals, members-only discounts, and
              much more!
            </p>
            <div className='h-[50px] w-full bg-white border relative rounded-lg'>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='Enter your email...'
                className='h-full bg-transparent w-full px-3 outline-0 '
              />
              <button
                type='submit'
                className='h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm hover:bg-[#068568] focus:bg-[#068568] hover:shadow-md transition duration-300 rounded-lg'
              >
                Submit
              </button>
            </div>
            <ul className='flex justify-start items-center gap-3'>
              <li className='hover:scale-105 transition-transform duration-200 '>
                <a
                  href='example.com'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-400 hover:rotate-[720deg]'
                >
                  <ImFacebook2 />
                </a>
              </li>
              <li className='hover:scale-105 transition-transform duration-200'>
                <a
                  href='example.com'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-400 hover:rotate-[720deg]'
                >
                  <FaSquareXTwitter size={19} />
                </a>
              </li>
              <li className='hover:scale-105 transition-transform duration-200'>
                <a
                  href='example.com'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-400 hover:rotate-[720deg]'
                >
                  <FaLinkedin size={19} />
                </a>
              </li>
              <li className='hover:scale-105 transition-transform duration-200'>
                <a
                  href='example.com'
                  className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full transition-all duration-400 hover:rotate-[720deg]'
                >
                  <VscGithub size={19} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='w-[90%] flex justify-center flex-wrap items-center text-slate-600 mx-auto py-5 text-center'>
        <p>Copyright © 2024 Easy Shop Ecommerce. All rights reserved.</p>
      </section>
    </footer>
  );
};

export default Footer;
