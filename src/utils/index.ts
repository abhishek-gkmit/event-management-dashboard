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
