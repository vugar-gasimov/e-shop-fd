import React, { useState } from 'react';
import { TfiEmail } from 'react-icons/tfi';
import {
  FaHeart,
  FaLinkedin,
  FaListUl,
  FaPhoneSquareAlt,
} from 'react-icons/fa';
import { ImFacebook2 } from 'react-icons/im';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { VscGithub } from 'react-icons/vsc';
import { TbArrowBigDownFilled } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import { PiUserCircleFill } from 'react-icons/pi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';

const Header = () => {
  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const user = true;
  const wishList_count = 3;

  return (
    <div className='w-full bg-white'>
      <div className='header-top bg-[#caddff] md-lg:hidden'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                <span className=''>
                  <TfiEmail />
                </span>
                <span className=''>support@gmail.com</span>
              </li>
              <li className='flex relative justify-center items-center gap-2 text-sm'>
                <span className=''>
                  <FaPhoneSquareAlt />
                </span>
                <span className=''>+(380) 973 16 97</span>
              </li>
            </ul>
            <div>
              <div className='flex justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-4 text-black'>
                  <a href='https://example.com'>
                    <ImFacebook2 />
                  </a>
                  <a href='https://example.com'>
                    <FaSquareXTwitter size={19} />
                  </a>
                  <a href='https://example.com'>
                    <FaLinkedin size={19} />
                  </a>
                  <a href='https://example.com'>
                    <VscGithub size={19} />
                  </a>
                </div>
                <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                  <img
                    src='http://localhost:3000/images/language.png'
                    alt='Language selection flag'
                  />
                  <span>
                    <TbArrowBigDownFilled />
                  </span>
                  <ul className=' absolute invisible transition-all top-12 rounded-lg duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 bg-black'>
                    <li>
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-2 py-1 rounded w-full text-left'>
                        English{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-2 py-1 rounded w-full text-left'>
                        German{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-2 py-1 rounded w-full text-left'>
                        Spanish{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-2 py-1 rounded w-full text-left'>
                        Chinese{' '}
                      </button>
                    </li>
                  </ul>
                </div>
                {user ? (
                  <Link
                    to='/dashboard'
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  >
                    <span>
                      <PiUserCircleFill size={20} />
                    </span>
                    <span>Chuckle McGiggles</span>
                  </Link>
                ) : (
                  <Link
                    to='/login'
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'
                  >
                    <span>
                      <RiLockPasswordFill size={18} />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
            <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
              <div className='flex justify-between items-center'>
                <Link to='/'>
                  <img
                    src='http://localhost:3000/images/logo.png'
                    alt='Website logo'
                  />
                </Link>

                <button
                  type='button'
                  onClick={() => setShowSidebar(false)}
                  aria-label='Toggle navigation menu'
                  className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-lg cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'
                >
                  <FaListUl />
                </button>
              </div>
            </div>
            <div className='md-lg:w-full w-9/12'>
              <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/' ? 'text-[#059473]' : 'text-slate-600'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/shop'
                          ? 'text-[#059473]'
                          : 'text-slate-600'
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/blog'
                          ? 'text-[#059473]'
                          : 'text-slate-600'
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/about'
                          ? 'text-[#059473]'
                          : 'text-slate-600'
                      }`}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === '/contact'
                          ? 'text-[#059473]'
                          : 'text-slate-600'
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                  <div className='flex justify-center gap-5'>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                      <button type='button' className='text-xl text-green-500'>
                        <FaHeart />
                      </button>
                      <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                        {wishList_count}
                      </div>
                    </div>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                      <button type='button' className='text-xl text-green-500'>
                        <TiShoppingCart size={24} />
                      </button>
                      <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                        {wishList_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
