import { Link } from "react-router-dom"

/**
 * The is a component for the view more/discover more buttons on the Home page.
 */

type ViewButtonProps = {
  path: string;
  direction: string;
}

const ViewButton = ({ path, direction } : ViewButtonProps ) => {
  return (
    <Link to={path} className="view-button">
      {direction} 
    </Link>
  );
}

export default ViewButton
