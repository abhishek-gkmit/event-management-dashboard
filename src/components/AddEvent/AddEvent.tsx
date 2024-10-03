import { EventFormHelper } from "../EventFormHelper/EventFormHelper";

import "@/components/AddEvent/AddEvent.css";

const initFormData: AddEventFormData = {
  title: "",
  datetime: "",
  description: "",
  attendees: 1,
  location: "",
};

export function AddEvent() {
  return <EventFormHelper initFormData={initFormData} isEdit={false} />;
}
