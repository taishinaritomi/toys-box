import Link from 'next/link';

const url =
  'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/';

export const images = {
  bucket: `${url}Bucket/3D/bucket_3d.png`,
};

const LINKS = [
  {
    href: '/todo',
    title: 'Todo',
    icon: images.bucket,
  },
];

export const HomeView = () => {
  return (
    <div className='mx-auto flex h-screen max-w-sm flex-col items-center justify-center gap-2'>
      <div className='grid w-full gap-8'>
        {LINKS.map(({ href, title, icon }) => (
          <Link
            key={href}
            className='rounded-3xl border border-slate-200 bg-slate-100 shadow-xl transition-colors hover:bg-slate-200'
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
      </div>
      <a
        className='mt-8 underline hover:drop-shadow'
        href='https://github.com/taishinaritomi/toys-box'
      >
        Repository
      </a>
    </div>
  );
};
