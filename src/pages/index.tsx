import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '@/views/Home/Home';

const home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ToysBox</title>
      </Head>
      <Home />
    </>
  );
};

export default home;
