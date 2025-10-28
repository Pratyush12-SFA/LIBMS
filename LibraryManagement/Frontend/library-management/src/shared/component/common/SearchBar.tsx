import { useState } from "react";

interface SearchBarProps{
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery ] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };
    return(
        <form onSubmit = {handleSubmit}
        className="Search-form">
            <input 
            type="text"
            placeholder = "Search..."
            value = {query}
            onChange={handleChange}
            className="Search-input" />
            <button type="submit" className="Search-button">Search</button>
        </form>
    );
};

export default SearchBar;