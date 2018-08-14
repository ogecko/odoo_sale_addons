import later from '@/helpers/later';
import moment from 'moment';

const daily = {
    schedules: [ 
        { d: [2,3,4,5,6], h: [13], },           // Weekdays: Mon, Tue, Wed, Thu, Fri at 1pm
        { D: [14], M: [2], h: [13], },          // Valentines Day: 14th of February at 1pm
        { dc: [2], d: [1], M: [3], h: [13], },  // Mothers Day: 2nd Sunday of March at 1pm
    ],
    exceptions: [
        { D: [25], M: [12], h: [13], },         // Christmas Day: 25th of December at 1pm
        { D: [26], M: [12], h: [13], },         // Boxing Day: 26th of December at 1pm
        { D: [1],  M: [1], h: [13], },          // New Years Day: 1st of January at 1pm
        { D: [26], M: [1], h: [13], },          // Australia: 26th of January at 1pm
        { D: [25], M: [4], h: [13], },          // Anzac Day: 25th of April at 1pm
        { dc: [2], d: [2], M: [6], h: [13], },  // Queens Birthday: 2nd Monday of June at 1pm
        { dc: [1], d: [2], M: [10], h: [13], }, // NSW Labour Day: 1st Monday of October at 1pm
        // Easter Friday and Monday for the next 10 years
        { D: [19,22], M: [4], Y: [2019], h: [13], },
        { D: [10,13], M: [4], Y: [2020], h: [13], },
        { D: [2,5],   M: [4], Y: [2021], h: [13], },
        { D: [15,18], M: [4], Y: [2022], h: [13], },
        { D: [7,10],  M: [4], Y: [2023], h: [13], },
        { D: [29],    M: [3], Y: [2024], h: [13], }, { D: [1], M: [4], Y: [2024], h: [13], },
        { D: [18,21], M: [4], Y: [2025], h: [13], },
        { D: [3,6],   M: [4], Y: [2026], h: [13], },
        { D: [26,29], M: [3], Y: [2027], h: [13], },
        { D: [14,17], M: [4], Y: [2028], h: [13], },
        { D: [30],    M: [3], Y: [2029], h: [13], }, { D: [2], M: [4], Y: [2029], h: [13], },
        { D: [19,22], M: [4], Y: [2030], h: [13], },
    ],
};
export function next90DeliveryDays() {
    later.date.localTime();
    moment.locale();
    return later.schedule(daily).next(90,moment());
}

export default function deliveryDays(start, freq, number) {
    const startDate = moment(start,['DD-MM-YYYY','DD-MMM-YYYY']);
    if (!startDate.isValid()) return '';
    const weekly = {
        schedules: [ 
            { d: [startDate.day()+1], wm: [1,2,3,4,5,6], h: [13], },        // Starting day of week (2-6) for every Week of the month at 1pm
        ],
    };
    const monthly = {
        schedules: [ 
            { D: [Math.min(startDate.date(),28)], M: [1,2,3,4,5,6,7,8,9,10,11,12], h: [13], },    // Starting day of month (1-28) for every Month of the year at 1pm
        ],
    }

    let days = [];
    later.date.localTime();
    if (freq =='Daily') {
        days = later.schedule(daily).next(number,startDate);
    } else if (freq == 'Weekly') {
        days = later.schedule(weekly).next(number,startDate);
        days = ensureValidDays(days);
    } else if (freq == 'Fortnightly') {
        days = later.schedule(weekly).next(number*2,startDate);
        days = days.filter((d,i) => (i%2 == 0));    // every 2nd week
        days = ensureValidDays(days);
    } else if (freq == 'Monthly') {
        days = later.schedule(monthly).next(number,startDate);
        days = ensureValidDays(days);
    }
    return days.map(d=>moment(d).format('DD-MMM-YYYY')).join(', ');
}

function ensureValidDays(days) {
    return days.map(d => ensureValidDay(d));
}

function ensureValidDay(d) {
    // if its not a valid delivery day then choose the next closest day
    return (later.schedule(daily).isValid(d) ? d : later.schedule(daily).next(1,d));
}