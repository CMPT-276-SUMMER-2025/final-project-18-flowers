import { Link } from "react-router-dom"

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
