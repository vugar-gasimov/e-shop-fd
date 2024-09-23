import React, { useState } from 'react';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='bg-white p-4 rounded-md  hover:shadow-lg transition-all transform duration-300'>
      <h2 className='text-xl font-semibold text-slate-600'>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='old_password' className='text-slate-700'>
            Old Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='old_password'
            id='old_pass'
            placeholder='Your old password...'
            className='outline-none px-3 py-1 border rounded-md text-slate-600 '
          />
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='new_password' className='text-slate-700'>
            New Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='new_password'
            id='new_pass'
            placeholder='Your new password...'
            className='outline-none px-3 py-1 border rounded-md text-slate-600 '
          />
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor='confirm_password' className='text-slate-700'>
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='confirm_password'
            id='confirm_pass'
            placeholder='Confirm your new password...'
            className='outline-none px-3 py-1 border rounded-md text-slate-600 '
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button
          type='submit'
          className=' w-full py-2 bg-[#059473] hover:bg-[#047b59] hover:shadow-lg px-6 md:px-8 h-full font-semibold rounded-lg text-white transition-all duration-300 ease-in-out  disabled:opacity-50'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
