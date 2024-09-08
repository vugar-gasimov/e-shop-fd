import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Header />
      <main className='bg-slate-200 mt-4'>
        <section className='w-full justify-center items-center p-10'>
          <div className='grid md:grid-cols-1 grid-cols-2  md:w-[100%] md-lg:w-[80%] w-[60%] mx-auto bg-white rounded-md'>
            <div className='px-8 py-8'>
              <h2 className='text-center w-full text-xl text-slate-600 font-bold'>
                Login Page
              </h2>

              <div className=''>
                <form onSubmit={login} className='text-slate-600'>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='email' className='font-semibold'>
                      Email
                    </label>
                    <input
                      onChange={inputHandler}
                      value={state.email}
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Your email...'
                      required
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                    />
                  </div>
                  <div className='flex flex-col gap-1 mb-4'>
                    <label htmlFor='password' className='font-semibold'>
                      Password
                    </label>
                    <input
                      onChange={inputHandler}
                      value={state.password}
                      type='password'
                      id='password'
                      name='password'
                      placeholder='Your password...'
                      required
                      className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full px-4 py-2 bg-[#059473] text-white font-bold text-md rounded-lg hover:bg-[#047b59] transition-all hover:shadow-md hover:shadow-[#5daf9c] duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#047b59] focus:ring-opacity-50 '
                  >
                    Login
                  </button>
                </form>
                <div className='flex justify-center items-center py-2'>
                  <div className='h-[1px] bg-slate-300 w-[90%]'></div>
                  <span className='px-3 text-slate-600'>Or</span>
                  <div className='h-[1px] bg-slate-300 w-[90%]'></div>
                </div>
                <button
                  aria-label='Login with Facebook'
                  className='px-8 w-full py-2 bg-blue-500 shadow-md hover:shadow-md hover:bg-blue-600 hover:shadow-blue-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-700  focus:ring-opacity-50'
                >
                  <span className=''>
                    <FaFacebook />
                  </span>
                  <span className=''>Login with Facebook</span>
                </button>
                <button
                  aria-label='Login with Gmail'
                  className='px-8 w-full py-2 bg-[#BB001B] shadow-md hover:shadow-md hover:bg-[#8c0318] hover:shadow-[#BB001B]/50 text-white rounded-md flex justify-center items-center gap-2 mb-3 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#971b2d] focus:ring-opacity-50'
                >
                  <span className=''>
                    <FaGoogle />
                  </span>
                  <span className=''>Login with Gmail</span>
                </button>
              </div>
              <div className='text-center text-slate-600 pt-1'>
                <p className=''>
                  Don't have an account{' '}
                  <Link
                    to='/register'
                    className='text-green-600 hover:underline'
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
            <div className='relative w-full h-full py-4 md:px-4 pr-4'>
              <div className='relative w-full h-full'>
                <img
                  src='http://localhost:3000/images/login.jpg'
                  alt='Decorative img for login page'
                  className='rounded-md object-cover h-full w-full'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-[#B2F5EA] via-[#FFD6E7] to-[#FFFBCC] opacity-35 rounded-md'></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;
