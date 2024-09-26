"use client"
import { useRouter } from 'next/navigation';
import { useTournament } from '@/app/functions/tournamentcontext';
const DisplayScore: React.FC = () => {
    const { tournament } = useTournament();
    const router = useRouter();
    const handleTeamScore = () => {
        router.push('/display/teamscore'); 
    };

    const handleIndividualScore = () => {
        router.push('/display/individualscore'); 
    };

    const handleTopTeams = () => {
        router.push('/display/topteams'); 
    };

    const handleTopPlayers = () => {
        router.push('/display/topplayers'); 
    };

    return(
        <div className="h-screen flex flex-col items-center justify-center text-white">
            <div className="relative z-0 orange-yellow-gradient w-[52%] h-[58%] flex flex-col justify-center items-center rounded-xl pb-3 pt-4">
                <div className="pt-8">
                    <p className="text-5xl font-bold drop-shadow-2xl">High Score</p>
                </div>
                <div className='flex gap-8 flex-col justify-center overflow-y-auto pt-14 pb-8'>
                    <button onClick={handleTeamScore} className='bg-darkOrange shadow-xl text-2xl py-3 font-bold w-72 px-2 rounded-full '>
                        Team Score
                    </button>
                    <button onClick={handleIndividualScore} className='bg-darkOrange shadow-xl text-2xl py-3 font-bold w-72 px-2 rounded-full '>
                        Individual Score
                    </button>
                    <button onClick={handleTopTeams} className='bg-darkOrange shadow-xl text-2xl py-3 font-bold w-72 px-2 rounded-full '>
                        Top Teams
                    </button>
                    <button onClick={handleTopPlayers} className='bg-darkOrange shadow-xl text-2xl py-3 font-bold w-72 px-2 rounded-full '>
                        Top Players
                    </button>
                </div>
                <div className="absolute -top-9 -z-10">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <p className="text-4xl font-bold">{tournament?.name ?? "Tournament Name"}</p>
                        
                    </div>
                </div>
                
            </div>
            
        </div> 
    )
}

export default DisplayScore;