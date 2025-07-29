import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar-solid-container">
      <form onSubmit={handleSubmit} className="flex items-center">
        <Link to="/search">
          <span className="search-icon material-symbols-outlined">search</span>
        </Link>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="solid-search-bar"
        />
      </form>
    </div>
  );
};

export default SearchBar;
