import { Link } from 'react-router-dom';
import SearchBarSolid from './SearchBarSolid';
import "../navbar.css";

const NavBarSolid = () => {
  return (
    <>
      <nav id="nav-solid"> 
        <div id="nav-left"><Link to="/">Taiwan Explorers</Link></div>
        <div id="nav-center">
          <ul className='nav-links'>
            <li className='nav-link'><Link to="/">Home</Link></li>
            <li className='nav-link'><Link to="/destinations">Destinations</Link></li>
            <li className='nav-link'><Link to="/interests">Interests</Link></li>
            <li className='nav-link'><Link to="/plantrip">Plan a trip</Link></li>
          </ul>
        </div>
        <div id="nav-right"><SearchBarSolid /></div>
      </nav>
    </>
  )
}

export default NavBarSolid
