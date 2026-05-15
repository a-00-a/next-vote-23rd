'use client';

import { useState } from 'react';

const members = [
  {
    name: '권가은',
  },
  {
    name: '신유진',
  },
  {
    name: '김문기',
  },
  {
    name: '오예린',
  },
  {
    name: '김서연',
  },
  {
    name: '이예지',
  },
  {
    name: '노수진',
  },
  {
    name: '장효신',
  },
  {
    name: '배성준',
  },
  {
    name: '최민주',
  },
];

export default function PartLeaderVoteForm() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const handleMemberSelect = (memberName: string) => {
    setSelectedMember(memberName);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 pl-">
      <div className="grid grid-cols-6 gap-y-4 gap-x-8">
        {members.map((member, index) => (
          <div
            key={member.name}
            className={`flex flex-col items-center justify-center col-span-2 ${
              index % 2 === 0 ? 'col-start-2' : ''
            }`}
          >
            <div
              className={`flex justify-center items-center w-74 h-18 px-21 py-5 rounded-lg m-4 cursor-pointer ${selectedMember === member.name ? 'bg-primary text-white border-none' : 'bg-white text-black border border-primary border-px'}`}
              onClick={() => handleMemberSelect(member.name)}
            >
              {member.name}
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center w-30 h-15 rounded-lg bg-primary text-white text-xl font-bold cursor-pointer">
        투표 완료
      </button>
    </div>
  );
}
