import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { EmojiCrypto } from '@/views/EmojiCrypto/EmojiCrypto';

const emojiCrypto = () => {
  return (
    <RecoilRoot>
      <Head>
        <title>EmojiCrypto / ToysBox</title>
      </Head>
      <EmojiCrypto />
    </RecoilRoot>
  );
};
export default emojiCrypto;
