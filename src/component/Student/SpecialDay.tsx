import React, {useState, useEffect} from 'react';
import {holiday} from '../../helpers/holidayDates'

export default function SpecialDay() {
    const [fromHoliday, setSpecialDay] = useState(holiday())
    const [holidayName, setHolidayName] = useState(null)


    useEffect(() => {

        let name = fromHoliday.what
        if (Array.isArray(name)) {
            
            setHolidayName(name[Math.floor(Math.random() * name.length)])
        } else {
            setHolidayName(fromHoliday.what)
        }

    }, [])
    return (
        <div className="special-day-container">
            {holidayName} is coming in {fromHoliday.between} days.
    <p>{fromHoliday.why}</p>
        </div>
    )
}