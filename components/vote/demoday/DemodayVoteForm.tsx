'use client';

import { useState } from "react";

const teams = [
    {
        name: "팀 A",
    },
    {
        name: "팀 B",
    },
    {
        name: "팀 C",
    },
    {
        name: "팀 D",
    },
    {
        name: "팀 E",
    }
]

export default function DemodayVoteForm() {
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    
    const handleTeamSelect = (teamName: string) => {
        setSelectedTeam(teamName);
    };
    
    return (
        <div className="flex flex-col items-center justify-center gap-4 pl-">
            <div className="grid grid-cols-6 gap-y-4 gap-x-8">
                {teams.map((team, index) => (
                    <div 
                        key={team.name} 
                        className={`flex flex-col items-center justify-center col-span-2 ${
                            index === 3 ? "col-start-2" : ""
                        }`}
                    >
                        <div 
                            className={`flex justify-center items-center w-60 h-35 rounded-lg m-4 cursor-pointer ${selectedTeam === team.name ? 'bg-primary text-white border-none' : 'bg-white text-black border border-primary border-px'}`}
                            onClick={() => handleTeamSelect(team.name)}
                        >
                            {team.name}
                        </div>
                    </div>
                ))}
            </div>

            <button className="flex items-center justify-center w-30 h-15 rounded-lg bg-primary text-white text-xl font-bold cursor-pointer">투표 완료</button>
        </div>
    )
}