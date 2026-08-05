import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Subway - Review & Win Free Cookie',
  description: 'Leave a Google Review and claim your free Subway cookie reward!',
  icons: {
    icon: '/subway-logo.png',
    shortcut: '/subway-logo.png',
    apple: '/subway-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F8F8F8] text-[#171717] antialiased min-h-screen selection:bg-[#007A33] selection:text-white">
        {children}
      </body>
    </html>
  );
}
