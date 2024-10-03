interface MainEvent extends AddEventFormData {
  id?: number;
  attendeeList?: Array<Attendee>;
}

interface Attendee {
  name: string;
  email: string;
}

type ObjectKey = string | number | symbol;

type AnyObject = {
  [key: ObjectKey]: any;
};
