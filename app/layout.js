import { Inter, Cinzel, Raleway } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', weight: ['400', '700', '900'] });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'Premium Eid Card Maker',
  description: 'Premium Eid Card Maker - Create beautiful Eid Mubarak & Salami cards. Made by AN Studios.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.variable} ${cinzel.variable} ${raleway.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Anek+Bangla:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}
