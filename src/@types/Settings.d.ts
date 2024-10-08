interface Settings {
  timeFormat: "12" | "24" | string;
  dateFormat: "dd-mm-yyyy" | "mm-dd-yyyy" | string;
  eventListFilter: "current-day" | "this-week" | "this-month" | string;
  sortBy: "name" | "date-time" | "attendees" | string;
}
