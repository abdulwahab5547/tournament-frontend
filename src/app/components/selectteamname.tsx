import React from 'react';

interface SelectTeamNameProps {
    teamName?: string; 
    isSelected: boolean; // Prop to indicate if the team is selected
    onSelect: (selected: boolean) => void; // Callback to handle selection
}

const SelectTeamName: React.FC<SelectTeamNameProps> = ({ teamName, isSelected, onSelect }) => {
    return (
        <div className="">
            <div className="bg-white border-gray-500 custom-padding-selectteamname flex justify-between items-center w-72 rounded-2xl shadow-xl p-2">
                <p className="text-red-700 font-bold text-xl py-2">
                    {teamName || 'Team-X Name'}
                </p>
                <label className="custom-checkbox">
                    <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={(e) => onSelect(e.target.checked)} 
                        className="hidden" 
                    />
                    <span className={`checkmark ${isSelected ? 'checked' : ''}`} />
                </label>
            </div>
        </div>
    );
};

export default SelectTeamName;