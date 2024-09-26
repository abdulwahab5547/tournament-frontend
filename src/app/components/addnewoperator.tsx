import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AddNewOperatorProps {
    closeOverlay: () => void; 
    fetchOperators: () => void; 
}

const AddNewOperator: React.FC<AddNewOperatorProps> = ({ closeOverlay, fetchOperators }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/save-operator', {
            name,
            email,
          });
      
          if (response.status === 201) {
            toast.success('Operator added and code sent to their email!');
            fetchOperators();
            closeOverlay();
          }
        } catch (error: any) {
          if (error.response) {
            toast.error(error.response.data.message || 'An error occurred while adding operator.');
          } else {
            toast.error('An error occurred while adding operator.');
          }
        }
      };

    return(
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 px-12 py-10 items-center">
                
                <div className="pb-1">
                    <input
                        placeholder="Enter Operator Name"
                        type="text"
                        className="text-center text-xl text-gray-800 py-3 w-80 rounded-xl"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                />
                </div>
                <div className="pb-5">
                    <input
                        placeholder="Enter Operator Email"
                        className="text-center text-xl text-gray-800 py-3 w-80 rounded-xl"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                />
                </div>
                <button type="submit" className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                    Send Code
                </button>
                <button onClick={closeOverlay} className='bg-darkOrange shadow-xl text-xl py-3 font-bold w-72 px-2 rounded-full '>
                    Cancel
                </button>
                
            </div>
        </form>
    )
}

export default AddNewOperator;