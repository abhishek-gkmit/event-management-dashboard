type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DashboardContextValues {
  date: string;
  eventId: string;
  setDate: (string) => void;
  selectEvent: (string) => void;
}
