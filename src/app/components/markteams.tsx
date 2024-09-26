import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import SelectTeamName from './SelectTeamName'; 
import {toast} from 'react-hot-toast'

interface MarkTeamsProps {
    closeOverlay: () => void; 
}

interface Team {
    teamName: string;
    status: string;
}

const MarkTeams: React.FC<MarkTeamsProps> = ({ closeOverlay }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]); // Store selected team names

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/teams');
                // Filter teams to only include those with an 'Active' status
                const activeTeams = response.data.teams.filter((team: Team) => team.status === 'Active');
                setTeams(activeTeams);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTeams();
    }, []);

    const handleSelect = (teamName: string, isSelected: boolean) => {
        if (isSelected) {
            // Check if already selected
            if (selectedTeams.length < 4) {
                setSelectedTeams((prev) => [...prev, teamName]);
            }
        } else {
            setSelectedTeams((prev) => prev.filter((name) => name !== teamName));
        }
    };

    const handleDone = async () => {
        try {
            await axios.patch('http://localhost:8000/api/teams/status', { teams: selectedTeams });
            toast.success("Teams marked for 'playing'")
            closeOverlay(); 
            
        } catch (error) {
            console.error("Error updating team status:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 px-12 py-10 items-center z-50">
            <div className='pb-3'>
                <p className='text-xl font-bold'>Select up to four teams you want to play.</p>
            </div>
            <div className='bg-active h-full px-8 overflow-y-auto rounded-2xl pb-8 mb-2'>
                <div className='flex flex-col gap-3 max-h-96 py-5'>
                    {teams.length > 0 ? ( // Conditional rendering
                        teams.map((team, index) => (
                            <SelectTeamName 
                                key={index} 
                                teamName={team.teamName} 
                                isSelected={selectedTeams.includes(team.teamName)} 
                                onSelect={(isSelected) => handleSelect(team.teamName, isSelected)} 
                            />
                        ))
                    ) : (
                        <p className='text-center text-lg'>No active teams.</p> // Message when no active teams
                    )}
                </div>
            </div>
            <button onClick={handleDone} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Done
            </button>
            <button onClick={closeOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Cancel
            </button>
        </div>
    );
}

export default MarkTeams;