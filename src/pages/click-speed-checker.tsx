import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ClickSpeedChecker } from '@/views/ClickSpeedChecker/ClickSpeedChecker';

const clickSpeedChecker = () => {
  return (
    <RecoilRoot>
      <Head>
        <title>ClickSpeedChecker / ToysBox</title>
      </Head>
      <ClickSpeedChecker />
    </RecoilRoot>
  );
};
export default clickSpeedChecker;
