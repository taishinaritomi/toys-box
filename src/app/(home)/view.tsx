import Link from 'next/link';
import { classes } from './view.style';

const url =
  'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/';

const images = {
  bucket: `${url}Bucket/3D/bucket_3d.png`,
};

const LINKS = [
  {
    href: '/todo',
    title: 'Todo App',
    icon: images.bucket,
  },
];

export const HomeView = () => {
  return (
    <div className='mx-auto flex h-screen max-w-xl flex-col items-center justify-center p-2'>
      <div className='grid w-full gap-8 rounded-xl border border-slate-200 bg-white p-16  s:p-10'>
        {LINKS.map(({ href, title, icon }) => (
          <Link
            key={href}
            className='rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition-colors hover:bg-slate-200'
            href={href}
          >
            <div className='flex w-full items-center justify-between p-3'>
              <div className='ml-4 s:ml-2'>
                <h1 className='text-lg font-bold'>{title}</h1>
              </div>
              <img src={icon} alt='' className='h-20 w-20' />
            </div>
          </Link>
        ))}
        <div className={classes.container}>
          <a
            className={classes.base}
            href='https://github.com/taishinaritomi/toys-box'
          >
            Repository
          </a>
        </div>
      </div>
    </div>
  );
};
