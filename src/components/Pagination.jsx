import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);
  let startPage = pageNumber;

  let difference = totalPage - pageNumber;
  if (difference <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }
  const createBton = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? 'bg-green-500 shadow-lg shadow-[#0fa381]/50 text-white'
              : 'bg-[#059473] hover:bg-[#0fa381]shadow-lg hover:shadow-[#0fa381]/50  hover:text-white text-[#d0d2d6]'
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };
  return (
    <ul className='flex gap-2'>
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#059473] text-[#d0d2d6] cursor-pointer hover:bg-[#0fa381] shadow-lg hover:shadow-[#0fa381]/50 hover:text-white'
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBton()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#059473] text-[#d0d2d6] cursor-pointer hover:bg-[#0fa381] shadow-lg hover:shadow-[#0fa381]/50 hover:text-white'
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
