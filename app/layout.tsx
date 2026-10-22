import type { Metadata, Viewport } from 'next';
import { Sarabun, Outfit, JetBrains_Mono } from 'next/font/google';
import '@/app/globals.css';
import { LangProvider } from '@/context/LangProvider';
import { LightboxProvider } from '@/context/LightboxProvider';
import DotWaveBackground from '@/components/canvas/DotWaveBackground';
import { brand, siteMetadata } from '@/data/content';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const sarabun = Sarabun({
  subsets: ['latin', 'latin-ext', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.canonicalUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: '/',
    siteName: brand.name,
    type: 'website',
    locale: 'th_TH',
    images: [
      { url: '/profile/profile1.jpg', width: 1200, height: 630, alt: brand.name },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ['/profile/profile1.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fafafa' }],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chisanupong Kongchang',
  alternateName: 'ชิษณุพงศ์ คงช้าง',
  email: `mailto:${brand.email}`,
  telephone: brand.phone,
  url: siteMetadata.canonicalUrl,
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Pibulsongkram Rajabhat University',
  },
  jobTitle: 'Software Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phitsanulok',
    addressCountry: 'TH',
  },
  sameAs: [brand.githubUrl, brand.instagramUrl],
};

/** Paints the correct lang before first paint — avoids FOUC. */
const themeBootScript = `(function(){try{var l=localStorage.getItem('portfolio-lang');if(l){l=JSON.parse(l)}document.documentElement.lang=(l==='en')?'en':'th';}catch(e){document.documentElement.lang='th';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${sarabun.variable} ${jetbrains.variable} font-body`}
      >
        <LangProvider>
          <LightboxProvider>
            {/* Signature pastel dot wave, fixed behind all content */}
            <DotWaveBackground />
            {children}
          </LightboxProvider>
        </LangProvider>
      </body>
    </html>
  );
}
