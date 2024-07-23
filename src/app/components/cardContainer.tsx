'use client';
import { NextPage } from 'next';
import { useState } from 'react';
import { ImageType } from '../_types/types';

interface Props {}

const CardContainer: NextPage<Props> = ({}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerateImages = async (prompt: string) => {
    const response = await fetch('/api/generate-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (response.ok) {
      setImages(data.images);
    } else {
      console.error(data.error);
    }
  };

  return (
    <div className='flex flex-row shadow-xl w-3/4 h-1/2 rounded-xl gap-3'>
      <div className='bg-white w-1/2 h-auto flex gap-2 flex-col p-6 rounded-l-xl'>
        <strong className='text-sm font-semibold text-gray-600'>
          Let's start with your content
        </strong>
        <p className='text-xs font-semibold text-gray-600'>Add text</p>
        <div className='flex gap-2 flex-row'>
          <input
            type='text'
            className='bg-gray-100 w-[60%] h-4 py-4 pl-2 rounded-md'
            value={prompt}
            placeholder='kitten'
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className='bg-blue-500 text-white rounded-md text-sm px-3 py-1'
            onClick={() => {
              handleGenerateImages(prompt);
            }}
          >
            Send
          </button>
        </div>
        <h3 className='text-xs font-semibold text-gray-600 mt-4'>
          Add your image
        </h3>
        <div className='flex gap-2 flex-row'>
          <div className='text-center'>
            <p className='bg-gray-200 p-2 rounded-md text-xs'>
              From this device
            </p>
          </div>
          <div className='text-center'>
            <p className='bg-gray-200 p-2 rounded-md text-xs'>
              From your phone
            </p>
          </div>
          <div className='text-center'>
            <p className='bg-gray-200 p-2 rounded-md text-xs'>My media</p>
          </div>
        </div>
        <p className='text-xs font-semibold text-gray-600 mt-4'>
          Generate an image using a description
        </p>
        <div className='flex gap-2 flex-row'>
          <input
            placeholder='enter description'
            type='text'
            className='bg-gray-100 w-[60%] h-4 py-4 pl-2 rounded-md'
          />
        </div>
        <p className='text-gray-400 text-xs mt-2'>
          Skip and start from a blank canvas or recent changes
        </p>
      </div>
      <div className='bg-gray-100 w-1/2 h-auto rounded-r-xl p-3'>
        {images.length > 0 && (
          <div className='grid grid-cols-2 gap-4 p-4 max-h-full overflow-scroll'>
            {images.map((image, index) => (
              <div key={index} className='shadow-md rounded'>
                <img
                  src={image.src.original}
                  alt='generated'
                  className='w-full h-full rounded-md object-cover'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
