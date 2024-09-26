"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Ball from '../../assets/ball.png';
import PhoneButtonLeft from '@/app/components/phonebtnleft';
import PhoneButtonRight from '@/app/components/phonebtnright';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { useTournament } from '@/app/functions/tournamentcontext';


interface Tournament {
  _id: string; 
  name: string;
  registrationStatus: string;
}

function RegistrationForm() {

  
  const [teamName, setTeamName] = useState('');
  const [players, setPlayers] = useState(['', '', '', '']); 
  const [avatarName, setAvatarName] = useState('');
  const router = useRouter();

  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tournaments'); 
        const tournaments: Tournament[] = response.data.tournaments;

        if (tournaments.length > 0) {
          setTournament(tournaments[0]); // Set the first tournament in the array
        } else {
          console.log("No tournaments found.");
          setTournament(null); 
        }
      } catch (error) {
        console.error("Error fetching tournament details:", error);
      }
    };

    fetchTournamentDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tournament) {
        toast.error('No tournament available for registration.');
        return;
    }

    // Transform the players array into the required format
    const formattedPlayers = players.map(playerName => ({
        name: playerName,
        scores: {
            score1: 0,
            score2: 0,
            score3: 0,
            score4: 0,
            totalScore: 0,
        }
    }));

    try {
        const response = await axios.post('http://localhost:8000/api/submit-team', {
            teamName,
            players: formattedPlayers,
            avatarName,
            tournamentName: tournament.name,
        });

        if (response.status === 201) {
            toast.success('Team added successfully!');
            setTimeout(() => {
                router.push(`/players/teamregistered?teamName=${encodeURIComponent(teamName)}&players=${encodeURIComponent(JSON.stringify(formattedPlayers))}&avatarName=${encodeURIComponent(avatarName)}`);
            }, 2000);
        }
    } catch (error: any) {
        if (error.response) {
            toast.error(error.response.data.message || 'An error occurred while submitting the team.');
        } else {
            toast.error('An error occurred while submitting the team.');
        }
    }
};

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  return (
    <div className="h-screen relative flex flex-col items-center justify-center text-white">
      <div className="absolute top-4">
        <div className="-rotate-6 text-lg font-extrabold uppercase flex flex-col items-center">
          <p>Tournament</p>
          <div className="flex gap-3">
            <Image src={Ball} width={30} height={30} alt="" className="shadow-2xl" />
            <p>App</p>
          </div>
        </div>
      </div>

      <div className="h-[70%] w-[80%] max-w-72 bg-orangeBG rounded-2xl mt-10 border-2 border-regBorder">
        <form className="relative h-full flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <div className="py-3">
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              className="rounded-lg py-2 px-3 w-48 font-bold text-gray-700"
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>

          {/* Player Inputs */}
          {players.map((player, index) => (
            <div className="py-3" key={index}>
              <input
                type="text"
                placeholder={`Enter Player-${index + 1} Name`}
                value={player}
                className="rounded-lg py-2 px-3 w-48 font-bold text-gray-700"
                onChange={(e) => handlePlayerChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          <div className="py-3">
            <input
              type="text"
              placeholder="Select Team Avatar"
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
              className="rounded-lg py-2 px-3 w-48 font-bold text-gray-700"
              required
            />
          </div>

          <div className="absolute -top-7">
            <div className="w-screen flex justify-center">
              <p className="bg-lightYellow text-2xl font-bold p-2 px-4 rounded-xl shadow-2xl">
                Fill Form
              </p>
            </div>
          </div>

          <div className="absolute -bottom-7">
            <div className="w-screen text-center">
              <button
                type="submit"
                className="bg-lightYellow text-2xl font-bold p-2 px-4 rounded-xl shadow-2xl"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="absolute bottom-4 left-4 opacity-70">
        <PhoneButtonLeft />
      </div>
      <div className="absolute bottom-4 right-4 opacity-70">
        <PhoneButtonRight />
      </div>
    </div>
  );
}

export default RegistrationForm;
