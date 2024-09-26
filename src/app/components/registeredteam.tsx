import Avatar from '../assets/avatar.png'
import Image from 'next/image'

import React from 'react';

interface RegisteredTeamProps {
    teamName?: string; 
    players?: string[];
    avatarName?: string;
}

const colorClasses = [
    'bg-red-700',
    'bg-green-700',
    'bg-lightYellow',
    'bg-blue-700',
];

const RegisteredTeam: React.FC<RegisteredTeamProps> = ({ teamName, players = [], avatarName = Avatar }) => {
    return(
        <div className="bg-active rounded-md flex-col w-44 px-4 py-4 my-1 bg-opacity-70">
            <div className='flex flex-wrap items-center pb-3 gap-2'>
                <Image src={Avatar} width={30} alt="avatar"/>
                <p className='text-white text-sm'>{teamName}</p>
            </div>
            <div className='flex flex-col gap-1 '>
                {players.map((player, index) => (
                        <div key={index} className={`rounded px-1 ${colorClasses[index % colorClasses.length]}`}>
                            <p className="text-sm p-1">{player}</p>
                        </div>
                    ))}
            </div>
            
        </div>  
    )
}

export default RegisteredTeam;