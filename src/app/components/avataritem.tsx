import SelectButton from "./selectbtn";
import Avatar from '../assets/avatar.png';
import Image from 'next/image'

function AvatarItem(){
    return(
        <div className="py-1">
            <div className="flex justify-between items-center gap-5 pb-1">
                <div>
                    <p className="text-sm">01</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Image src={Avatar} width={25} alt='avatar'/>
                    <p className="font-bold text-sm">Avatar Name</p>
                </div>
                <div>
                    <SelectButton/>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default AvatarItem;