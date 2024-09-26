"use client";

import React, { useEffect, useState } from 'react';
import ButtonLeft from '@/app/components/btnleft';
import ButtonRight from '@/app/components/btnright';
import PlayerScoreLeaderboard from '@/app/components/playerscoreleaderboard';
import TournamentName from '@/app/components/tournamentname';

interface Team {
    _id: string;
    teamName: string;
    totalTeamScore: number;
}

function LeaderBoard() {
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
            <div className="relative orange-yellow-gradient w-[52%] h-[60%] flex flex-col justify-center items-center rounded-xl pb-3">
                
                <div className='flex gap-3 flex-col justify-center items-center overflow-y-auto pt-14 pb-4 w-full'>
                    <div>
                        <p className='text-3xl font-bold text-center'>Leader Board</p>
                    </div>
                    <div className='py-4 flex flex-col overflow-y-auto gap-5 px-3'>
                        {teams.map((team, index) => (
                            <PlayerScoreLeaderboard 
                                key={team._id} 
                                teamName={team.teamName} 
                                totalScore={team.totalTeamScore} 
                            />
                        ))}
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
    );
}

export default LeaderBoard;