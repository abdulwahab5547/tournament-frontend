"use client"

import ButtonLeft from '@/app/components/btnleft'
import ButtonRight from '@/app/components/btnright'
import OperatorName from '@/app/components/operatorname';
import Overlay from '@/app/components/overlay';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddNewOperator from '@/app/components/addnewoperator';
import toast from 'react-hot-toast';
import TournamentName from '@/app/components/tournamentname';

interface Operator {
    _id: string;
    name: string;
}

const OperatorControl: React.FC = () => {
    const [isAddOverlayVisible, setAddOverlayVisible] = useState<boolean>(false);
    const [operators, setOperators] = useState<Operator[]>([]);

    const openAddOverlay = () => setAddOverlayVisible(true);
    const closeAddOverlay = () => setAddOverlayVisible(false);

    const fetchOperators = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/operators');
            setOperators(response.data.operators);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOperators();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8000/api/operators/${id}`);
            toast.success("Operator deleted")
            fetchOperators();  
        } catch (err) {
            console.error('Error deleting operator:', err);
        }
    };

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-white">
            <div className="relative orange-yellow-gradient w-[52%] h-[60%] flex flex-col justify-center items-center rounded-xl pb-3">
                <div className='flex justify-center items-center pt-14 pb-10'>
                    <p className='text-4xl font-bold'>Operator Control</p>
                </div>
                <div className='flex gap-8 flex-wrap justify-center overflow-y-auto pt-4 pb-8'>
                    {operators.map((operator) => (
                        <div key={operator._id}>
                            <OperatorName name={operator.name} onDelete={() => handleDelete(operator._id)} />
                        </div>
                    ))}
                </div>
                <div className='pt-8'>
                    <button onClick={openAddOverlay} className='bg-darkOrange shadow-xl text-xl py-4 font-bold w-72 px-2 rounded-full '>
                        Add New
                    </button>
                    <Overlay isVisible={isAddOverlayVisible} onClose={closeAddOverlay}>
                        <AddNewOperator closeOverlay={closeAddOverlay} fetchOperators={fetchOperators}/>
                    </Overlay>
                </div>

                <div className="absolute -top-9">
                    <div className="bg-lightYellow p-3 px-5 rounded-xl shadow-xl">
                        <TournamentName/>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-10 left-10'>
                <ButtonLeft route='/managers/menu' />
            </div>
            <div className='absolute bottom-10 right-10'>
                <ButtonRight />
            </div>
        </div>
    );
};

export default OperatorControl;