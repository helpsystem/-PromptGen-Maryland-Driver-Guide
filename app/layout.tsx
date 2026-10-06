import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: "Sam's Driving School - Maryland MVA Content & AI Prompt Studio",
  description: 'Bilingual (English & Persian) social media content architect and photo/video prompt studio for Maryland MVA driving education, Tri-State laws, and road test success.',
  openGraph: {
    title: "Sam's Driving School - Maryland MVA Content & AI Prompt Studio",
    description: 'Bilingual (English & Persian) social media content architect and photo/video prompt studio for Maryland MVA driving education, Tri-State laws, and road test success.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sam's Driving School - Maryland MVA Content & AI Prompt Studio",
    description: 'Bilingual (English & Persian) social media content architect and photo/video prompt studio for Maryland MVA driving education, Tri-State laws, and road test success.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
