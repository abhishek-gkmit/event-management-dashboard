type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DashboardContextValues {
  date: Date;
  eventId: string;
  setDate: (string) => void;
  selectEvent: (string) => void;
  events: MainEvent[];
  addEvent: (eventData: MainEvent) => void;
  updateEvent: (eventData: MainEvent) => void;
  deleteEvent: (eventData: MainEvent) => void;
}
