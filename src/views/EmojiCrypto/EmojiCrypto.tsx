import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { CgArrowsExchange } from 'react-icons/cg';
import TextareaAutoSize from 'react-textarea-autosize';
import { encrypt } from '@/libs/crypto';

export const EmojiCrypto: FC = () => {
  const [value, setValue] = useState('');
  const { pathname } = useRouter();
  const isEncrypt = useMemo(() => pathname === '/', [pathname]);

  return (
    <div>
      <div className='mx-auto max-w-4xl'>
        <div
          className={`relative flex items-start gap-6 ${
            !value ? 'items-stretch' : 'items-start'
          }`}
        >
          <Link href={isEncrypt ? '/decrypt' : '/'}>
            <a className='absolute left-1/2 mt-2 -translate-x-1/2 rounded-md border border-slate-200 bg-white p-2 shadow-lg'>
              <CgArrowsExchange
                className={`h-6 w-6 ${
                  isEncrypt === true
                    ? '-scale-x-100'
                    : isEncrypt === false
                    ? 'scale-x-100'
                    : ''
                }`}
              />
            </a>
          </Link>
          <TextareaAutoSize
            placeholder={
              isEncrypt
                ? '暗号化したい文章を入力'
                : '解読したい絵文字暗号を入力'
            }
            autoFocus
            onChange={(e) =>
              setValue(e.target.value ? encrypt(e.target.value, '') : '')
            }
            className='w-full resize-none rounded-md border border-slate-200 bg-slate-100 p-4 focus:shadow-lg'
          />
          <p className='w-full rounded-md border border-slate-200 bg-slate-100 p-4'>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
