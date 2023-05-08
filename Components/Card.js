import React, { useEffect, useState } from 'react';
import starImage from '../public/star.svg';
import { useRouter } from 'next/router';
import axios from 'axios';

const Card = ({ data, reRender }) => {
  const e = data;

  const router = useRouter();

  return (
    <div>
      <div className='bg-primary pb-5'>
        <div className='flex justify-end mb-14 sm:mb-7'>
          <div
            className={`py-2 px-6 border  bg-white montserrat font-[600] text-[13px] md:px-3 md:text-[10px] ${
              e.mostPopular
                ? 'border-red-500 text-red-500'
                : 'border-white h-[40px] w-[130px]'
            }`}
          >
            {e.mostPopular && 'Most popular'}
          </div>
        </div>
        <div className='relative h-[200px] w-[350px] mb-16 lg:h-[150px] lg:w-[300px] md:w-[250px] md:flex md:justify-center sm:h-[180px] sm:w-auto xs:w-[80%] xs:h-auto sm:mb-10'>
          <img
            className='h-full !max-w-none absolute top-0 left-[-50px] md:left-[0px] md:static xs:w-[95%] sm:w-auto'
            src={`defaultImgs/${e.id + '.png'}`}
          />
        </div>
        <div className='px-3'>
          <h1 className='montserrat font-[600] text-[21px] sm:text-[18px] mb-5 sm:mb-2'>
            {e.defaultName}
          </h1>
          <div className='flex sm:flex-col sm:gap-2'>
            <h4 className='text-[15px] mr-3 sm:text-[13px] xs:text-[12px]'>
              AVG. Rating
            </h4>
            <div className='flex'>
              <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
              <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
              <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
              <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
              <img className='w-[20px] xs:w-[15px]' src={starImage.src} />
            </div>
          </div>
          <div
            className='cursor-pointer w-full mt-10 sm:mt-4 montserrat py-3 sm:text-[13px] xs:text-[11px] bg-white border border-black text-center'
            onClick={() => {
              router.push(`/p/${e.id}`);
            }}
          >
            Pogledaj
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
