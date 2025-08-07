import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/**
 * This is the component for the search bar on top right corner of every page except for Home page.
 */

/**
 * This displays a styled search bar on the page.
 * @returns an icon and a search bar
 */
const SearchBarSolid = () => {
  //Allows navigation.
  const navigate = useNavigate();
  //Initializes query(the text inside the search input) and updates the state as use types.
  const [query, setQuery] = useState("");
  //Called when the form is submitted, prevent empty input and navigates to what user searched.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar-solid-container">
      <form onSubmit={handleSubmit} className="flex items-center">
        <Link to="/search" className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>        
        </Link>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="solid-search-bar hidden md:block"
        />
      </form>
    </div>
  );
};

export default SearchBarSolid;
