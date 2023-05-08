import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const misljenje = () => {
  const [inputs, setInputs] = useState({
    input: '',
    text: '',
  });

  const inputsCheck = () => {
    if (inputs.input !== '' && inputs.text !== '') {
      toast.success('Uspesno ste uneli vase misljenje', {
        theme: 'dark',
      });
    } else {
      toast.warning('Oba texta moraju biti popunjena', {
        theme: 'dark',
      });
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <ToastContainer />
      <h1 className='font-bold text-[25px] mb-10'>Unesite svoje misljenje</h1>
      <form
        className='flex flex-col w-[300px]'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className='border border-black pl-1 py-2'
          type='text'
          placeholder='Vase ime'
          onChange={(e) => {
            const { value } = e.target;
            setInputs({ ...inputs, input: value });
          }}
          value={inputs.input}
        />
        <textarea
          className='border border-black my-5 pl-1 py-2'
          placeholder='Text'
          rows={10}
          onChange={(e) => {
            const { value } = e.target;
            setInputs({ ...inputs, text: value });
          }}
          value={inputs.text}
        ></textarea>
        <div className='flex justify-center'>
          <button
            onClick={() => inputsCheck()}
            type='submit'
            className='bg-black text-white px-10 py-2'
          >
            Unesi
          </button>
        </div>
      </form>
    </div>
  );
};

export default misljenje;
