import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import React, { useEffect, useRef, useState } from 'react';
import cartImg from '../public/cart.svg';
import duksImage from '../public/defaultImgs/2.png';
import majcaImage from '../public/defaultImgs/1.png';
import ScrollBar from '@/Components/ScrollBar';

const productsObj = [
  {
    id: 1,
    name: 'Duks',
    productImg: duksImage,
    model: 'Sa kapuljacom',
    boja: 'siva',
    veicina: 'M',
    materijal: 'Pamuk',
    rod: 'muska',
    cena: 2300,
    cenaStampe: 160,
    minimalnaK: 1,
  },
  {
    id: 2,
    name: 'Majca',
    productImg: majcaImage,
    model: 'Obicna',
    boja: 'crna',
    veicina: 'M',
    materijal: 'Pamuk',
    rod: 'muska',
    cena: 1500,
    cenaStampe: 160,
    minimalnaK: 1,
  },
];

const cart = () => {
  const [products, setProducts] = useState(productsObj);
  const [reachBottom, setBottom] = useState(false);
  const ref = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 1279) {
        if (ref.current) {
          if (window.scrollY + window.innerHeight >= ref.current.offsetTop) {
            setBottom(true);
          } else {
            setBottom(false);
          }
        }
      }
    });
  }, [reachBottom]);

  return (
    <div>
      <div
        className={`bg-[#ffffff36] left-0 w-full gap-5 hidden xl:flex justify-around py-6 fixed transition-all duration-1000 ease-in ${
          reachBottom ? 'bottom-[-100%]' : 'bottom-0'
        }`}
      >
        <div className='bg-black text-white py-3 px-14 montserrat sm:px-10 sm:text-[14px]'>
          Naruci
        </div>
        <div className='bg-black text-white py-3 px-14 montserrat sm:px-10 sm:text-[14px]'>
          Isplati
        </div>
      </div>
      <ScrollBar />
      <Header />
      <div className='pt-[150px] sm:pt-[100px]'>
        <div className='flex items-center justify-center gap-2 mb-[100px] sm:mb-[70px]'>
          <img className='w-[70px] sm:w-[40px]' src={cartImg.src} />
          <p className='montserrat font-[900] sm:text-[20px] text-[23px]'>
            Moja Korpa
          </p>
        </div>
        <div className='flex justify-between px-10 mb-[100px] gap-10 xl:flex-col sm:px-2'>
          <div className='flex-[1.5]'>
            {products.length > 0
              ? products.map((e) => {
                  return (
                    <div className='flex border-t border-[#cdcdcd] py-10 justify-between lg:flex-col'>
                      <div className='flex gap-5'>
                        <div className='bg-[#F9F9F9] flex items-center p-2'>
                          <img
                            className='w-[180px] xs:w-[130px]'
                            src={e.productImg.src}
                          />
                        </div>
                        <div>
                          <h1 className='montserrat font-[600] text-[20px]'>
                            {e.name}
                          </h1>
                          <div className='my-5'>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Model: <span>{e.model}</span>
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Boja: <span>{e.boja}</span>
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Velicina: <span>{e.veicina}</span>
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Materijal: <span>{e.materijal}</span>
                            </p>
                            <p className='text-[#777777] montserrat text-[14px] my-1'>
                              Rod: <span>{e.rod}</span>
                            </p>
                          </div>
                          <div className='flex gap-4'>
                            <div className='text-[#AAAAAA] montserrat text-[12px] cursor-pointer'>
                              Doradi
                            </div>
                            <div
                              onClick={() => {
                                setProducts(
                                  products.filter((el) => {
                                    return el.id !== e.id;
                                  })
                                );
                              }}
                              className='text-[#AAAAAA] montserrat text-[12px] cursor-pointer'
                            >
                              Ukloni
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-1 justify-between ml-32 lg:ml-0 lg:mt-10'>
                        <div>
                          <div className='mb-5'>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Jedan proizvod
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.cena} din
                            </p>
                          </div>
                          <div>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Cena stampe
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.cenaStampe} din
                            </p>
                          </div>
                        </div>
                        <div>
                          <form
                            onSubmit={(e) => e.preventDefault()}
                            className='mb-5'
                          >
                            <label className='montserrat text-[14px] block mb-1  xs:text-[12px]'>
                              Kolicina
                            </label>
                            <input
                              className='border border-black placeholder:text-[13px] p-1 rounded-md sm:w-[150px]'
                              type='number'
                              min={e.minimalnaK}
                              placeholder='Izaberi kolicinu'
                            />
                          </form>
                          <div>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              Minimalna kolicina
                            </p>
                            <p className='montserrat text-[14px]  xs:text-[12px]'>
                              {e.minimalnaK}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className='montserrat text-[14px] xs:text-[12px]'>
                            Ukupno
                          </p>
                          {/* <p>{cena * kolicina}</p> */}
                          <p className='montserrat text-[14px] xs:text-[12px]'>
                            {e.cena * e.minimalnaK}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : 'Nema proizvoda u korpi'}
            <div className='flex justify-between pl-[200px] border-t border-[#cdcdcd] pt-5 xl:hidden'>
              <div className='montserrat font-[600]'>
                {products.length} Proizvoda
              </div>
              <div className='montserrat font-[600]'>3,800</div>
            </div>
          </div>
          <div
            ref={ref}
            className='flex-[0.5] xl:w-1/2 sm:w-full xl:mx-auto xl:my-0'
          >
            {products.length > 0 ? (
              <div>
                <div className='flex justify-between mb-10'>
                  <div className='montserrat font-[600]'>Ukupna cena</div>
                  <div className='montserrat font-[600]'>3,800</div>
                </div>
                <div>
                  <div className='mb-5'>
                    <p className='montserrat text-[13px]'>Plati karticom</p>
                    <div className='cursor-pointer bg-black text-white montserrat text-center py-3'>
                      Isplati
                    </div>
                  </div>
                  <div>
                    <p className='montserrat text-[13px]'>Plati pouzecem</p>
                    <div className='bg-black cursor-pointer text-white montserrat text-center py-3'>
                      Naruci
                    </div>
                  </div>
                </div>
                <p className='text-[#AAAAAA] text-[12px] mt-4'>
                  *Rok isporuke od 3 do 5 dana
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default cart;
