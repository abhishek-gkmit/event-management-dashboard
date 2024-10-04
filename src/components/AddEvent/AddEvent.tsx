import { EventFormHelper } from "@components/EventFormHelper/EventFormHelper";

const initFormData: EventFormData = {
  title: "",
  datetime: "",
  description: "",
  attendees: 1,
  location: "",
};

export function AddEvent() {
  return <EventFormHelper initFormData={initFormData} isEdit={false} />;
}
