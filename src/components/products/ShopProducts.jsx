import React from 'react';

const ShopProducts = ({ styles }) => {
  const containerClass =
    styles === 'grid'
      ? 'flex-col justify-start items-start'
      : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start';
  const imageWrapperClass =
    styles === 'grid'
      ? 'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden'
      : 'md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden';

  return (
    <div
      className={`w-full grid ${
        styles === 'grid'
          ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2'
          : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2 gap-3'
      }`}
    >
      {[1, 2, 3, 4, 5, 6].map((product, index) => (
        <div
          key={index}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${containerClass} w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div className={imageWrapperClass}>
            <img
              src={`http://localhost:3000/images/products/${index + 1}.webp`}
              alt={`Product ${index + 1}`}
              loading='lazy'
              className='w-full h-auto object-contain'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ShopProducts);
