import React from 'react';

interface TeamNameProps {
    teamName?: string; 
}

const TeamName: React.FC<TeamNameProps> = ({ teamName }) => {
    return (
        <div className="">
            <div className="bg-white border-gray-500 flex justify-center items-center w-72 rounded-2xl shadow-xl">
                <p className="text-red-700 font-bold text-xl py-2">
                    {teamName || 'Team-X Name'}
                </p>
            </div>
        </div>
    );
};

export default TeamName;
