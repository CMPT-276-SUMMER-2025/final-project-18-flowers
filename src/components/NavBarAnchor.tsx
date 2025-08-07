import { HashLink } from "react-router-hash-link";
import "../styles/navbar.css";

/**
 * This is the component for the anchor link of the mid page navigation bar on Attraction page.
 */

/**
 * Creates linked text in the navigation bar.
 * @returns an unordered list of hashlink text
 */
const NavBarAnchor = () => {
  return (
    <nav className="section-nav">
      <ul>
        <HashLink smooth to="#overview" className="anchor-link">Overview</HashLink>
        <HashLink smooth to="#ai-description" className="anchor-link">Description</HashLink>
        <HashLink smooth to="#attraction-map" className="anchor-link">Map</HashLink>
        <HashLink smooth to="#hours" className="anchor-link">Hours</HashLink>
        <HashLink smooth to="#hotels" className="anchor-link">Hotels</HashLink>
        <HashLink smooth to="#restaurants" className="anchor-link">Restaurants</HashLink>
      </ul>
    </nav>
  )
}

export default NavBarAnchor
