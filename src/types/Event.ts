export type EventCategory =
  | 'Blockchain'
  | 'Music'
  | 'Theater'
  | 'Concert'
  | 'Art Exhibition';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  image: string;
}