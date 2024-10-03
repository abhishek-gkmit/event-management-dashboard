import { FormHelper } from "../FormHelper/FormHelper";

import "@/components/AddEvent/AddEvent.css";

const initFormData: AddEventFormData = {
  title: "",
  datetime: "",
  description: "",
  attendees: 1,
  location: "",
};

export function AddEvent() {
  return <FormHelper initFormData={initFormData} isEdit={false} />;
}
