export type Event = {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  color?: string;
  remindMinutesBefore?: number | null;
  hasConflict?: boolean;
}
