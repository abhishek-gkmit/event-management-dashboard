interface Attendee {
  id?: number;
  name: string;
  email: string;
}

interface AttendeeProps extends Attendee {
  event: MainEvent;
  deleteAttendee: (attendeeId: number) => void;
}

interface AttendeeFormHelperProps {
  initFormData: Attendee;
  isEdit: boolean;
  eventId: number;
}

interface AttendeeListProps {
  eventId: number;
}

type AttendeeFormData = Pick<Attendee, "id" | "name" | "email">;
