"use client"

import React from 'react';

interface TeamScoreComponentProps {
    teamName: string;
    totalScore?: number;
    position: number;
    isAlternate: boolean;
}

function TeamScoreComponent({ teamName, totalScore = 0, position, isAlternate }: TeamScoreComponentProps) {
    const renderMedal = () => {
        if (position === 1) return <i className="fa-solid fa-medal text-2xl text-yellow-500"></i>; // Gold medal
        if (position === 2) return <i className="fa-solid fa-medal text-2xl text-gray-300"></i>; // Silver medal
        if (position === 3) return <i className="fa-solid fa-medal text-2xl text-amber-700"></i>; // Bronze medal
        if (position === 4) return <i className="fa-solid fa-medal text-2xl text-orange"></i>;
        return null; 
    };
    const bgColor = isAlternate ? 'bg-lightYellow' : 'bg-orange';

    return (
        <div className="flex items-center gap-3">
            <div className="w-10">
                {renderMedal()}
            </div>

            <div className={`rounded-full ${bgColor} py-2 shadow-xl w-16 text-center`}>
                <p className="text-2xl font-bold px-3">{position < 10 ? `0${position}` : position}</p>
            </div>

            <div className={`w-80 ${bgColor} py-2 rounded-full shadow-xl`}>
                <p className="text-2xl font-bold px-5">{teamName}</p>
            </div>

            <div className={`rounded-full ${bgColor} py-2 shadow-xl w-28 text-center`}>
                <p className="text-2xl font-bold px-5">{totalScore?.toString().padStart(3, '0')}</p>
            </div>
        </div>
    );
}

export default TeamScoreComponent;