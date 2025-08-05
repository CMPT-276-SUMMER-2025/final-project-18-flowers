import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import "../navbar.css";
import { useState } from 'react';
import NavBarSide from './NavBarSide';

const NavBar = () => {

  // used to track whether or not to open nav bar side
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    
      <NavBarSide isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav id="nav-clear"> 
        <div className="nav-left">
          <Link to="/" className='te-logo hidden lg:flex lg:ml-auto'>Taiwan Explorers</Link>
          <button className="flex justify-start lg:justify-end lg:hidden" onClick={ 
            () => {
              setIsOpen(!isOpen);
            }
          }>
            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        <div id="nav-center">
          <ul className='nav-links lg:flex hidden'>
            <li className='nav-link'><Link to="/">Home</Link></li>
            <li className='nav-link'><Link to="/destinations">Destinations</Link></li>
            <li className='nav-link'><Link to="/interests">Interests</Link></li>
            <li className='nav-link'><Link to="/plantrip">Plan a trip</Link></li>
          </ul>
          <Link to="/" className='te-logo block lg:hidden'>Taiwan Explorers</Link>
        </div>
        <div className="nav-right justify-end lg:justify-start"><SearchBar /></div>
      </nav>
    </>
  )
}

export default NavBar
