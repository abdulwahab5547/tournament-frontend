import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import TeamName from './teamname';
import {toast} from 'react-hot-toast'

interface TeamsPlayingProps {
    closeOverlay: () => void; 
}

interface Team {
    teamName: string;
    status: string;
}

const TeamsPlaying: React.FC<TeamsPlayingProps> = ({ closeOverlay }) => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/teams');
            const playingTeams = response.data.teams.filter((team: Team) => team.status === 'Playing');
            setTeams(playingTeams);
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleDone = async () => {
        try {
            const teamNamesToUpdate = teams.map(team => team.teamName);

            await axios.patch('http://localhost:8000/api/teams/played-status', { teams: teamNamesToUpdate, newStatus: 'Played' });
            fetchTeams();
            toast.success("Teams moved to 'Played'")
            closeOverlay(); 
        } catch (error) {
            console.error("Error updating team status:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 px-12 py-10 items-center z-50 max-w-96">
            <div className='pb-3'>
                <p className='text-3xl text-center font-bold'>Teams Currently Playing</p>
            </div>
            <div className='flex flex-col gap-3 max-h-96 py-5'>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <TeamName 
                            key={index} 
                            teamName={team.teamName} 
                        />
                    ))
                ) : (
                    <p className='text-center text-lg'>No teams are currently playing.</p>
                )}
            </div>
            <button onClick={handleDone} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Set to Played
            </button>
            <button onClick={closeOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Cancel
            </button>
        </div>
    );
}

export default TeamsPlaying;