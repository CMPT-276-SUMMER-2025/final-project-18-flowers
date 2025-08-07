import { Link } from 'react-router-dom';
import "../styles/navbar.css";

/**
 * This component creates responsive mobile layouts where a collapsible menu is needed for the navigation bar.
 */

type SideProp = {
  isOpen: boolean;
  setIsOpen: (open : boolean) => void;
}


/**
 * Renders a working sidebar when needed.
 * @param isOpen When isOpen is true, the overlay is visible, else invisible and not interactive
 * @returns a collasible menu for navigation bar
 */
const NavBarSide = ({ isOpen, setIsOpen } : SideProp) => {
  return (
    <>
      {/* 
        pointer-events-none – allows user to click through to what's under the overlay (used when hidden)
        pointer-events-auto – makes the overlay clickable (used when visible), allowing clicks on the sidebar or the dark background
      */}
      <div 
        className={`overlay ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}
      >
        <nav id="nav-side" className={isOpen ? "open" : ""}> 
          <button onClick={ () => setIsOpen(false)}>
            <svg className="close-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
      
          <ul className='nav-side-links'>
            <li className='snav-link'><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li className='snav-link'><Link to="/destinations" onClick={() => setIsOpen(false)}>Destinations</Link></li>
            <li className='snav-link'><Link to="/interests" onClick={() => setIsOpen(false)}>Interests</Link></li>
            <li className='snav-link'><Link to="/plantrip" onClick={() => setIsOpen(false)}>Plan a trip</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default NavBarSide;