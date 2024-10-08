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
  console.log("filter:", filter);
  console.log("time before filter:", time);

  switch (filter) {
    case "12":
      return formatTimeInTwelveHours(time);
    default:
      return time;
  }
}
