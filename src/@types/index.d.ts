interface Attendee {
  name: string;
  email: string;
}

interface MainEvent extends EventFormData {
  id?: number;
  attendeeList?: Array<Attendee>;
}

type ObjectKey = string | number | symbol;

type AnyObject = {
  [key: ObjectKey]: any;
};
