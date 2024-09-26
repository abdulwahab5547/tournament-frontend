import React from 'react';

interface RemoveTournamentProps {
    name?: string;
    onDelete: () => void; 
}

const RemoveTournament: React.FC<RemoveTournamentProps> = ({ name, onDelete }) => {
    return (
        <div className="flex gap-5">
            <div className="bg-white border-gray-500 flex justify-center items-center w-72 rounded-2xl shadow-xl">
                <p className="text-red-700 font-bold text-xl py-2">{name || 'Tournament-X Name'}</p>
            </div>
            <button onClick={onDelete} className='bg-darkOrange shadow-xl text-xl py-3 font-bold px-8 rounded-full'>
                Remove
            </button>
        </div>
    );
};

export default RemoveTournament;