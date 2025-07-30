import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import "../navbar.css";

const NavBar = () => {
  return (
    <>
      <nav id="nav-clear"> 
        <div id="nav-left"><Link to="/">Taiwan Explorers</Link></div>
        <div id="nav-center">
          <ul className='nav-links'>
            <li className='nav-link'><Link to="/">Home</Link></li>
            <li className='nav-link'><Link to="/destinations">Destinations</Link></li>
            <li className='nav-link'><Link to="/interests">Interests</Link></li>
            <li className='nav-link'><Link to="/plantrip">Plan a trip</Link></li>
          </ul>
        </div>
        <div id="nav-right"><SearchBar /></div>
      </nav>
    </>
  )
}

export default NavBar
