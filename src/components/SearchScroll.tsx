/**
 * This is a component that controls the scrolling of the Search page.
 */

//@ts-expect-error
const SearchScroll = (props) => {
  return( 
    <div id="scroll-container">
      {props.children}
    </div>	
  );
}

export default SearchScroll;