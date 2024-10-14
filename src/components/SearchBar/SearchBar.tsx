import { ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "./SearchBar.css";

interface SearchBarProps {
    placeholder: string;
    onSearchChange: (value: string) => void;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearchChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    };
  
    return (
      <div className="search-bar-container">
        <input
          className="search-bar"
          placeholder={placeholder}
          onChange={handleChange}
        />
        <MagnifyingGlassIcon className="search-icon" />
      </div>
    );
  };

export default SearchBar;