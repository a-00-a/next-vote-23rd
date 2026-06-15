'use client';

export default function LoginForm() {
    // 올바른 FormEvent 타입으로 수정
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const id = formData.get('id');
        const password = formData.get('password');
        
        console.log({ id, password });
    };

    return (
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input 
                name="id" 
                type="text" 
                className="w-full h-12 px-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                placeholder="아이디를 입력해주세요"
            />
            
            <input 
                name="password" 
                type="password" 
                className="w-full h-12 px-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                placeholder="비밀번호를 입력해주세요"
            />
            
            <button 
                type="submit" 
                className="cursor-pointer w-full h-12 mt-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 disabled:bg-gray-400 transition-all"
            >
                로그인
            </button>
        </form>
    )
}