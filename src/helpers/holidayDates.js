var Holidays = require('date-holidays')
var hd = new Holidays('US');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
// const currentMonth = currentDate.getMonth() ;
// const currentDay = currentDate.getDate().toString().padStart(2, "0");
import moment, {diff} from 'moment';


export const currentHoliday = hd.getHolidays(currentYear);
export const holiday = e => {
    // const todaysDate = `${currentYear}-${currentMonth}-${currentDay}`;
    let positiveDates = new Array();
    
    for (let x of currentHoliday) {
        const one = moment(x.date)
        const two = moment(new Date())
        let newDigi = one.diff(two);

        if (newDigi > 0) {

            positiveDates.push(x)
        }
        
    }
    console.log(positiveDates[0])
    return 'hello'
}

const specialDay = {
    "01": {
        what: "New Year's Day",
        why: "First day of the year",
        date: ["01-01"],
        dateChange: false
    },
    "02": {
        what: "Martin Luther King Jr. Day",
        why: `Martin Luther King Jr Day celebrates the life and achievement of Martin Luther King Jr who is
        an influential American civil rights leader who is known for ending racial segregation and for racial
        equality in the United States.`,
        date: ["01-20"],
        dateChange: false
    },
    "03": {
        what: ["Chinese New Year", "Spring Festival", "Lunar New Year"],
        why: "Chinese New Year marks the first day of the New Year in the Chinese Calendar",
        date: ["01-25"],
        dateChange: false
    },
    "04": {
        what: "National Freedom Day",
        why: `National Freedom Day honors the day the 16th president Abraham Lincoln signing the resolution to outlaw slavery on February 1, 1865`,
        date: ["02-01"],
        dateChange: false
    
    },
    "02-02": {
        what: "Groundhog Day",
        why: "A tradition that centers on the idea of the groundhog coming out of its home to predict the weather.",
        dates: ["02-02"],
        dateChange: false
    },
    "02-14": {
        what: "Valentine's Day",
        why: "Today is a time to celebrate love.",
        dates: ["02-14"],
        dateChange: false
    },
    "02-15": {
        what: "Susan B. Anthony's Birthday",
        why: "Susan B. Anthony is USA's most prominent female civil rights leaders.",
        dates: ["02-15"],
        dateChange: false
    },
    "02-17": {
        what: ["President's Day", "Washington's Birthday"],
        why: "President's Day honors presidents of the United States, including George Washingon, USA's first president",
        dates: ["02-17"],
        dateChange: false
    },
    "03-08": {
        what: "Women's day",
        why: "Women's day help nations worldwide elminate discrimination against women.",
        dates: ["03-08"],
        dateChange: false
    },
    "03-17": {
        what: "St Patrick's Day",
        why: "St Patrick's day celebrates Irish-American culture.",
        dates: ["03-17"],
        dateChange: false
    },
    "04-12": {
        what: ["Easter Sunday", "Resurrection Sunday", "Pascha"],
        why: `Easter commemorates the resurrection of Jesus Christ`,
        dates: ["04-12-2020", "04-04-2021", "04-17-2022"],
        dateChange: true
    },
    "04-22": {
        what: "Earth Day",
        why: "Earth day demonstrate support for environmental protection",
        dates: ["04-22"],
        dateChange: false
    },
    "05-05": {
        what: "Cinco de Mayo",
        why: `Cindo de Mayo celebrates the defeat of the French army during 
        the Battle of Puebla in Mexico`,
        dates: ["05-05"],
        dateChange: false
    },
    "05-10": {
        what: "Mother's Day",
        why: "Mother's day honors the mothers and mother figures in our lives.",
        dates: ["05-10-2020", "05-09-2021", "05-08-2022"],
        dateChange: true
    },
    "05-25": {
        what: ["Memorial Day", "Decoration Day"],
        why: `Memorial Day commemorates all men and women who have died
        in military service for the United States.`,
        dates: ["05-25"],
        dateChange: false
    },
    "06-06": {
        what: "D-Day",
        why: "D-Day was the start of the campaign to end World War 2",
        dates: ["06-06"],
        dateChange: false
    },
    "06-21": {
        what: "Father's Day",
        why: "Father's day is a day to appreciate fathers and father figures in our lives.",
        dates: ["06-21-2020", "06-20-2021", "06-19-2022"],
        dateChange: true
    },
    "07-04": {
        what: ["Independence Day", "Fourth of July"],
        why: "The Four of July is an anniversary of the declaration of independence from Great Britain in 1776",
        dates: ["07-04"],
        dateChange: false
    },
    "07": {
        what: "Parent's Day",
        why: "Parent's Day marks the appreciation of the commitment parents make for their children.",
        dates: ["07-26-2020", "07-25-2021", "07-24-2022"],
        dateChange: true, 
    },
    "we": {
        what: "Women's Equality Day",
        why: `Women's Equality Day is the day the amendment granted women the right
        to vote for the first time in the year 1920`,
        dates: ["08-26"],
        dateChange: false
    },
    "lab": {
        what: "Labor Day",
        why: "Labor day celebrates labor workers that help contribute to USA's economy",
        dates: ["09-07-2020", "09-06-2021", "09-05-2022"],
        dateChange: true
    },
    "pat": {
        what: ["Patriot Day", "9/11", "September 11"],
        why: "Patriot Day is a day to remember those who were injured or died during the terrorist attack on this day in 2001",
        dates: ["09-11"],
        dateChange: false
    },
    "grand": {
        what: "National Grandparents Day",
        why: "National Grandparents Day honors grandparents in our lives",
        dates: ["09-13-2020", "09-12-2021", "09-10-2023", "09-08-2024"],
        dateChange: true
    },
    "colum": {
        what: "Columbus Day",
        why: "Columbus Day remembers Christopher Columbus's arrival to the Americas on October 12, 1492",
        dates: ["10-12"],
        dateChange: false
    },
    "hallo": {
        what: "Halloween",
        why: "Halloween is a celebration on October 31st that goes as far back as 2000 years ago",
        dates: ["10-31"],
        dateChange: false
    },
    "vet": {
        what: "Veterans Day",
        why: `Veterans day is the anniversary of the signing of the armistice, which ended
        World War 1 hostilities between the Allied nations and Germany in 1918`,
        dates: ["11-11"],
        dateChange: false
    },
    "thanks": {
        what: "Thanksgiving Day",
        why: "Thanksgiving Day is for everyone in the US to give thanks for what they have",
        dates: ["11-26-2020", "11-25-2021", "11-24-2022"],
        dateChange: true
    }


}