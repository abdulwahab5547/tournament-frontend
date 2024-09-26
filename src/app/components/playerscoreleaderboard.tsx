interface PlayerScoreLeaderboardProps {
    teamName: string;
    totalScore: number;
}

function PlayerScoreLeaderboard({ teamName, totalScore }: PlayerScoreLeaderboardProps) {
    return (
        <div className="flex items-center justify-between gap-5">
            <div className="bg-white border-gray-500 py-1 flex justify-between items-center px-5 w-72 rounded-2xl shadow-xl">
                <div>
                    <p className="text-red-700 font-bold text-xl py-2">{teamName}</p>
                </div>
            </div>
            <div className="bg-white border-gray-500 py-1 flex justify-center items-center px-8 w-32 rounded-2xl shadow-xl">
                <p className="text-lightYellow text-xl font-bold py-2">{totalScore.toString().padStart(3, '0')}</p>
            </div>
        </div>
    );
}

export default PlayerScoreLeaderboard;