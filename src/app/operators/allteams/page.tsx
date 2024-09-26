"use client"

import Link from 'next/link'; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

import ButtonLeft from '@/app/components/btnleft';
import ButtonRight from '@/app/components/btnright';
import TeamName from '@/app/components/teamname';
import TournamentName from '@/app/components/tournamentname';

interface Team {
    teamName: string;
}

function AllTeams() {
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

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[52%] h-[52%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='flex gap-8 flex-wrap justify-center overflow-y-auto pt-14 pb-4'>
                    {teams.map((team, index) => (
                        <Link key={index} href={`/operators/selectedteam/${team.teamName}`} passHref>
                            <div>
                                <TeamName teamName={team.teamName} />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="absolute -top-9">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <TournamentName/>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route='/operators/join' />
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight route='/operators/selectedteam' />
            </div>
        </div>
    );
}

export default AllTeams;
