import { HashLink } from 'react-router-hash-link';

const NavBarAnchor = () => {
  return (
    <>
      <nav id="nav-anchor"> 
        <div>
          <ul>
            <li><HashLink to="/#ci-overview">Overview</HashLink></li>
            <li><HashLink to="/#ci-attractions">Attractions</HashLink></li>
            <li><HashLink to="/#ci-restaurants">Restaurants</HashLink></li>
            <li><HashLink to="/#ci-hotels">Hotels</HashLink></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBarAnchor
