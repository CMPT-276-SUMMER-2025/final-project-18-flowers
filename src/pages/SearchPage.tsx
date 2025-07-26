import { useState } from "react";
import SearchList from "../components/SearchList";

//@ts-expect-error
const SearchPage = ({ results }) => {
  //  set the search field
  const [searchField, setSearchField] = useState("");

  const [searchShow, setSearchShow] = useState(false);

  const [searchFor, setSearchFor] = useState("...");

  // filter through place details
  const filteredResults = results.filter(
    //@ts-expect-error
    (result) => {
      const query = searchField.toLowerCase();
      return ( 
        result.location.toLowerCase().includes(query) ||
        result.name.toLowerCase().includes(query)
      );
    }
  )

  // handle the event change and set the target's value 
  
  //@ts-expect-error
  const handleChange = (event) => {
    setSearchField(event.target.value);
    if (event.target.value === "") {
      setSearchShow(false);
      setSearchFor("...");
    } else {
      setSearchShow(true);
      setSearchFor(event.target.value);
    }
  }
  // function that displays the search list nested in scroll component 
  function searchList() {
    return (
      <>
        <h1 className="search-results-title">Showing search results for <strong className="text-blue-600">{searchFor}</strong></h1>
        {searchShow ? <SearchList filteredResults={filteredResults}></SearchList> : <div><h3 id="no-results-msg">No Results</h3></div>}
      </>
    );
  }

  return (
    <>
      <h1 className="home-section-title">Search <strong>Taiwan</strong></h1>
      <div className="long-search-bar-container">
          <input
            className="long-search-bar border-blue-600 border-2"
            type = "search" 
            placeholder = "Search" 
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
