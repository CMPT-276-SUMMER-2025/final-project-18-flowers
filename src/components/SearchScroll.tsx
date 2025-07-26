//@ts-expect-error
const SearchScroll = (props) => {
  return( 
    <div style={{overflowY: 'scroll', height:'80vh'}}>
      {props.children}
    </div>	
  );
}

export default SearchScroll;