import { Link } from 'react-router-dom';
import bannerbg from '../../src/assets/hero-asset.png'
import { FaLongArrowAltRight } from 'react-icons/fa';

const Banner = () => {
 
  
  return (
    <div className='max-w-3xl mx-auto text-center relative'>
      <h1 className='text-2xl md:text-5xl font-bold '>Boost Productivity with Smart Task Management</h1>
  
      <Link to={'/addtask'}>
        <button className='inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none my-4 md:my-5 md:text-xl'>Try It Now <FaLongArrowAltRight className='md:text-2xl text-xl mt-1' /> </button>
      </Link>
      <img src={bannerbg} alt="" />
    </div>
  );
};

export default Banner;