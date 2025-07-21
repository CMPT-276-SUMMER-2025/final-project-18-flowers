// src/components/AttractionTimetable.tsx
type Props = {
  hours: string[];
};

const saveAPICost = false;

const AttractionTimetable = ({ hours }: Props) => {
    if (saveAPICost) 
    return ( 
            <div className="opening-hours">
                <h2>Opening Hours</h2>
                <p>Opening Hours is disabled to save api cost.</p>
            </div> 
    )
    else return (
        <div className="opening-hours">
        <h2>Opening Hours</h2>
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
