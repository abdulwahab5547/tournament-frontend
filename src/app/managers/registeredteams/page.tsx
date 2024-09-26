"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

import ButtonLeft from '@/app/components/btnleft'
import ButtonRight from '@/app/components/btnright'
import TeamName from '@/app/components/teamname';
import TournamentName from '@/app/components/tournamentname';

interface Team {
    teamName: string;
}

const RegisteredTeams: React.FC = () => {
    
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teams');
                setTeams(response.data.teams);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTeams();
    }, []);

    return(
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[52%] h-[60%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='flex justify-center items-center pt-14 pb-6'>
                    <p className='text-4xl font-bold'>Registered Teams</p>
                </div>
                <div className='flex gap-8 flex-wrap justify-center overflow-y-auto pt-4 pb-4'>
                {teams.map((team, index) => (
                    <div key={index}>
                        <TeamName teamName={team.teamName} />
                    </div>
                ))}
                </div>


                <div className="absolute -top-9">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <TournamentName/>
                    </div>
                </div>
                
            </div>
            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route='/managers/menu'/>
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight/>
            </div>
            
        </div> 
    )
}

export default RegisteredTeams;