import SearchCard from "./SearchCard";

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
