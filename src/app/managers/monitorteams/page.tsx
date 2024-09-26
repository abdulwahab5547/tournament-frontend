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
    status: string;
}

function MonitorTeams(){
    const [activeTeams, setActiveTeams] = useState<Team[]>([]);
    const [playedTeams, setPlayedTeams] = useState<Team[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teams'); 
                const allTeams: Team[] = response.data.teams;

                const active = allTeams.filter(team => team.status === 'Active');
                const played = allTeams.filter(team => team.status === 'Played');
                
                setActiveTeams(active);
                setPlayedTeams(played);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        fetchTeams();
    }, []);

    return(
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[60%] h-[60%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='flex gap-4 justify-center pt-14 pb-4 overflow-y-auto px-8'>
                    <div className='bg-active h-full px-8 overflow-y-auto rounded-2xl py-5'>
                        <p className='font-bold text-3xl pb-6 pt-3'>Active Teams</p>
                        <div className='flex flex-col gap-3'>
                            {activeTeams.map((team, index) => (
                                <div key={index}>
                                    <TeamName teamName={team.teamName} />
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    <div className='bg-active h-full px-8 overflow-y-auto rounded-2xl py-5'>
                        <p className='font-bold text-3xl pb-6 pt-3'>Played Teams</p>
                        <div className='flex flex-col gap-3'>
                            {playedTeams.map((team, index) => (
                                <div key={index}>
                                    <TeamName teamName={team.teamName} />
                                </div>
                            ))}
                        </div>
                        
                    </div>
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

export default MonitorTeams;