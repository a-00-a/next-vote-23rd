'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/public/logo-ceos.svg';
import NavItem from './NavItem';

import { useAuthStore } from '@/store/authStore';

const NAV_ITEMS = [
  { label: '파트장 투표', href: '/part-leader' },
  { label: '데모데이 투표', href: '/demoday' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-[#FFFFFF] border-b border-gray-100 z-40 font-pretendard">
        <div className="flex justify-between items-center w-full h-full px-5 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <Logo className="w-auto h-auto mix-blend-multiply" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href}
                  disabled={!user}
                />
              ))}
            </nav>

            <div className="flex items-center gap-4 border-l border-gray-200 pl-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-sm text-primary text-right">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-gray-500 ml-2">
                      {user.team} | {user.part}
                    </span>
                  </div>
                  <button className="px-4 py-1.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-blue-800 transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>

          <button
            className="md:hidden p-2 text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300 ease-out md:hidden flex flex-col font-pretendard shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-5">
          <button
            className="text-gray-500 hover:text-primary p-2"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="메뉴 닫기"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 border-b border-gray-100">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="text-2xl font-bold text-primary">{user.name}</div>
              <div className="text-base text-gray-500">
                {user.team} • {user.part}
              </div>
              <button className="mt-2 w-full py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200">
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex justify-center items-center w-full py-3 bg-primary text-white text-lg font-bold rounded-lg"
            >
              로그인
            </Link>
          )}
        </div>

        <nav className="flex flex-col px-4 py-4 gap-2">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              disabled={!user}
              isMobile
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
