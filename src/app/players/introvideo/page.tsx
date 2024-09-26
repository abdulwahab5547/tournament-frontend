"use client"

import { useState } from "react";
import ReactPlayer from "react-player";

import ButtonLeft from "@/app/components/btnleft";
import ButtonRight from "@/app/components/btnright";

function IntroVideo(){
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };
    return(
        <div className="relative h-screen flex flex-col items-center justify-center text-white">
            <div className="pb-10">
                <p className="text-6xl font-bold shadow-">Watch Video To Continue</p>
            </div>
            <div className="border-8 border-stone-900 bg-white w-[70%] h-[70%] flex justify-center items-center">
                {isPlaying ? (
                    <ReactPlayer 
                        url="https://www.youtube.com/watch?v=KLuTLF3x9sA" 
                        playing={true}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                ) : (
                    <div 
                        className="rounded-full bg-orange w-20 h-20 flex justify-center items-center cursor-pointer"
                        onClick={handlePlay}
                    >
                        <i className="fa-solid fa-play text-white text-5xl pl-1"></i>
                    </div>
                )}
            </div>

            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route="/players/start"/>
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight route="/players/qr" />
            </div>
        </div> 
    )
}

export default IntroVideo;