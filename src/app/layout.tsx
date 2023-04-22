import './globals.css';
import Head from 'next/head';

export const metadata = {
  title: {
    template: '%s | Next.js',
  },
  description: 'Generated by create next app',
  manifest: '/manifest.webmanifest'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;