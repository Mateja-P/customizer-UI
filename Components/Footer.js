import Link from 'next/link';

const Footer = () => {
  return (
    <div className='bg-dark text-white py-7'>
      <div className='flex w-[70%] items-center mx-auto my-0 justify-between lg:w-[90%] md:w-[97%] sm:flex-col sm:items-start'>
        <div className='montserrat sm:my-3'>Logo</div>
        <div className='sm:my-3'>+381 111 832 234</div>
        <div className='sm:my-3'>noviemail@gmail.com</div>
        <div>
          <Link className='block my-3' href='/misljenje'>
            Unesite svoje misljenje
          </Link>
          <Link className='block' href='/problem'>
            Prijavite problem
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
