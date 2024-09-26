"use client"; 
import { useRouter } from 'next/navigation';

type ButtonLeftProps = {
    route?: string; 
};

function ButtonLeft({ route }: ButtonLeftProps) {
    const router = useRouter();

    const handleClick = () => {
        if (route) {
            router.push(route);
        }
    };

    return (
        <div onClick={handleClick}>
            <div className="bg-lightYellow rounded-full flex items-center justify-center w-[70px] h-[70px] cursor-pointer">
                <i className="fa-solid fa-arrow-left text-white text-4xl pl-1"></i>
            </div>
        </div>
    );
}

export default ButtonLeft;