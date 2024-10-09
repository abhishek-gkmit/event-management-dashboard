import { EventFormHelper } from "@components/EventFormHelper";
import { formatDate } from "@src/utils";

const initFormData: EventFormData = {
  title: "",
  datetime: "",
  description: "",
  attendees: 1,
  location: "",
};

export function AddEvent() {
  return (
    <EventFormHelper
      initFormData={{ ...initFormData, datetime: formatDate(new Date()) }}
      isEdit={false}
    />
  );
}
