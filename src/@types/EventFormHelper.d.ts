interface EventFormData {
  title: string;
  datetime: string;
  description: string;
  attendees: number;
  location: string;
}

interface EventFormHelperPropTypes {
  initFormData: EventFormData;
  isEdit: boolean;
}
