import { Date, dayOfTheWeek, WeekDay } from "./dayOfTheWeek";

type Month = Omit<Date, 'day'>;

const nextMonth = ({ month, year }: Month): Month => {
    return {
        month: month === 12 ? 1 : month + 1,
        year: month === 12 ? year + 1 : year
    };
};

const countSundaysFallingOnTheFirstOfTheMonth = (from: Month, to: Month) => {
    let now = from;
    let sundays = 0;

    while (now.month !== to.month || now.year !== to.year) {
        now = nextMonth(now);

        if (dayOfTheWeek(1, now.month, now.year) === WeekDay.Sunday) {
            sundays++;
        }
    }

    return sundays;
};

console.log(
    countSundaysFallingOnTheFirstOfTheMonth({
        month: 1, year: 1901
    }, {
        month: 12, year: 2000
    })
);