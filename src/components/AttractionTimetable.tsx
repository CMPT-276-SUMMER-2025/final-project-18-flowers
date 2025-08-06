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

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const d = new Date();
    const currentDay = days[d.getDay()]; // Date object indexes from 0 to 6 for days of the week

    function getDayAndTime(dayHours: string) {
        const parts = dayHours.split(" ");
        const day = parts[0].replace(":",""); // Monday, Tuesday...
        const time = parts[1]; // 10:00 AM - 6:00 PM...
        return { day, time };
    }

    return (
        <div>
            <h2 className="attraction-sub-titles">Open Hours</h2>
            {/* Renders the opening hours one by one from the array if available, otherwise shows a message. */}
            {hours.length > 0 ? (
                <ul className="opening-hours">
                    {hours.map((dayHours, idx) => {
                        const { day, time } = getDayAndTime(dayHours);
                        return (
                            (currentDay === day) ?

                            (<li key={idx} className="flex justify-between border-b hover:bg-green-500">
                                <h3>{day}</h3>
                                <h3>{time}</h3>
                            </li>)   

                            :

                            (<li key={idx} className="flex justify-between border-b hover:bg-gray-100">
                                <h3>{day}</h3>
                                <h3>{time}</h3>
                            </li>)   
                        );
                    })}
                </ul>
            ) : (
                <p>No opening hours available for this attraction.</p>
            )}
        </div>
    );
};

export default AttractionTimetable;
