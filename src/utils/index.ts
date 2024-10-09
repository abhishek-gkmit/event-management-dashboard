const MILISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function cloneObject(object: AnyObject): AnyObject {
  if (object === null) {
    return object;
  }

  if (Array.isArray(object)) {
    let copy = [];
    for (const value of object) {
      copy.push(cloneObject(value));
    }
    return copy;
  }

  if (typeof object === "object") {
    let copy: AnyObject = {};
    for (const key of Object.keys(object)) {
      copy[key] = cloneObject(object[key]);
    }
    return copy;
  }

  return object;
}

function formatTimeInTwelveHours(time: string) {
  let newTime = "";
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    newTime += hours;
  } else if (hours === "0") {
    newTime += "01";
  } else {
    newTime += ((+hours % 12) + "").padStart(2, "0");
  }

  newTime += ":";
  newTime += minutes;

  if (+hours >= 12) {
    newTime += " PM";
  } else {
    newTime += " AM";
  }

  return newTime;
}

export function formatDateWithFilter(datetime: string, filter: string): string {
  const date = datetime.split("T")[0];
  const [year, month, day] = date.split("-");

  switch (filter) {
    case "mm-dd-yyyy":
      return `${month.padStart(2, "0")}-${day.padStart(2, "0")}-${year}`;
    default:
      return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }
}

export function formatTimeWithFilter(datetime: string, filter: string): string {
  // this function is assuming that the time is in by default 24-hour format, and it literally is
  const time = datetime.split("T")[1];

  switch (filter) {
    case "12":
      return formatTimeInTwelveHours(time);
    default:
      return time;
  }
}

function getWeekEndDate(date: Date): Date {
  // getDay() will return the day of week starting from 0 and sunday is first day of the week
  const remainingDaysInWeek = 7 - (date.getDay() + 1);
  return new Date(
    // +date converts date into miliseconds
    +date + MILISECONDS_IN_A_DAY * remainingDaysInWeek,
  );
}

function getMonthEndDate(date: Date): Date {
  // getDay() will return the day of week starting from 0 and sunday is first day of the week
  const remainingDaysInMonth = DAYS_IN_MONTHS[date.getMonth()] - date.getDate();
  // +date converts date into miliseconds
  return new Date(+date + MILISECONDS_IN_A_DAY * remainingDaysInMonth);
}

export function filterEventsWithFilter(
  events: MainEvent[],
  date: Date,
  filter: string,
): MainEvent[] {
  // removing time for better comparison
  date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  switch (filter) {
    case "this-week":
      return events.filter(({ datetime }) => {
        // + is used here to convert the date objects into number(miliseconds) to compare them
        const eventDate = new Date(datetime.split("T")[0] + "T00:00");
        return +date <= +eventDate && +eventDate <= +getWeekEndDate(date);
      });

    case "this-month":
      return events.filter(({ datetime }) => {
        // + is used here to convert the date objects into number(miliseconds) to compare them
        const eventDate = new Date(datetime.split("T")[0] + "T00:00");
        return +date <= +eventDate && +eventDate <= +getMonthEndDate(date);
      });

    default:
      return events.filter(({ datetime }) => {
        // + is used here to convert the date objects into number(miliseconds) to compare them
        return (
          +new Date(datetime.split("T")[0] + "T00:00") ===
          +new Date(date.getFullYear(), date.getMonth(), date.getDate())
        );
      });
  }
}

export function sortEvents(events: MainEvent[], sortBy: string): MainEvent[] {
  switch (sortBy) {
    case "attendees":
      events.sort(function sortEvents(
        { attendees: attendeesA },
        { attendees: attendeesB },
      ) {
        if (attendeesA === attendeesB) {
          return 0;
        } else if (attendeesA > attendeesB) {
          return 1;
        }
        return -1;
      });
      break;

    case "name":
      events.sort(function sortEvents({ title: titleA }, { title: titleB }) {
        if (titleA === titleB) {
          return 0;
        } else if (titleA > titleB) {
          return 1;
        }
        return -1;
      });
      break;

    default:
      events.sort(function sortEvents(eventA, eventB) {
        const dateA = new Date(eventA.datetime);
        const dateB = new Date(eventB.datetime);
        if (+dateA === +dateB) {
          return 0;
        } else if (dateA > dateB) {
          return 1;
        }
        return -1;
      });
  }
  return events;
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}
