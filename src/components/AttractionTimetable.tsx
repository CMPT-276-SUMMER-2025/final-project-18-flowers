// src/components/AttractionTimetable.tsx
type Props = {
  hours: string[];
};

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
