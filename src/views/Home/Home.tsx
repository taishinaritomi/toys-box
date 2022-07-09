import Link from 'next/link';
import { Button } from '~/components/atoms/Button';

const Home = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <Link href={'/todo'}>
        <a className='rounded-md bg-purple-600 py-2 px-6 font-bold text-white shadow-lg shadow-slate-700/30 transition-colors hover:bg-purple-700'>
          Todo App
        </a>
      </Link>
      <p className='text-sm text-slate-400'>Coming Soon...</p>
      <a
        className='mt-8 underline hover:drop-shadow'
        href='https://github.com/taishinaritomi/toys-box'
      >
        Repository
      </a>
      <Button>gfearg</Button>
    </div>
  );
};
export default Home;
