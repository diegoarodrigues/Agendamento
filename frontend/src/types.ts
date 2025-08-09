export type Event = {
  id: string;
  title: string;
  start: string; // ISO
  end: string;   // ISO
  location?: string;
  description?: string;
  color?: string; // ex.: "#3b82f6"
  remindMinutesBefore?: number; // opcional
};
