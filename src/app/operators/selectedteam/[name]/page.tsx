"use client"

import ButtonLeft from '@/app/components/btnleft'
import ButtonRight from '@/app/components/btnright'
import PlayerScore from '@/app/components/playerscore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TournamentName from '@/app/components/tournamentname';

interface Player {
    _id: string;
    name: string;
    scores: {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        totalScore: number;
    };
}

const SelectedTeam = ({ params }: { params: { name: string } }) => {
    const { name } = params;
    const [players, setPlayers] = useState<Player[]>([]);
    const [teamTotal, setTeamTotal] = useState<number>(0);

    useEffect(() => {
        fetchPlayers();
    }, [name]);

    const fetchPlayers = async () => {
        if (name) {
            try {
                const response = await axios.get(`http://localhost:8000/api/teams/${name}/players`);
                setPlayers(response.data.players);

                const initialTeamTotal = response.data.players.reduce((acc: number, player: Player) => acc + player.scores.totalScore, 0);
                setTeamTotal(initialTeamTotal);

            } catch (err) {
                console.error(err);
            }
        }
    };

    const updatePlayerName = async (playerId: string, newName: string) => {
        console.log(newName);
        try {
            await axios.put(`http://localhost:8000/api/players/${playerId}`, { newName });
            fetchPlayers();
        } catch (err) {
            console.error(err);
        }
    };

    const updatePlayerScores = async (playerId: string, updatedScores: any) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/players/${playerId}/scores`, updatedScores);
            fetchPlayers(); // Refresh players' data

            // Update team total with response
            setTeamTotal(response.data.teamTotal);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[55%] h-[70%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='pb-12 pt-5'>
                    <p className='text-5xl font-bold'>{decodeURIComponent(name)} Team</p>
                </div>
                <div className='flex gap-8 flex-wrap pb-4 font-bold'>
                    <div className='w-72 pl-8'>
                        <p className='text-sm'>Player name</p>
                    </div>
                    <div className='w-20 pl-5'>
                        <p className='text-sm'>Score-1</p>
                    </div>
                    <div className='w-20'>
                        <p className='text-sm'>Score-2</p>
                    </div>
                    <div className='w-20'>
                        <p className='text-sm'>Score-3</p>
                    </div>
                    <div className='w-20'>
                        <p className='text-sm'>Score-4</p>
                    </div>
                    <div className='w-20'>
                        <p className='text-sm'>Total</p>
                    </div>
                </div>
                <div className='flex gap-8 flex-wrap justify-center pb-4'>
                    {players.map((player, index) => (
                        <PlayerScore
                            key={player._id}
                            playerId={player._id}
                            playerIndex={index}
                            playerName={player.name}
                            scores={player.scores}
                            onPlayerNameUpdate={updatePlayerName}
                            onScoresUpdate={updatePlayerScores} 
                        />
                    ))}
                </div>
                <div className='flex justify-between pt-8 w-[75%]'>
                    <div className='w-[50%] text-right'>
                        {/* <button className='py-2 shadow-lg w-48 font-bold text-xl rounded-3xl bg-darkOrange border border-gray-700'>Player Turn</button> */}
                    </div>
                    <div className='w-[50%] flex justify-end items-center gap-5'>
                        <p className='font-bold'>Team total:</p>
                        <div className='bg-lightYellow rounded-xl flex items-center justify-center w-32 py-2'>
                            <p className='text-2xl font-bold'>{teamTotal}</p>
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
                <ButtonLeft route='/operators/allteams' />
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight route='/operators/playerturn' />
            </div>
        </div>
    );
};

export default SelectedTeam;
