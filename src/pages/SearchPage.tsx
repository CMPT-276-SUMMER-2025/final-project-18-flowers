import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchList from "../components/SearchList";
import Booking from "../components/BookingFlights";
import "../search.css";

//@ts-expect-error
const SearchPage = ({ results }) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const query = params.get("query");

  //  set the search field
  const [searchField, setSearchField] = useState(query || "");

  const [searchShow, setSearchShow] = useState(false);

  const [searchFor, setSearchFor] = useState(query);

  useEffect(() => {
    if (query) {
      setSearchField(query);
      setSearchFor(query);
      setSearchShow(true);
    }
  }, [query]);

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
    // if searchShow is true 
    const noResults = searchShow && !(filteredResults.length === 0);
    return (
      <>
        <h1 className="search-results-title">Showing search results for <strong className="text-blue-600">{searchFor}</strong></h1>
        {noResults ? <SearchList filteredResults={filteredResults}></SearchList> : <div><h3 id="no-results-msg">No Results</h3></div>}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
      <div className="home-content-container">
        <div className="home-c1">
          <h1 id="search-title">Search <strong>Taiwan</strong></h1>
          <div className="long-search-bar-container">
              <input
                className="long-search-bar border-blue-600 border-2"
                type = "search" 
                placeholder = "Search" 
                value={searchField}
                onChange = { handleChange }
              >
              </input>
              {/* <button className="search-button bg-blue-600 rounded-4xl pt-[4px] pr-[12px] pb-[4px] pl-[12px] ml-2 text-white font-semibold">
                Search
              </button> */}
          </div>
          {searchList()}
        </div>
        <div className="home-c2">
          <Booking />
        </div>
      </div>
  
      </div>
    </>
  )
}

export default SearchPage;
