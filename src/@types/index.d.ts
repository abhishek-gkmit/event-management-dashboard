interface Attendee {
  name: string;
  email: string;
}

interface MainEvent extends AddEventFormData {
  id?: number;
  attendeeList?: Array<Attendee>;
}

type ObjectKey = string | number | symbol;

type AnyObject = {
  [key: ObjectKey]: any;
};
