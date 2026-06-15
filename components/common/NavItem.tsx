// 'use client';

// import Link from 'next/link';

// interface NavItemProps {
//   label: string;
//   href: string;
//   isActive?: boolean;
//   disabled?: boolean;
// }

// export default function NavItem({
//   label,
//   href,
//   isActive,
//   disabled,
// }: NavItemProps) {
//   const baseClass =
//     'w-[186px] h-[146px] flex justify-center items-center px-4 py-7 text-2xl font-normal text-center transition-colors duration-200 whitespace-pre-line overflow-hidden';

//   if (disabled) {
//     return (
//       <div className={`${baseClass} text-primary cursor-not-allowed`}>{label}</div>
//     );
//   }

//   return (
//     <Link
//       href={href}
//       className={`${baseClass} ${
//         isActive ? 'bg-primary text-white' : 'text-primary hover:bg-blue-900/10'
//       }`}
//     >
//       <div className="">{label}</div>
//     </Link>
//   );
// }

'use client';

import Link from 'next/link';

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
  disabled?: boolean;
  isMobile?: boolean;
}

export default function NavItem({
  label,
  href,
  isActive,
  disabled,
  isMobile = false,
}: NavItemProps) {
  
  if (isMobile) {
    const mobileBaseClass = "w-full flex items-center px-4 py-4 text-lg rounded-xl transition-colors duration-200";
    
    if (disabled) {
      return <div className={`${mobileBaseClass} text-gray-400 cursor-not-allowed`}>{label}</div>;
    }

    return (
      <Link
        href={href}
        className={`${mobileBaseClass} ${
          isActive 
            ? 'bg-primary text-white font-bold' 
            : 'text-gray-700 hover:bg-blue-50 hover:text-primary'
        }`}
      >
        {label}
      </Link>
    );
  }

  const desktopBaseClass = "relative px-2 py-1 text-base font-medium transition-all duration-300 ease-out inline-block";

  if (disabled) {
    return <div className={`${desktopBaseClass} text-gray-400 cursor-not-allowed`}>{label}</div>;
  }

  return (
    <Link
      href={href}
      className={`${desktopBaseClass} ${
        isActive 
          ? 'text-primary font-bold' 
          : 'text-gray-600 hover:text-primary hover:-translate-y-0.5'
      }`}
    >
      {label}
      
      {isActive && (
        <span className="absolute bottom-[-20px] left-0 w-full h-[3px] bg-primary rounded-t-md" />
      )}
    </Link>
  );
}