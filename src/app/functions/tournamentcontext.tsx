"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface Tournament {
  name: string;
  registrationStatus: string;
  singletonKey: string;
}

interface TournamentContextType {
  tournament: Tournament | null;
  setTournament: React.Dispatch<React.SetStateAction<Tournament | null>>;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};

export const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const [tournament, setTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tournaments');
        const tournaments: Tournament[] = response.data.tournaments;
        if (tournaments.length > 0) {
          setTournament(tournaments[0]);
        }
      } catch (error) {
        console.error('Error fetching tournament details:', error);
      }
    };

    fetchTournamentDetails();
  }, []);

  return (
    <TournamentContext.Provider value={{ tournament, setTournament }}>
      {children}
    </TournamentContext.Provider>
  );
};
