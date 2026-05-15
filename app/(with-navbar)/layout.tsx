import Navbar from '@/components/common/Navbar';

export default function withNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-dvh">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
