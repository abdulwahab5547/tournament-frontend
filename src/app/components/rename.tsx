"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface RenameProps {
    closeOverlay: () => void; 
}

const Rename: React.FC<RenameProps> = ({ closeOverlay }) => {
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [tournamentId, setTournamentId] = useState<string | null>(null);
    const [tournamentName, setTournamentName] = useState<string>("");

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tournaments');
            setTournaments(response.data.tournaments);

            const currentTournament = response.data.tournaments[0]; // Adjust this logic as needed
            if (currentTournament) {
                setTournamentId(currentTournament._id);
                setTournamentName(currentTournament.name); // Set existing tournament name
            }
        } catch (error) {
            toast.error("Failed to fetch tournaments. Please try again.");
            console.error("Error:", error);
        }
    };

    const renameTournament = async () => {
        if (!tournamentId) {
            toast.error("No tournament selected for renaming.");
            return;
        }

        try {
            await axios.patch(`http://localhost:8000/api/tournament/${tournamentId}`, {
                name: tournamentName,
            });
            toast.success("Tournament renamed successfully!");
            fetchTournaments(); // Refresh tournaments
            closeOverlay(); // Close the overlay after renaming
        } catch (error) {
            toast.error("Failed to rename tournament. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 px-12 py-10 items-center">
            <div className="pb-5">
                <input
                    placeholder="Enter Tournament Name"
                    className="text-center text-xl text-orange py-3 w-80 rounded-xl"
                    value={tournamentName} 
                    onChange={(e) => setTournamentName(e.target.value)} 
                />
            </div>
            <button 
                onClick={renameTournament} 
                className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '
            >
                Done
            </button>
            <button onClick={closeOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Cancel
            </button>
        </div>
    );
}

export default Rename;