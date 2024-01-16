import React, { useState, ChangeEvent } from 'react';
import { list } from '../utils/list';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(list);
 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filteredList = list.filter(
      (item) => item.toLowerCase().includes(value) && !chips.includes(item)
    );
    setSuggestions(filteredList);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChips([...chips, suggestion]);
    setSuggestions(suggestions.filter((item) => item !== suggestion));
    setInputValue('');
  };

  const handleChipRemove = (chip: string) => {
    setChips(chips.filter((item) => item !== chip));
    setSuggestions([...suggestions, chip]);
  };
  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      // Highlight and remove the last chip
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip);
    }
  };
  return (
    <div className='m-8'>
      <div className='flex flex-wrap gap-1 py-1 mb-2 border border-gray-600 rounded'>
        {chips.map((chip, index) => (
          <div
            key={index}
            className={`border border-[#ccc] px-2 py-1 m-1 rounded-lg flex items-center ${
              index === chips.length - 1 && inputValue === '' ? 'bg-yellow-200' : 'bg-gray-200'
            }`}
          >
            {chip}
            <span
              className='ml-1 cursor-pointer'
              onClick={() => handleChipRemove(chip)}
            >
              <IoIosCloseCircleOutline size={20} />
            </span>
          </div>
        ))}
        <input
          type='text'
          id='inputBox'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleBackspace} // Handle backspace key press
          className='border-none outline-none'
        />
      </div>

      {suggestions.length > 0 && (
        <div className='border border[#ccc] max-h-full overflow-y-auto'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className='cursor-pointer hover:bg-gray-200 px-4'
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default Input;
