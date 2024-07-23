import Image from 'next/image';
import CardContainer from './components/cardContainer';

export default function Home() {
  return (
    <div className='flex justify-center items-center bg-white w-screen h-screen'>
      <CardContainer />
    </div>
  );
}
