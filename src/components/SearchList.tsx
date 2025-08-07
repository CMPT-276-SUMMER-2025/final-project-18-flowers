import SearchCard from "./SearchCard";

/**
 * This is a component that maps the search results as a list on the Search page.
 */

//@ts-expect-error
const SearchList = ({ filteredResults }) => {
  //@ts-expect-error
  const filtered = filteredResults.map((result) => <SearchCard key={result.id} data={result} />);

  return (
    <div>
      {filtered}
    </div>
  )
}

export default SearchList;
