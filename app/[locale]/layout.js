import Providers from '@/components/Providers';
import '../globals.css';
import { Inter, Tajawal } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Footer2 from '@/components/footer2';
// import { openGraphImage } from '@/app/favicon.ico';

const inter = Inter({ subsets: ['latin'] });
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});

export const metadata = {
  title: {
    default: 'Jordan Starts Here',
    template: '%s | Jordan Starts Here',
  },
  openGraph: {
    images: [
      {
        url: '/titleimage.png',
        width: 630,
        height: 630,
        alt: 'My Image',
      },
    ],
  },
};
export function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' },
    { locale: 'ru' },
  ];
}
export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale} dir={`${locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={`${tajawal.className} ${inter}`}>
          <Providers>{children}</Providers>
          <Footer2 />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
