/**
 * This is a component for the opening hours on an Attraction page. 
 */
type Props = {
  hours: string[];
};

/**
 * Converts an array of opening hours strings into a stylized section.
 * @param hours array of strings representing the opening hours 
 * @returns an stylized opening hours section
 */
const AttractionTimetable = ({ hours }: Props) => {
    return (
        <div className="opening-hours">
        <h2 className="attraction-sub-titles">Opening Hours</h2>
        { /* Renders the opening hours one by one from the array if available, otherwise shows a message. */}
        {hours.length > 0 ? (
            <ul>
            {hours.map((line, idx) => (
                <li key={idx}>{line}</li>
            ))}
            </ul>
        ) : (
            <p>No opening hours available.</p>
        )}
        </div>
    );
};

export default AttractionTimetable;
