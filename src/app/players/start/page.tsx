"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Image from 'next/image'
import Ball from '../../assets/ball.png'

function Players(){
    const router = useRouter();
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
            setShowIcon(true); 
        }, 1500);

        return () => clearTimeout(timer); 
    }, []);

    const [showIcon, setShowIcon] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/players/introvideo'); 
        }, 4000);

        return () => clearTimeout(timer);
    }, [router]);
    return(
        <div className="h-screen flex items-center justify-center text-white">
            <div className="-rotate-6 text-8xl font-extrabold uppercase flex flex-col items-center">
                <p data-aos="fade-right"
                className="">Tournament</p>
                <div className='flex gap-5' data-aos="fade-right">
                    <Image src={Ball} width={150} alt='' className=''/>
                    <p className='pt-2 '>App</p>
                </div>
                <div className='pt-7 h-28'>
                    {showIcon && (
                        < i className="text-6xl fa-solid fa-spinner loading-icon"></i>
                    )}
                </div>
            </div>
        </div>
        
    )
}

export default Players; 