"use client"; 
import { useRouter } from 'next/navigation';

type PhoneButtonLeftProps = {
    route?: string; 
};

function PhoneButtonLeft({ route }: PhoneButtonLeftProps) {
    const router = useRouter();

    const handleClick = () => {
        if (route) {
            router.push(route);
        }
    };

    return (
        <div onClick={handleClick}>
            <div className="bg-lightYellow rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <i className="fa-solid fa-arrow-left text-white text-2xl pl-1"></i>
            </div>
        </div>
    );
}

export default PhoneButtonLeft;
