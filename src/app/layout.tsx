import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';

type Props = {
  children?: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='min-h-screen break-words bg-white font-medium tracking-wider text-black'>
        {children}
      </body>
    </html>
  );
};

export default Layout;
