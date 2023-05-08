import dynamic from 'next/dynamic';
import { PerspectiveCamera, Center } from '@react-three/drei';
import M from '@/Components/three/M';
import Button from '@/Components/Button';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { use, useEffect, useState } from 'react';
import starImage from '../../public/star.svg';
import axios from 'axios';
import { useRouter } from 'next/router';
import KeyLight from '@/Components/three/KeyLight';
import ScrollBar from '@/Components/ScrollBar';
import { productData } from '@/Components/data';

const DynamicCanvas = dynamic(() => import('../../Components/three/CanvasD'), {
  ssr: false,
});

const proizvod = () => {
  const [selecetdGender, setGender] = useState({});
  const [getProduct, setProduct] = useState([]);
  let [time, setTime] = useState(10);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setProduct(productData);
  }, []);

  const property = getProduct[0] && JSON.parse(getProduct[0].properties);

  const model = getProduct[0] && getProduct[0].model;
  const url = `../Meshes/${id}/${model}`;

  const p = property !== undefined && property.properties.sizes;

  const el = (
    <div>
      <ScrollBar />
      <Header />
      <div className='relative'>
        <div className='pt-[200px] pb-[60px] after:absolute after:top-0 after:right-0 after:w-[87%] after:bg-primary after:h-full 2xl:after:w-full xs:pt-[150px]'>
          <div className='flex justify-center gap-80 relative z-[2] 2xl:gap-40 lg:justify-between lg:px-14 md:px-5 md:gap-20 sm:gap-10 sm:flex-col'>
            <div className='w-[400px] h-[400px] lg:flex-1 lg:w-auto lg:h-auto sm:flex sm:justify-center sm:h-[310px]'>
              <DynamicCanvas>
                <ambientLight intensity={0.3} />
                <KeyLight position={[-2, 0, 25]} />
                <Center>
                  <M
                    path={url}
                    scale={[0.7, 0.7, 0.7]}
                    rotation={[0.2, 0, 0]}
                    color={selecetdGender.color}
                  />
                </Center>
                <PerspectiveCamera makeDefault position={[0, 0, 55]} />
              </DynamicCanvas>
            </div>
            <div className='lg:flex-1'>
              <div className='mb-10'>
                <div className='mb-5'>
                  <p className='text-[14px] nunito'>Cena jednog komada</p>
                  <p className='font-[900] text-[28px] my-2 text-red-700'>
                    {getProduct[0] &&
                      getProduct[0].discountPrice !== null &&
                      getProduct[0].discountPrice + ' din'}
                  </p>
                  <p
                    className={`font-[900] text-[25px] my-2 ${
                      getProduct[0] &&
                      getProduct[0].discountPrice &&
                      '!text-[20px] line-through'
                    }`}
                  >
                    {getProduct[0] && getProduct[0].price} din
                  </p>
                </div>
                <div className='flex gap-5 justify-between lg:justify-start lg:gap-5'>
                  {property && Array.isArray(property.properties)
                    ? property.properties.map((e) => {
                        return (
                          <div>
                            <div
                              className={`text-center border border-black py-2 px-4 rounded-md flex-1 cursor-pointer ${
                                selecetdGender.name == e.gender
                                  ? 'text-white bg-black'
                                  : 'text-black bg-transparent'
                              }`}
                              onClick={() => {
                                setGender({
                                  ...selecetdGender,
                                  name: e.gender,
                                  color: undefined,
                                  size: undefined,
                                });
                              }}
                            >
                              {e.gender}
                            </div>
                          </div>
                        );
                      })
                    : 'Dimensions:' + ' ' + p}
                </div>
                <div>
                  <div className='flex gap-1 mt-5'>
                    {property &&
                      Array.isArray(property.properties) &&
                      property.properties.map((e) => {
                        return (
                          selecetdGender.name == e.gender &&
                          e.sizes.map((el) => {
                            return (
                              <div
                                onClick={() => {
                                  setGender({
                                    ...selecetdGender,
                                    size: el,
                                  });
                                }}
                                className={`border border-black p-1 px-2 rounded-md 
                                    cursor-pointer ${
                                      selecetdGender.size == el
                                        ? 'bg-black text-white'
                                        : 'bg-transparent'
                                    }`}
                              >
                                {el}
                              </div>
                            );
                          })
                        );
                      })}
                  </div>
                  <div className='flex gap-1 mt-3'>
                    {property &&
                      Array.isArray(property.properties) &&
                      property.properties.map((e, index) => {
                        return (
                          selecetdGender.name == e.gender &&
                          e.meshes.map((el) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  setGender({
                                    ...selecetdGender,
                                    color: el.color,
                                  });
                                }}
                                className={`border-2 border-black text-sm p-1 px-2 rounded-md
                                    cursor-pointer bg-${el.color}-400 ${
                                  selecetdGender.color === el.color
                                    ? 'border-black'
                                    : 'border-transparent'
                                }`}
                              >
                                {el.color}
                              </div>
                            );
                          })
                        );
                      })}
                  </div>
                </div>
              </div>
              <div>
                <p className='mb-2 text-[14px] font-[600]'>
                  Prosecan rating proizvoda:
                </p>
                <div className='flex gap-1'>
                  <img className='w-[22px]' src={starImage.src} />
                  <img className='w-[22px]' src={starImage.src} />
                  <img className='w-[22px]' src={starImage.src} />
                  <img className='w-[22px]' src={starImage.src} />
                  <img className='w-[22px]' src={starImage.src} />
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-center mt-20 gap-10 z-[2] xs:flex-col xs:pl-4'>
            <div>
              <Button text='Novi Dizajn' bck='bg-[#EAE6DB]' />
            </div>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 bg-white w-[350px] flex justify-center py-3 2xl:right-0 2xl:left-auto 2xl:w-[250px] md:bottom-[-50px] sm:bottom-[-70px]'>
          {getProduct[0] && getProduct[0].mostPopular == 'true' && (
            <h1 className='capitalize nunito italic font-[900] text-[28px] 3xl:text-[25px] 2xl:text-[21px] flex gap-2'>
              <div className='flex flex-col justify-center'>
                <span className='nunito'>most</span>
                <span className='nunito text-border block pl-7'>popular</span>
              </div>
            </h1>
          )}
        </div>
      </div>

      <div className='my-20'>
        <div className='w-[60%] mx-auto my-0 sm:w-full sm:px-5'>
          <div>
            <div className='mb-6'>
              <p className='font-[600] text-[18px]'>Informacije</p>
              <div className='h-[3px] w-[100px] bg-primary'></div>
            </div>
            <div>
              {getProduct[0] && (
                <div className='sm:text-[15px]'>
                  {getProduct[0].information}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  useEffect(() => {
    if (time === 0) {
      setTime(null);

      router.push('/p/1');
    }

    if (time === null) {
      return;
    }

    const int = setInterval(() => {
      setTime((time -= 1));
    }, 1000);

    return () => clearInterval(int);
  }, [time]);

  const noEl = (
    <div>
      For this site only product with id 1 works, redirecting to that page{' '}
      {time} s
    </div>
  );

  return <div>{id == 1 ? el : noEl}</div>;
};

export default proizvod;
