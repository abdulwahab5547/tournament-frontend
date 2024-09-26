"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
// import Ball from '../../assets/ball.png';
import ButtonLeft from '@/app/components/btnleft';
import ButtonRight from '@/app/components/btnright';


interface Tournament {
    _id: string; 
    name: string;
    registrationStatus: string;
    qrCodeImageUrl?: string; 
}

function IntroVideo() {
    const [tournament, setTournament] = useState<Tournament | null>(null);

    useEffect(() => {
        const fetchTournamentDetails = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tournaments'); 
                const tournaments: Tournament[] = response.data.tournaments; 

                if (tournaments.length > 0) {
                    setTournament(tournaments[0]); 
                } else {
                    console.log("No tournaments found.");
                    setTournament(null); 
                }
            } catch (error) {
                console.error("Error fetching tournament details:", error);
            }
        };

        fetchTournamentDetails();
    }, []);

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className='pb-8'>
                <div className="-rotate-6 text-3xl font-extrabold uppercase flex flex-col items-center">
                    <p className="shadow-xl">Tournament</p>
                    <div className='flex gap-3'>
{/*                         <Image src={Ball} width={50} height={50} alt='' className='shadow-2xl'/> */}
                        <p className='pt-2 shadow-2xl'>App</p>
                    </div>
                </div>
            </div>
            <div className="pb-4">
                <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl text-4xl font-bold">
                    {tournament ? ( 
                        <p className="">{tournament.name}</p>
                    ) : (
                        <p className="">Tournament not found</p> 
                    )}
                </div>
            </div>

            {tournament ? (
                <>
                    <div className="pb-3 pt-3">
                        <p className="font-bold text-2xl">Tournament Status: <span>{tournament.registrationStatus}</span></p>
                    </div>
                    {tournament.qrCodeImageUrl && tournament.registrationStatus == "Open" ? (
                        <div className="border-8 border-stone-900 bg-white w-[48%] h-[43%] flex justify-center items-center">
                            <Image src={tournament.qrCodeImageUrl} width={400} height={400} alt='QR code'/>
                        </div>
                    ): null
                    }
                </>
            ): null}

            {tournament ? (
                <>
                {tournament.registrationStatus == "Open" ? (
                    <div className="pt-7">
                        <p className="font-bold text-5xl">Scan QR</p>
                    </div>
                ): null}
                </>
            ): null}
            

            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route='/players/introvideo'/>
            </div>
            <div className='absolute bottom-10 right-10 opacity-70'>
                <ButtonRight/>
            </div>
        </div> 
    );
}

export default IntroVideo;
