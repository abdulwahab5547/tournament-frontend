import { useTournament } from '@/app/functions/tournamentcontext';

function TournamentName(){
    const { tournament } = useTournament();
    return(
        <p className="text-4xl font-bold">{tournament?.name ?? "Tournament Name"}</p>
    )
}

export default TournamentName; 