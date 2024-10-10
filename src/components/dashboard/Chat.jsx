import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineMessage } from 'react-icons/ai';
import { GrEmoji } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

import io from 'socket.io-client';
// import toast from 'react-hot-toast';

import { add_friend, send_message } from '../../store/reducers/chatReducer';

const socket = io('http://localhost:5000');

const Chat = () => {
  const dispatch = useDispatch();
  const { vendorId } = useParams();
  const { userInfo } = useSelector((state) => state.auth || {});
  const { friendMessages, currentFriend, my_friends, successMessage } =
    useSelector((state) => state.chat || {});

  const [text, setText] = useState('');

  useEffect(() => {
    socket.emit('add_user', userInfo.id, userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.id) {
      dispatch(
        add_friend({
          vendorId: vendorId || '',
          userId: userInfo.id || '',
        })
      );
    }
  }, [dispatch, userInfo?.id, vendorId]);

  const textHandler = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id || '',
          text,
          vendorId,
          name: userInfo.name,
        })
      );
      setText('');
    }
  };

  return (
    <div className='bg-white p-3 rounded-md hover:shadow-lg transition-all transform duration-300'>
      <div className='w-full flex'>
        <div className='w-[230px]'>
          <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
            {my_friends && my_friends.length > 0 ? (
              my_friends.map((f, i) => (
                <Link
                  key={i}
                  to={`/dashboard/chat/${f.fdId}`}
                  className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}
                >
                  <div className='w-[35px] h-[35px] relative'>
                    <div className='w-[35px] h-[35px] rounded-full  overflow-hidden border-slate-500 border-2'>
                      {/* User Image */}
                      <img
                        src={f.image || 'http://localhost:3000/images/user.png'}
                        alt={
                          f.name
                            ? `${f.name}'s profile picture`
                            : 'Profile picture'
                        }
                        className='object-cover w-full h-full '
                      />
                    </div>
                    {/* Online status dot */}
                    <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-white border-2'></div>
                  </div>
                  <span>{f.name || 'Unknown User'}</span>
                </Link>
              ))
            ) : (
              <div>No friends available</div>
            )}
          </div>
        </div>
        <div className='w-[calc(100%-230px)]'>
          {currentFriend ? (
            <div className='w-full h-full'>
              <div className='flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                <div className='w-[35px] h-[35px] relative'>
                  {/* Online status dot */}
                  <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 border-white border-2'></div>
                  <div className='w-[35px] h-[35px] rounded-full overflow-hidden border-slate-500 border-2'>
                    {/* User Image */}
                    <img
                      src={
                        currentFriend.image ||
                        'http://localhost:3000/images/user.png'
                      }
                      alt={
                        currentFriend.name
                          ? `${currentFriend.name}'s profile picture`
                          : 'Profile picture'
                      }
                      className='object-cover w-full h-full '
                    />
                  </div>
                </div>
                <span>{currentFriend.name}</span>
              </div>
              <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
                <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                  {friendMessages.map((m, i) => {
                    if (currentFriend?.fdId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          className='w-full flex gap-2 justify-start items-center text-[14px]'
                        >
                          <img
                            className='w-[35px] h-[35px] '
                            src='http://localhost:3000/images/user.png'
                            alt=''
                          />
                          <div className='p-2 bg-purple-500 text-white rounded-md'>
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className='w-full flex gap-2 justify-start items-center text-[14px]'
                        >
                          <img
                            className='w-[35px] h-[35px] '
                            src='http://localhost:3000/images/user.png'
                            alt=''
                          />
                          <div className='p-2 bg-purple-500 text-white rounded-md'>
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}

                  <div className='w-full flex gap-2 justify-end items-center text-[14px]'>
                    <img
                      className='w-[35px] h-[35px] '
                      src='http://localhost:3000/images/user.png'
                      alt=''
                    />
                    <div className='p-2 bg-cyan-500 text-white rounded-md'>
                      <span>ewwwwwwwww</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex p-2 justify-between items-center w-full'>
                <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
                  <label className='cursor-pointer' htmlFor=''>
                    <FaPlus />
                  </label>
                  <input className='hidden' type='file' />
                </div>
                <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                  <input
                    type='text'
                    placeholder='input message'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='w-full rounded-full h-full outline-none p-3'
                  />
                  <div className='text-2xl right-2 top-2 absolute cursor-pointer'>
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                  <button
                    onClick={textHandler}
                    className='text-2xl cursor-pointer'
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600'>
              <span>Select Vendor</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
