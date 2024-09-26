"use client"

import Overlay from "@/app/components/overlay";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegControl from "@/app/components/regcontrol";
import Rename from "@/app/components/rename";
import MarkTeams from "@/app/components/markteams";
import TournamentName from "@/app/components/tournamentname";

const Menu: React.FC = () => {

    const router = useRouter();

    const [isRegOverlayVisible, setRegOverlayVisible] = useState<boolean>(false);
    const [isRenameOverlayVisible, setRenameOverlayVisible] = useState<boolean>(false);
    

    const openRegOverlay = () => setRegOverlayVisible(true);
    const closeRegOverlay = () => setRegOverlayVisible(false);

    const openRenameOverlay = () => setRenameOverlayVisible(true);
    const closeRenameOverlay = () => setRenameOverlayVisible(false);

    

    const handleRegisteredTeams = () => {
        router.push('/managers/registeredteams'); 
    };

    const handleMonitorTeams = () => {
        router.push('/managers/monitorteams'); 
    };

    const handleLeaderboard = () => {
        router.push('/managers/leaderboard'); 
    };

    const handleShowResult = () => {
        router.push('/managers/submitresult'); 
    };

    const handleOperatorControl = () => {
        router.push('/managers/operatorcontrol'); 
    };

    const handleMarkTeams = () => {
        router.push('/managers/markteams'); 
    };

    const handleFinalTeams = () => {
        router.push('/managers/topteams'); 
    };

    return(
        <div className="h-screen flex flex-col items-center justify-center text-white">
            <div className="relative z-0 orange-yellow-gradient w-[52%] h-[58%] flex flex-col justify-center items-center rounded-xl pb-3 pt-4">
                <div className='flex gap-8 flex-wrap justify-center overflow-y-auto pt-14 pb-8'>
                    <button onClick={handleRegisteredTeams} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Registered Teams
                    </button>
                    <button onClick={handleMonitorTeams} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Monitor Teams
                    </button>
                    <button onClick={handleLeaderboard} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Leader Board
                    </button>
                    <button onClick={handleMarkTeams} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Mark Teams
                    </button>
                    {/* <Overlay isVisible={isMarkOverlay} onClose={closeMarkOverlay}>
                        <MarkTeams closeOverlay={closeMarkOverlay}/>
                    </Overlay> */}
                    <button onClick={openRegOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Registration Control
                    </button>
                    <Overlay isVisible={isRegOverlayVisible} onClose={closeRegOverlay}>
                        <RegControl closeOverlay={closeRegOverlay}/>
                    </Overlay>
                    <button onClick={handleOperatorControl} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Operator Control
                    </button>
                    <button onClick={openRenameOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Rename Tournament
                    </button>
                    <Overlay isVisible={isRenameOverlayVisible} onClose={closeRenameOverlay}>
                        <Rename closeOverlay={closeRenameOverlay}/>
                    </Overlay>
                    <button onClick={handleShowResult} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Show Result
                    </button>
                    <button onClick={handleFinalTeams} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Final Four Teams
                    </button>
                </div>
                <div className="absolute -top-9 -z-10">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <TournamentName/>
                    </div>
                </div>
                
            </div>
            
        </div> 
    )
}

export default Menu;