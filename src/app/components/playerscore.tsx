import React, { useState } from 'react';

interface PlayerScoreProps {
    playerId: string;
    playerName: string;
    playerIndex: number;
    scores: {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        totalScore: number;
    };
    onPlayerNameUpdate: (playerId: string, newName: string) => void;
    onScoresUpdate: (playerId: string, updatedScores: any) => void;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ playerId, playerIndex, playerName, scores, onPlayerNameUpdate, onScoresUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playerName);
    const [editableScores, setEditableScores] = useState({
        score1: scores.score1,
        score2: scores.score2,
        score3: scores.score3,
        score4: scores.score4,
    });

    const handleSave = () => {
        onPlayerNameUpdate(playerId, newName);
        onScoresUpdate(playerId, editableScores);
        setIsEditing(false);
    };

    const playerColors = ['bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500']

    return (
        <div className="flex items-center justify-between gap-5">
    {/* Player Name Box */}
    <div className={`${playerColors[playerIndex % playerColors.length]} border-gray-500 py-1 flex justify-between items-center px-5 w-72 rounded-2xl shadow-xl`}>
        <div>
            {isEditing ? (
                <input
                    className="text-white bg-transparent font-bold text-xl py-2 max-w-40 focus:outline-none"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            ) : (
                <p className="text-white font-bold text-xl py-2">{playerName}</p>
            )}
        </div>
        <div>
            {isEditing ? (
                <button onClick={handleSave} className="text-white text-xl font-bold">Save</button>
            ) : (
                <i
                    className="fa-solid fa-pen-to-square text-white text-xl cursor-pointer"
                    onClick={() => setIsEditing(true)}
                ></i>
            )}
        </div>
    </div>

    {/* Editable Scores */}
    {['score1', 'score2', 'score3', 'score4'].map((scoreKey, index) => (
        <div
            key={index}
            className={`${playerColors[playerIndex % playerColors.length]} border-gray-500 py-1 flex justify-center items-center px-7 w-20 rounded-2xl shadow-xl`}
        >
            {isEditing ? (
                <input
                    className="text-white bg-transparent text-xl font-bold py-2 w-12 text-center focus:outline-none"
                    type="number"
                    value={editableScores[scoreKey as keyof typeof editableScores]}
                    onChange={(e) => setEditableScores({ ...editableScores, [scoreKey]: Number(e.target.value) })}
                />
            ) : (
                <p className="text-white text-xl font-bold py-2">{scores[scoreKey as keyof typeof scores]}</p>
            )}
        </div>
    ))}

    {/* Total Score Box */}
    <div className={`${playerColors[playerIndex % playerColors.length]} border-gray-500 py-1 flex justify-center items-center px-8 w-20 rounded-2xl shadow-xl`}>
        <p className="text-white text-xl font-bold py-2">{scores.totalScore}</p>
    </div>
</div>
    );
};

export default PlayerScore;