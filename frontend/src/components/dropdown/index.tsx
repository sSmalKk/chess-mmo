import React, { useState } from 'react';

const Dropdown = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: 'g', label: 'G', icon: 'images/img_fi_globe.svg' },
    { value: 'l', label: 'L', icon: 'images/img_brazil.svg' },
    { value: 'p', label: 'P', icon: 'images/img_u_users_alt.svg' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value); // Envia o valor selecionado para o componente pai
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="py-2 px-4 bg-blue_gray-900_19_05 border border-black-900_60_09 rounded-5 text-white"
      >
        {selectedOption ? selectedOption.label : 'Selecionar'}
      </button>
      {isOpen && (
        <div className="absolute z-10 bottom-full left-0 mt-2 w-40 bg-white border border-gray-300 rounded-5 shadow-lg">
          <ul>
            {options.map(option => (
              <li key={option.value} onClick={() => handleOptionSelect(option)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                <img src={option.icon} alt={option.label} className="w-4 h-4" />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
