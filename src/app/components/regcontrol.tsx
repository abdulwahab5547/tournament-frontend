
"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import RemoveTournament from "@/app/components/removetournament";
import Overlay from "@/app/components/overlay";

interface RegControlProps {
    closeOverlay: () => void; 
  }

const RegControl: React.FC<RegControlProps> = ({ closeOverlay }) => {
    const [isInnerOverlayVisible, setInnerOverlayVisible] = useState<boolean>(false);
    const openInnerOverlay = () => setInnerOverlayVisible(true);
    const closeInnerOverlay = () => setInnerOverlayVisible(false);
    const [currentTournamentStatus, setCurrentTournamentStatus] = useState<string | null>(null);

    const [isTournamentOverlayVisible, setTournamentOverlayVisible] = useState<boolean>(false);
    const openTournamentOverlay = () => {
        fetchTournaments(); 
        setTournamentOverlayVisible(true);
    };
    const closeTournamentOverlay = () => setTournamentOverlayVisible(false);

    const [tournaments, setTournaments] = useState<any[]>([]);
    const [tournamentName, setTournamentName] = useState<string>("");
    const [tournamentId, setTournamentId] = useState<string | null>(null);

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
                setCurrentTournamentStatus(currentTournament.registrationStatus); // Set the current tournament status
            }
        } catch (error) {
            toast.error("Failed to fetch tournaments. Please try again.");
            console.error("Error:", error);
        }
    };
    const deleteTournament = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8000/api/tournament/${id}`);
            toast.success("Tournament deleted successfully!");
            setTournaments(tournaments.filter((tournament) => tournament._id !== id));
            fetchTournaments();
            closeTournamentOverlay();
            
        } catch (error) {
            toast.error("Failed to delete tournament. Please try again.");
            console.error("Error:", error);
        }
    };

    const handleTournamentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTournamentName(e.target.value);
      };

      useEffect(() => {
        const savedTournamentId = localStorage.getItem('tournamentId');
        if (savedTournamentId) {
            setTournamentId(savedTournamentId);
        }
    }, []);

    const saveTournament = async () => {
        if (!tournamentName.trim()) {
            toast.error("Tournament name is required.");
            return;
        }

        try {
            // Create the tournament, which now includes QR code generation
            const response = await axios.post(`http://localhost:8000/api/tournament`, {
                name: tournamentName,
                registrationStatus: "Open",
            });

            const { tournament } = response.data;
            setTournamentId(tournament._id);

            // Save tournamentId in localStorage
            localStorage.setItem('tournamentId', tournament._id);

            toast.success("Tournament created and registration opened!");

            fetchTournaments(); // Fetch updated tournaments
            closeInnerOverlay(); // Close overlay if applicable
        } catch (error) {
            toast.error("Error opening registration. Ensure there is no existing tournament.");
            console.error("Error:", error);
        }
    };

    const closeRegistration = async () => {
        if (!tournamentId) {
            toast.error("No tournament found. Please create a tournament first.");
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:8000/api/tournament/${tournamentId}/registration-status`,
                { registrationStatus: "Closed" }
            );
            toast.success("Registration closed successfully!");
            fetchTournaments();
        } catch (error) {
            toast.error("Failed to close registration. Please try again.");
            console.error("Error:", error);
        }
    };
      
    return(
        <div className="flex flex-col gap-5 px-12 py-10">
            <div className="text-center">
                <p className="text-darkOrange text-xl font-bold">
                    Status: <span className="text-white ">{currentTournamentStatus || 'No tournament'}</span>
                </p>
            </div>
            <button onClick={openInnerOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full'>
                Open Registration
            </button>
            <Overlay isVisible={isInnerOverlayVisible} onClose={closeInnerOverlay}>
                <div className="flex flex-col gap-5 px-6 py-4 items-center">
                    <div className="text-xl py-3 font-bold px-2 rounded-full flex justify-center">
                        <div className="pb-3">
                            <input
                                placeholder="Enter Tournament Name"
                                className="text-center text-xl text-orange py-3 w-80 rounded-xl"
                                value={tournamentName}
                                onChange={handleTournamentNameChange}
                        />
                        </div>
                    </div>
                    <button onClick={saveTournament} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Save
                    </button>
                    <button onClick={closeInnerOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Cancel
                    </button>
                </div>
                
            </Overlay>
            <button onClick={closeRegistration} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Close Registration
            </button>
            <button onClick={openTournamentOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full'>
                Remove Tournament
            </button>
            <Overlay isVisible={isTournamentOverlayVisible} onClose={closeTournamentOverlay}>
                <div className="flex flex-col gap-5 px-6 py-4 items-center">
                    <div className='flex justify-center overflow-y-auto pt-4 pb-8'>
                        {tournaments.length === 0 ? (
                            <div className="text-lg font-bold">
                                No tournaments available.
                            </div>
                        ) : (
                            tournaments.map((tournament) => (
                                <div key={tournament._id}>
                                    <RemoveTournament name={tournament.name} onDelete={() => deleteTournament(tournament._id)} />
                                </div>
                            ))
                        )}
                    </div>
                    <button onClick={closeTournamentOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                        Cancel
                    </button>
                </div>
                
            </Overlay>
            <button onClick={closeOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                Cancel
            </button>
        </div>
    )
}

export default RegControl; 