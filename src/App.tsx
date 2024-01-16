import { useState } from 'react'
import {list} from './utils/list'
import { IoIosCloseCircleOutline } from "react-icons/io";

function App() {

  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const [suggestions, setSuggestions] = useState(list);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    const filteredList = list.filter((item) =>
      item.toLowerCase().includes(value)
    );
    setSuggestions(filteredList);
  };

  const handleSuggestionClick = (suggestion) => {
    setChips([...chips, suggestion]);
    setSuggestions(suggestions.filter((item) => item !== suggestion));
    setInputValue("");
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((item) => item !== chip));
    setSuggestions([...suggestions, chip]);
  };

  return (
    <div className='m-12'>
      <div className='flex flex-wrap gap-1 mb-2 border border-gray-600 rounded-lg '
      >
        {chips.map((chip, index) => (
          <div
            key={index}
            className=' border border-[#ccc] px-2 py-1 m-1 rounded-lg flex items-center bg-gray-200'
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
          type="text"
          id="inputBox"
          value={inputValue}
          onChange={handleInputChange}
          className='border-none outline-none'
        />
      </div>

      {suggestions.length > 0 && (
        <div className='border border[#ccc] max-h-full overflow-y-auto'>
          {suggestions.map((suggestion, index) => (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)} className='cursor-pointer hover:bg-gray-200 px-4 '>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default App
