interface EventFormData {
  title: string;
  datetime: string;
  description: string;
  attendees: number;
  location: string;
}

interface FormHelperPropTypes {
  initFormData: EventFormData;
  isEdit: boolean;
}
