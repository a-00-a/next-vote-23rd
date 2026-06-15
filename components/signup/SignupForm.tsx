// 'use client';

// import { useState } from 'react';

// export default function SignupForm() {
//   const [userType, setUserType] = useState<'프론트엔드' | '백엔드'>(
//     '프론트엔드'
//   );

//   const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const name = formData.get('name');
//     const password = formData.get('password');
//     const confirmPassword = formData.get('confirmPassword');

//     if (password !== confirmPassword) {
//       alert('비밀번호가 일치하지 않습니다.');
//       return;
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-center gap-4 mb-5">
//         <button className={`w-88 h-15 cursor-pointer rounded-lg ${userType === '프론트엔드' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setUserType('프론트엔드')}>
//           프론트엔드
//         </button>
//         <button className={`w-88 h-15 cursor-pointer rounded-lg ${userType === '백엔드' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setUserType('백엔드')}>
//           백엔드
//         </button>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col justify-center items-center gap-4 w-full"
//       >
//         <input
//           name="name"
//           type="text"
//           placeholder="이름"
//           required
//           className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
//         />
//         <input
//           name="ID"
//           type="text"
//           placeholder="아이디"
//           required
//           className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="비밀번호"
//           required
//           className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
//         />
//         <input
//           name="confirmPassword"
//           type="password"
//           placeholder="비밀번호 확인"
//           required
//           className="flex items-center w-180 h-15 border px-7 py-4.25 rounded-lg placeholder:text-input placeholder:text-gray-400 border-px border-gray-400"
//         />

//         <button
//           type="submit"
//           className="w-100 h-23 px-35 bg-primary text-white text-heading p-2 rounded-lg disabled:bg-gray-400 font-semibold"
//         >
//           회원가입
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [userType, setUserType] = useState<'프론트엔드' | '백엔드'>('프론트엔드');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const id = formData.get('ID');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // TODO: 회원가입 API 연동
    console.log({ userType, name, id, password });
  };

  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#FFFFFF] px-4 py-10 font-pretendard">
      
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        <div className="hidden md:flex flex-col justify-between w-5/12 bg-blue-50/50 p-12">
          <div>
            <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight leading-tight">
              함께 만들어가는<br />
              새로운 투표 문화,
            </h2>
            <p className="mt-4 text-blue-900/70 font-medium">
              Groupeat에서 시작해보세요.
            </p>
          </div>
          
          <div className="relative w-full h-48 opacity-80">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* ─── 오른쪽 영역: 입력 폼 섹션 ─── */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          
          <h1 className="text-2xl font-bold text-gray-800 mb-8 md:hidden">회원가입</h1>

          <div className="relative flex w-full p-1.5 bg-gray-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setUserType('프론트엔드')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                userType === '프론트엔드'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              프론트엔드
            </button>
            <button
              type="button"
              onClick={() => setUserType('백엔드')}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-300 ${
                userType === '백엔드'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              백엔드
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="이름"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
              <input
                name="ID"
                type="text"
                placeholder="아이디"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-primary text-white text-lg font-bold rounded-xl hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:transform-none disabled:shadow-none"
            >
              회원가입
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}