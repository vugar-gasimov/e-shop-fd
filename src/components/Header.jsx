import React, { useEffect, useRef, useState } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiUserCircleFill } from 'react-icons/pi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { TiShoppingCart } from 'react-icons/ti';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { TbMailCog } from 'react-icons/tb';
import { useSelector } from 'react-redux';

const Header = () => {
  const { categories } = useSelector((state) => state.home || {});
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const user = true;
  const wishList_count = 3;

  const categoryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategory(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');
  const redirect = () => {
    navigate('/carts');
  };
  return (
    <header className='w-full bg-white'>
      <section className='header-top bg-[#caddff] md-lg:hidden'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                <span className=''>
                  <TfiEmail size={18} />
                </span>
                <span className=''>support@gmail.com</span>
              </li>
              <li className='flex relative justify-center items-center gap-2 text-sm'>
                <span className=''>
                  <FaPhoneSquareAlt size={18} />
                </span>
                <span className=''>+(380) 973 16 97</span>
              </li>
            </ul>
            <div>
              <div className='flex justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-4 text-black'>
                  <a
                    href='https://example.com'
                    className='hover:scale-105 transition-transform duration-200'
                  >
                    <ImFacebook2 />
                  </a>
                  <a
                    href='https://example.com'
                    className='hover:scale-105 transition-transform duration-200'
                  >
                    <FaSquareXTwitter size={19} />
                  </a>
                  <a
                    href='https://example.com'
                    className='hover:scale-105 transition-transform duration-200'
                  >
                    <FaLinkedin size={19} />
                  </a>
                  <a
                    href='https://example.com'
                    className='hover:scale-105 transition-transform duration-200'
                  >
                    <VscGithub size={19} />
                  </a>
                </div>
                <div className='flex   items-center justify-center group cursor-pointer text-slate-800 text-sm relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                  <div className='flex gap-1  items-center justify-center hover:scale-105 transition-transform duration-200'>
                    <img
                      src='http://localhost:3000/images/language.png'
                      alt='Language selection flag'
                    />
                    <span>
                      <TbArrowBigDownFilled />
                    </span>
                  </div>
                  <ul className=' absolute invisible transition-all top-12 rounded-lg duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 bg-black'>
                    <li>
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                        English{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                        German{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                        Spanish{' '}
                      </button>
                    </li>
                    <li>
                      {' '}
                      <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                        Chinese{' '}
                      </button>
                    </li>
                  </ul>
                </div>
                {user ? (
                  <Link
                    to='/dashboard'
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black  hover:scale-105 transition-transform duration-200'
                  >
                    <span>
                      <PiUserCircleFill size={20} />
                    </span>
                    <span>Chuckle McGiggles</span>
                  </Link>
                ) : (
                  <Link
                    to='/login'
                    className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black hover:scale-105 transition-transform duration-200'
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
      </section>
      <section className='w-full'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
            <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
              <div className='flex justify-between items-center'>
                <Link to='/'>
                  <img
                    src='http://localhost:3000/images/logo.png'
                    alt='Website logo'
                    className='hover:scale-105 transition-transform duration-200'
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
                      to='/'
                      className={`p-2 block ${
                        pathname === '/' ? 'text-[#059473]' : 'text-slate-600'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/shops'
                      className={`p-2 block ${
                        pathname === '/shops'
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
                      <button
                        type='button'
                        className=' text-xl text-green-500 hover:scale-105 
                      w-[38px] h-[38px] hover:bg-[#059473]
                      hover:text-white flex justify-center items-center bg-white
                      rounded-full transition-all duration-500
                      hover:rotate-[720deg]'
                      >
                        <FaHeart />
                      </button>
                      <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                        {wishList_count}
                      </div>
                    </div>
                    <div
                      onClick={redirect}
                      className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]  '
                    >
                      <button
                        type='button'
                        className='text-xl text-green-500 hover:scale-105 
                      w-[38px] h-[38px] hover:bg-[#059473]
                      hover:text-white flex justify-center items-center bg-white
                      rounded-full transition-all duration-500
                      hover:rotate-[720deg]'
                      >
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
      </section>
      <div className='hidden md-lg:block'>
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? 'invisible' : 'visible'
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <section
          className={`w-[300px] z-[1001] transition-all duration-200 fixed ${
            showSidebar ? '-left-[300px]' : 'left-0 top-0'
          } overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className='flex justify-start flex-col gap-6'>
            <Link to='/'>
              <img
                src='http://localhost:3000/images/logo.png'
                alt='Website logo'
                className='hover:scale-105 transition-transform duration-200'
              />
            </Link>
            <div className='flex justify-start items-center gap-10'>
              <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute  '>
                <img
                  src='http://localhost:3000/images/language.png'
                  alt='Language selection flag'
                />
                <span>
                  <TbArrowBigDownFilled />
                </span>
                <ul className=' absolute invisible transition-all top-12 rounded-lg duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 bg-black'>
                  <li>
                    <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                      English{' '}
                    </button>
                  </li>
                  <li>
                    {' '}
                    <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                      German{' '}
                    </button>
                  </li>
                  <li>
                    {' '}
                    <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
                      Spanish{' '}
                    </button>
                  </li>
                  <li>
                    {' '}
                    <button className='focus:bg-indigo-600 focus:outline-none hover:bg-indigo-500 px-1 py-1 rounded w-full text-center'>
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
            <ul className='flex flex-col justify-start items-center gap-4 text-sm font-bold uppercase '>
              <li>
                <Link
                  to='/'
                  className={`py-2 block ${
                    pathname === '/' ? 'text-[#059473]' : 'text-slate-600'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/shops'
                  className={`py-2 block ${
                    pathname === '/shops' ? 'text-[#059473]' : 'text-slate-600'
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to='/carts'
                  className={`py-2 block ${
                    pathname === '/blog' ? 'text-[#059473]' : 'text-slate-600'
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === '/about' ? 'text-[#059473]' : 'text-slate-600'
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === '/contact'
                      ? 'text-[#059473]'
                      : 'text-slate-600'
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
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

            <ul className='flex flex-col justify-start items-center gap-3 text-[#1c1c1c]'>
              <li className='flex justify-center items-center gap-2 text-sm'>
                <span>
                  <TbMailCog size={28} />
                </span>
                <span className='text-sm font-medium text-slate-700'>
                  support@gmail.com
                </span>
              </li>
            </ul>
            <div className='w-full flex justify-center ml-[-8px] gap-4 items-center'>
              <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                <span className=''>
                  <BiSolidPhoneCall size={28} />
                </span>
              </div>
              <div className='flex justify-end flex-col gap-1'>
                <p className='text-sm font-medium text-slate-700'>
                  +(380) 973 16 97
                </p>
                <p className='text-sm font-bold'>Support 24/7</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className='w-[85%] lg:w-[90%] mx-auto'>
        <div className='flex w-full flex-wrap md-lg:gap-8 items-center'>
          <div className='w-3/12 md-lg:w-full'>
            <div className='bg-white relative '>
              <div
                ref={categoryRef}
                onClick={() => setShowCategory(!showCategory)}
                className={`${
                  !showCategory
                    ? 'rounded-b-none rounded-bl-none'
                    : 'rounded-b-lg rounded-bl-lg'
                } h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer rounded-lg hover:bg-[#047b59] transition-all duration-300 ease-in-out`}
              >
                <div className='flex justify-center items-center gap-3 '>
                  <span className=''>
                    <FaListUl />
                  </span>
                  <span className=''>All Category</span>
                </div>
                <span className='pt-1'>
                  <TbArrowBigDownFilled color='white' />
                </span>
              </div>
              <div
                className={`${
                  showCategory ? 'h-0' : 'h-[400px]'
                } overflow-x-hidden transition-all md-lg:relative duration-500 absolute z-[101] rounded-b-lg rounded-bl-lg  bg-[#059473]  w-full border-x`}
              >
                <ul className='py-1 text-white font-medium'>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => {
                      return (
                        <li
                          key={category._id}
                          className='flex justify-center items-center gap-2 px-[24px] py-[6px]'
                        >
                          <img
                            src={category.image}
                            alt={category.name}
                            className='w-[25px] h-[25px] rounded-full overflow-hidden object-contain'
                          />
                          <Link className='text-sm block focus:bg-[#caddff] focus:outline-none focus:text-[#059473]  hover:text-[#059473]    hover:bg-[#caddff] px-2 py-1 rounded w-full text-center '>
                            {category.name}
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <li>No categories available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
            <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
              <div className='w-8/12 md-lg:w-full'>
                <div className=' rounded-lg flex border h-[50px] items-center relative gap-6 px-2'>
                  <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden '>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      name='category'
                      id='category'
                      className='pl-2 w-[150px] text-[#059473]  font-semibold bg-transparent px-2 h-full outline-0 border-none cursor-pointer transition duration-300'
                    >
                      <option value=''>Select Category</option>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option>No categories available</option>
                      )}
                    </select>
                  </div>
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    type='text'
                    name='search'
                    id='search'
                    placeholder='Search for products...'
                    className='w-full md:w-[300px] lg:w-[400px] p-2 border-transparent rounded-md focus:ring-[#059473] focus:outline-none transition duration-300'
                  />
                  <button
                    type='button'
                    className='bg-[#059473] hover:bg-[#047b59] right-0 absolute px-6 md:px-8 h-full font-semibold uppercase rounded-lg text-white transition-all duration-300 ease-in-out'
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
                <ul className='flex flex-col justify-start items-center gap-3 text-[#1c1c1c]'>
                  <li className='flex justify-center items-center gap-2 text-xs'>
                    <span className='w-[24px] h-[24px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                      <TbMailCog size={20} />
                    </span>
                    <span className='text-xs font-medium text-slate-700'>
                      support@gmail.com
                    </span>
                  </li>
                </ul>
                <div className='w-full flex justify-center ml-[-8px] gap-4 items-center'>
                  <div className='w-[24px] h-[24px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                    <span className=''>
                      <BiSolidPhoneCall size={20} />
                    </span>
                  </div>
                  <div className='flex justify-end flex-col '>
                    <p className='text-xs font-medium text-slate-700'>
                      +(380) 973 16 97
                    </p>
                    <p className='text-xs font-semibold'>Support 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
