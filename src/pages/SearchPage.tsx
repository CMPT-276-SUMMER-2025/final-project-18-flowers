import { useState } from "react";
import SearchScroll from "../components/SearchScroll";
import SearchList from "../components/SearchList";

//@ts-expect-error
const SearchPage = ({ results }) => {
  //  set the search field
  const [searchField, setSearchField] = useState("");
  // filter through place details
  const filteredResults = results.filter(
    //@ts-expect-error
    (result) => {
      return ( 
        result
        .location
        .toLowerCase()
        .includes(searchField.toLowerCase()) 
      );
    }
  )

  // handle the event change and set the target's value 
  
  //@ts-expect-error
  const handleChange = (event) => {
    setSearchField(event.target.value);
  }
  // function that displays the search list nested in scroll component 
  function searchList() {
    return (
      <SearchScroll>
        <SearchList filteredResults={filteredResults}></SearchList>
      </SearchScroll>
    );
  }

  return (
    <>
      <div className="long-search-bar-container">
          <span className="search-icon material-symbols-outlined">search</span>
          <input
            className="long-search-bar"
            type = "search" 
            placeholder = "Search People" 
            onChange = { handleChange }
          >
          </input>
          <button className="search-button bg-blue-600 rounded-4xl pt-[4px] pr-[12px] pb-[4px] pl-[12px] ml-2 text-white font-semibold">
            Search
          </button>
      </div>
      {searchList()}
    </>
  )
}

export default SearchPage;
