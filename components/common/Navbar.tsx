"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/public/logo-ceos.svg";
import NavItem from "./NavItem";

// ─── 타입 ────────────────────────────────────────────────────────────────────

interface User {
  name: string;
  team: string;
  part: string;
}

// ─── 더미 데이터 (로그인 구현 시 useAuthStore로 교체) ─────────────────────────

const MOCK_USER: User = {
  name: "최민주",
  team: "바리바리",
  part: "FE",
};

// ─── 메뉴 항목 ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "파트장\n투표", href: "/vote/part-leader" },
  { label: "데모데이\n투표", href: "/vote/demoday" },
];

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();

  // TODO: 로그인 구현 시 아래 줄을 교체
  // const user = useAuthStore((state) => state.user);
  const user = MOCK_USER;

  return (
    <nav className="w-[186px] h-screen flex flex-col bg-white shrink-0 font-pretendard">
      {/* 로고 */}
      <div className="flex justify-center items-center px-7 py-10">
        <Logo className="w-[129px] h-[58px]" />
      </div>

      {/* 구분선 */}
      <div className="mx-1 border-t-[3px] border-blue" />

      {/* 로그인 후: 사용자 정보 + 로그아웃 */}
      {user ? (
        <>
          <div className="flex flex-col justify-center items-center gap-2.5 w-full h-[282px] pt-[50px] pb-7">
            <div className="text-4xl font-bold text-blue-900 text-center w-40 h-25">
              {user.name}
            </div>
            <div className="text-2xl font-normal text-blue-900 text-center whitespace-pre-line w-40 h-24">
              {`${user.team}\n${user.part}`}
            </div>
            <button
              className="w-34 h-8 text-xl text-blue-900 border-2 border-blue-900 rounded-lg
                         hover:bg-blue-900 hover:text-white transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className={`w-full flex justify-center items-center
      ${
        pathname === "/login"
          ? "bg-blue text-white"
          : "bg-white text-blue hover:bg-blue-900/10"
      }`}
        >
          <div className="text-2xl font-extrabold text-center px-[57px] py-[125px]">
            로그인
          </div>
        </Link>
      )}

      {/* 공통 메뉴 */}
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
  );
}
