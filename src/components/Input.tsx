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

  return (
    <div className='m-8'>
      <div className='flex flex-wrap gap-1 py-1 mb-2 border border-gray-600 rounded'>
        {chips.map((chip, index) => (
          <div
            key={index}
            className='border border-[#ccc] px-2 py-1 m-1 rounded-lg flex items-center bg-gray-200'
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
          className='border-none outline-none ml-2'
        />
      </div>

      {suggestions.length > 0 && (
        <div className='border border[#ccc] max-h-full overflow-y-auto rounded-b-lg p-2 bg-gray-100'>
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
