import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { PasswordGenerator } from '@/views/PasswordGenerator/PasswordGenerator';

const passwordGenerator = () => {
  return (
    <RecoilRoot>
      <Head>
        <title>PasswordGenerator / ToysBox</title>
      </Head>
      <PasswordGenerator />
    </RecoilRoot>
  );
};
export default passwordGenerator;
