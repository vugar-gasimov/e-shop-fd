import React from 'react';
import { TfiEmail } from 'react-icons/tfi';
import { FaLinkedin, FaPhoneSquareAlt } from 'react-icons/fa';
import { ImFacebook2 } from 'react-icons/im';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { VscGithub } from 'react-icons/vsc';
import { TbArrowBigDownFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { PiUserCircleFill } from 'react-icons/pi';
import { RiLockPasswordFill } from 'react-icons/ri';

const Header = () => {
  const user = true;

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
    </div>
  );
};

export default Header;
