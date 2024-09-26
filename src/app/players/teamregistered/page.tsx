"use client";

import Image from 'next/image';
// import Ball from '../../assets/ball.png';
import PhoneButtonLeft from '@/app/components/phonebtnleft';
import PhoneButtonRight from '@/app/components/phonebtnright';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTournament } from '@/app/functions/tournamentcontext';

// Define a Player type if you have a specific structure for your player objects
interface Player {
    name: string; // Adjust this type as needed based on your player data structure
}

function TeamRegistered() {
    const { tournament } = useTournament();
    const searchParams = useSearchParams();
    const teamName = searchParams.get('teamName');
    const players = searchParams.get('players');
    const avatarName = searchParams.get('avatarName');
    const [playerArray, setPlayerArray] = useState<Player[]>([]); // Use the Player type for the state

    useEffect(() => {
        if (players) {
            try {
                const parsedPlayers: Player[] = JSON.parse(players); // Parse and type the players
                setPlayerArray(parsedPlayers);
            } catch (error) {
                console.error('Error parsing players:', error);
            }
        }
    }, [players]);

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className='absolute top-5'>
                <div className="-rotate-6 text-lg font-extrabold uppercase flex flex-col items-center">
                    <p>Tournament</p>
                    <div className='flex gap-3'>
{/*                         <Image src={Ball} width={30} height={30} alt='' className='shadow-2xl' /> */}
                        <p>App</p>
                    </div>
                </div>
            </div>
            <div className='h-[70%] w-[80%] max-w-72 bg-orangeBG rounded-2xl mt-10 border-2 border-regBorder'>
                <div className='relative h-full flex flex-col items-center justify-center'>
                    <div className='bg-white text-black px-3 py-3 w-52 rounded-2xl my-2'>
                        <p className='font-bold'>Team Name: {teamName}</p>    
                    </div>
                    {playerArray.map((player, index) => (
                        <div key={index} className={`bg-${['red-700', 'green-700', 'lightYellow', 'blue-700'][index]} text-white px-3 py-2 w-52 rounded-2xl my-2`}>
                            <p className='font-bold'>Player-{index + 1} Name: {player.name}</p> {/* Accessing player.name */}
                        </div>
                    ))}
                    <div className='absolute -top-7'>
                        <div className='w-screen flex justify-center'>
                            <p className="bg-lightYellow text-center text-2xl font-bold p-1 px-4 rounded-xl shadow-xl">
                                <span>{tournament ? tournament.name : "Tournament Name"}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='absolute bottom-4 left-4'>
                <PhoneButtonLeft route='regform'/>
            </div>
            <div className='absolute bottom-4 right-4 opacity-70'>
                <PhoneButtonRight />
            </div>
        </div> 
    );
}

export default TeamRegistered;
