import './globals.css';
import Navbar from '@/components/common/Navbar';
import SessionToast from '@/components/common/SessionToast';

export default function withNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex w-full min-h-dvh">
          <Navbar />
          <main className="flex-1">{children}</main>
          <SessionToast />
        </div>
      </body>
    </html>
  );
}
