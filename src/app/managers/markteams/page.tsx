"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';

import ButtonLeft from '@/app/components/btnleft'
import ButtonRight from '@/app/components/btnright'
import MarkTeams from '@/app/components/markteams';
import Overlay from '@/app/components/overlay';
import TeamsPlaying from '@/app/components/teamsplaying';
import TournamentName from '@/app/components/tournamentname';

function MarkTeamsPage(){
    const [isMarkOverlay, setMarkOverlay] = useState<boolean>(false);
    const openMarkOverlay = () => setMarkOverlay(true);
    const closeMarkOverlay = () => setMarkOverlay(false);

    const [isPlayingOverlay, setPlayingOverlay] = useState<boolean>(false);
    const openPlayingOverlay = () => setPlayingOverlay(true);
    const closePlayingOverlay = () => setPlayingOverlay(false);
    return(
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative z-10 orange-yellow-gradient w-[52%] h-[52%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div>
                  <p className='text-5xl font-bold'>Mark Teams</p>  
                </div>
                <div className='flex flex-col gap-8 justify-center overflow-y-auto pt-14 pb-4'>
                    <button onClick={openPlayingOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Teams Playing
                    </button>
                    <Overlay isVisible={isPlayingOverlay} onClose={closePlayingOverlay}>
                        <TeamsPlaying closeOverlay={closePlayingOverlay}/>
                    </Overlay>
                    <button onClick={openMarkOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Mark Teams
                    </button>
                    <Overlay isVisible={isMarkOverlay} onClose={closeMarkOverlay}>
                        <MarkTeams closeOverlay={closeMarkOverlay}/>
                    </Overlay>
                </div>


                <div className="absolute -top-9 -z-10">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl ">
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

export default MarkTeamsPage;