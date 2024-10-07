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

export function formatTime(time: string) {
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

export function formatDate(date: string) {
  let [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}
