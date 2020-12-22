/* global moment */
import later from '@/helpers/later';


// Note: To change Order Close hour on a particular special day
// 1. Add the day to the daily schedules structure below with the later closing time
// 2. Add the day to the isAfter1PM() function setting the new closing time

// Note: To restrict sale of specific variant on a particular special day
// 1. Edit validate.js and modify the restrict() validation function

const daily = {
    schedules: [ 
        { d: [2,3,4,5,6,7], h: [13], m: [0] },         // Weekdays: Mon, Tue, Wed, Thu, Fri, Sat at 1pm
        { D: [14], M: [2], h: [15], m: [0] },          // Valentines Day: 14th of February at ** 3pm **
        { dc: [2], d: [1], M: [5], h: [13], m: [0] },  // Mothers Day: 2nd Sunday of May at 1pm
        { D: [23], M: [12], Y: [2018], h: [13], m: [0] },         // Xmas Sunday 23rd December 2018 at 1pm
    ],
    exceptions: [
        { D: [25], M: [12], h: [13], m: [0] },              // Christmas Day: 25th of December at 1pm
        { D: [26], M: [12], h: [13], m: [0] },              // Boxing Day: 26th of December at 1pm
        { D: [27,28], M: [12], h: [13], m: [0] },           // Post Xmas Break: 27-28 Dec
        // { D: [27,28,29,30,31], M: [12], h: [13], m: [0] },         // Post Xmas Break: 27-31 Dec
        { D: [1],  M: [1], h: [13], m: [0] },               // New Years Day: 1st of January at 1pm
        { D: [2],  M: [1], h: [13], m: [0] },               // Post New Years Day Break: 2nd of January at 1pm
        { D: [26], M: [1], h: [13], m: [0] },               // Australia: 26th of January at 1pm
        { D: [27], M: [1], Y: [2020], h: [13], m: [0] },    // Australia Day Monday Holiday
        { D: [27], M: [1], Y: [2025], h: [13], m: [0] },    // Australia Day Monday Holiday
        { D: [28], M: [1], Y: [2030], h: [13], m: [0] },    // Australia Day Monday Holiday
        { D: [27], M: [1], Y: [2031], h: [13], m: [0] },    // Australia Day Monday Holiday
        // { D: [25], M: [4], h: [13], m: [0] },               // Anzac Day: 25th of April at 1pm
        { dc: [2], d: [2], M: [6], h: [13], m: [0] },       // Queens Birthday: 2nd Monday of June at 1pm
        { dc: [1], d: [2], M: [10], h: [13], m: [0] },      // NSW Labour Day: 1st Monday of October at 1pm
        // Easter Friday and Monday for the next 10 years
        { D: [19,22], M: [4], Y: [2019], h: [13], m: [0] },
        { D: [10,13], M: [4], Y: [2020], h: [13], m: [0] },
        { D: [2,5],   M: [4], Y: [2021], h: [13], m: [0] },
        { D: [15,18], M: [4], Y: [2022], h: [13], m: [0] },
        { D: [7,10],  M: [4], Y: [2023], h: [13], m: [0] },
        { D: [29],    M: [3], Y: [2024], h: [13], m: [0] }, { D: [1], M: [4], Y: [2024], h: [13], m: [0] },
        { D: [18,21], M: [4], Y: [2025], h: [13], m: [0] },
        { D: [3,6],   M: [4], Y: [2026], h: [13], m: [0] },
        { D: [26,29], M: [3], Y: [2027], h: [13], m: [0] },
        { D: [14,17], M: [4], Y: [2028], h: [13], m: [0] },
        { D: [30],    M: [3], Y: [2029], h: [13], m: [0] }, { D: [2], M: [4], Y: [2029], h: [13], m: [0] },
        { D: [19,22], M: [4], Y: [2030], h: [13], m: [0] },
    ],
};

export function nextDeliveryDays(number) {
    moment.locale();
    later.date.localTime();
    return later.schedule(daily).next(number,moment());
}

export default function deliveryDays(start, freq, number) {
    moment.locale();
    later.date.localTime();
    const startDate = moment(start,['DD-MM-YYYY','DD-MMM-YYYY']);
    if (!startDate.isValid()) return '';

    const weekly = {
        schedules: [ 
            { d: [startDate.day()+1], wm: [1,2,3,4,5,6], h: [13], m: [0] },        // Starting day of week (2-6) for every Week of the month at 1pm
        ],
    };
    const monthly = {
        schedules: [ 
            { D: [Math.min(startDate.date(),28)], M: [1,2,3,4,5,6,7,8,9,10,11,12], h: [13], m: [0] },    // Starting day of month (1-28) for every Month of the year at 1pm
        ],
    }
    const availableSchedules = {
        Daily: (number, startDate) => later.schedule(daily).next(number, startDate),
        Weekly: (number, startDate) => later.schedule(weekly).next(number, startDate),
        Fortnightly: (number, startDate) => later.schedule(weekly).next(number*2,startDate).filter((d,i) => (i%2 == 0)),
        Monthly: (number, startDate) => later.schedule(monthly).next(number, startDate),
    }

    let days = [];
    if (availableSchedules[freq]) {
        days = availableSchedules[freq](number, startDate);
        if (!Array.isArray(days)) days = [days];      // later returns a singleton instead of an array for number = 1
        days = ensureValidDays(days);
    }

    return days.map(d=>moment(d).format('DD-MMM-YYYY')).join(', ');
}

function ensureValidDays(days) {
    return days.map(d => ensureValidDay(d));
}

function ensureValidDay(d) {
    moment.locale();
    later.date.localTime();
    // if its not a valid delivery day then choose the next closest day
    const isValid = later.schedule(daily).isValid(d);
    return isValid ? d : later.schedule(daily).next(1,d);
}

// only allow valid delivery days (past or future)
export function getNextDeliveryDay(str) {
    return moment(ensureValidDay(parseDate(str).toDate())).format('DD-MMM-YYYY');
}

// only allow valid delivery days (today or in the future)
export function getNextPossibleDeliveryDay(str) {
    const d = parseDate(isBeforeToday(str) ? undefined : str).toDate();
    const v = ensureValidDay(d);
    return moment(v).format('DD-MMM-YYYY');
}

// only allow valid delivery days (today or in the future)
export function getNextPossibleDeliveryDayOfWeek() {
    const d = parseDate().toDate();
    const v = ensureValidDay(d);
    return moment(v).format('dddd');
}

export function parseDate(str) {
    let d = moment(str,['DD-MMM-YYYY','DD-MMM-YY'],true);
    if (!d.isValid()) d = moment();             // default to now if we cannot parse the date
    return d;
}

export function isToday(str) {
    return parseDate(str).isSame(moment(),'day');
}

export function isBeforeToday(str) {
    return (parseDate(str).second(1).isBefore(moment().hour(0).minute(0).second(0)));
}

// determine if its a late order eg if order delivery is for today and its after 1PM (order close)
export function isAfter1PM(str) {
    let closingHour = 13;                           // Normal closing 1PM
    if (isToday('14-Feb-2019')) closingHour = 15;   // Special closing 3PM
    return (isToday(str) && moment().isAfter(moment().hour(closingHour).minute(0).second(0)));
}

export function isValidDeliveryDay(str) {
    return later.schedule(daily).isValid(parseDate(str).hour(13).minute(0).toDate());
}

