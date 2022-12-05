'use client';

import type { FC } from 'react';
import { useState, useRef } from 'react';
import { IoSyncOutline } from 'react-icons/io5';
import TextareaAutoSize from 'react-textarea-autosize';
import { decrypt, encrypt } from '@/libs/crypto';

export const EmojiCryptoView: FC = () => {
  const [value, setValue] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isEncrypt, setIsEncrypt] = useState(true);

  return (
    <div>
      <div className='mx-auto mt-8 max-w-3xl'>
        <div className='mb-6 flex items-start gap-4'>
          <button
            onClick={() => setIsEncrypt((v) => !v)}
            className='rounded-xl border border-slate-200 bg-slate-100 p-5'
          >
            <IoSyncOutline />
          </button>
          <TextareaAutoSize
            placeholder={
              isEncrypt
                ? '暗号化したい文章を入力'
                : '解読したい絵文字暗号を入力'
            }
            autoFocus
            ref={textRef}
            className='h-[58px] w-full resize-none rounded-xl border border-slate-200 bg-slate-100 p-4 focus:shadow-lg'
          />
        </div>
        <div className='mb-6'>
          <input
            placeholder='password'
            className='mr-4 resize-none rounded-xl border border-slate-200 bg-slate-100 p-3 focus:shadow-lg'
            type='text'
            ref={passwordRef}
          />
          <button
            className='rounded-xl border border-slate-200 bg-slate-100 px-6 py-3'
            onClick={() => {
              setValue(
                textRef.current?.value
                  ? isEncrypt
                    ? encrypt(
                        textRef.current?.value,
                        passwordRef.current?.value || '',
                      )
                    : decrypt(
                        textRef.current?.value,
                        passwordRef.current?.value || '',
                      )
                  : '',
              );
            }}
          >
            変換
          </button>
        </div>
        {value && (
          <p className='w-full rounded-xl border border-slate-200 bg-slate-100 p-4'>
            {value}
          </p>
        )}
      </div>
    </div>
  );
};
