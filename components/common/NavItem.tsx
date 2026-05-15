'use client';

import Link from 'next/link';

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
  disabled?: boolean;
}

export default function NavItem({
  label,
  href,
  isActive,
  disabled,
}: NavItemProps) {
  const baseClass =
    'w-[186px] h-[146px] flex justify-center items-center px-4 py-7 text-2xl font-normal text-center transition-colors duration-200 whitespace-pre-line overflow-hidden';

  if (disabled) {
    return (
      <div className={`${baseClass} text-primary cursor-not-allowed`}>{label}</div>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClass} ${
        isActive ? 'bg-primary text-white' : 'text-primary hover:bg-blue-900/10'
      }`}
    >
      <div className="">{label}</div>
    </Link>
  );
}
