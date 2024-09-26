"use client"

import ButtonLeft from '@/app/components/btnleft'
import ButtonRight from '@/app/components/btnright'
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TournamentName from '@/app/components/tournamentname';

function Join(){
    const router = useRouter();
    const [codeParts, setCodeParts] = useState<string[]>(['', '', '']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleChange = (index: number, value: string) => {
        const updatedParts = [...codeParts];
        updatedParts[index] = value.slice(0, 1); 
        setCodeParts(updatedParts);
    };

    const handleValidate = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = codeParts.join('');

        try {
            const response = await axios.post('http://localhost:8000/api/validate-code', { code: fullCode });

            if (response.status === 200) {
                toast.success("You're logged in as an operator!");
                setIsLoggedIn(true); 
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred during validation.');
            } else {
                toast.error('An error occurred during validation.');
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                router.push('/operators/allteams');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, router]);
    return(
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[52%] h-[52%] flex flex-col justify-center items-center rounded-xl">
                <p className='text-4xl font-bold text-center'>Enter 3 Digit Code<br/>to Join</p>
                <form onSubmit={handleValidate}>
                    <div className='w-96 pt-5'>
                        {codeParts.map((part, index) => (
                        <input
                            key={index}
                            type="text"
                            value={part}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className='w-20 mx-5 border-b-2 bg-inherit focus:outline-none text-4xl text-center'
                            maxLength={1} 
                            />
                        ))}
                    </div>
                    <div className='pt-10 text-center'>
                        <button type="submit" className='py-1 shadow-lg px-12 font-bold text-2xl rounded-3xl bg-darkOrange border border-gray-700'>
                            Join
                        </button>
                    </div>
                </form>
                    
                <div className="absolute -top-9">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <TournamentName/>
                    </div>
                </div>
                
            </div>
            <div className='absolute bottom-10 left-10 opacity-70'>
                <ButtonLeft/>
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight route='/operators/allteams'/> 
            </div>
            
        </div> 
    )
}

export default Join;