
export enum WeekDay {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export type Date = {
    day: number,
    month: number,
    year: number
};

export const _01_01_1900 = WeekDay.Monday;

export const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
};

export const nextDay = (date: Date): Date => {
    const isLastDayOfMonth = date.day === monthDays(date.month, date.year);
    const isLastMonth = date.month === 12;

    let month = isLastDayOfMonth ? date.month + 1 : date.month;
    let year = date.year;

    if (isLastMonth && isLastDayOfMonth) {
        month = 1;
        year++;
    }

    return {
        day: isLastDayOfMonth ? 1 : date.day + 1,
        month,
        year
    };
};

export const monthDays = (month: number, year: number): number => {
    if (month === 2 && isLeapYear(year)) {
        return 29;
    }

    return months[month - 1];
};

export const countDays = (from: Date, to: Date) => {
    let days = 0;

    for (let year = from.year; year < to.year; year++) {
        days += isLeapYear(year) ? 366 : 365;
    }

    for (let month = from.month; month < to.month; month++) {
        days += monthDays(month, to.year);
    }

    days += to.day - from.day;

    return days;
};

// this function is not necessary to solve problem 19 but it's an interesting exercise
export const dayOfTheWeek = (day: number, month: number, year: number): WeekDay => {
    if (year < 1900) {
        throw new Error(`Cannot compute the day of the week prior to January 1st 1900`);
    }

    let offset = (day - _01_01_1900 - 1) % 7;

    for (let y = 1900; y < year; y++) {
        offset += isLeapYear(y) ? 2 : 1; // 365 % 7 = 1
    }

    for (let m = 1; m < month; m++) {
        offset = (offset + monthDays(m, year)) % 7;
    }

    return (_01_01_1900 + offset) % 7;
};

// console.log(WeekDay[dayOfTheWeek(11, 10, 1998)]); // Sunday