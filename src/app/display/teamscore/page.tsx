"use client";

import React, { useEffect, useState } from 'react';
import ButtonLeft from '@/app/components/btnleft';
import ButtonRight from '@/app/components/btnright';
import TeamScoreComponent from '@/app/components/teamscore';
import { useTournament } from '@/app/functions/tournamentcontext';

interface Team {
    _id: string;
    teamName: string;
    totalTeamScore: number;
}

function TeamScore() {
    const { tournament } = useTournament();
    const [teams, setTeams] = useState<Team[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/team-scores');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched teams:', data); // Log the fetched data
                setTeams(data);
            } catch (error: any) {
                console.error('Error fetching team scores:', error);
                setError('Failed to fetch team scores.'); // Set error message
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            {error && <div className="text-red-500">{error}</div>} {/* Display error if any */}
            <div className="relative bg-darkBlue bg-opacity-70 shadow-2xl w-[52%] h-[68%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='flex justify-center items-center pt-12 pb-3'>
                    <p className='text-4xl font-bold'>Team Score</p>
                </div>
                <div className='flex gap-8 flex-wrap justify-center pt-3 pb-8 overflow-y-auto mt-2 mb-1'>
                    {teams.map((team, index) => (
                        <TeamScoreComponent 
                            key={team._id} 
                            teamName={team.teamName} 
                            totalScore={team.totalTeamScore} 
                            position={index + 1} 
                            isAlternate={index % 2 !== 0} 
                        />
                    ))}
                </div>

                <div className="absolute -top-9">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <p className="text-4xl font-bold">{tournament?.name ?? "Tournament Name"}</p>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route='/display/displayscore' />
            </div>
            <div className='absolute bottom-10 right-10 opacity-70'>
                <ButtonRight />
            </div>
        </div>
    );
}

export default TeamScore;