export interface IEvent {
    id: number;
    eventName: string;
    eventType: string;
}

export const eventTypes: string[] = ["Activity", "Concert/Play", "Conference", "Hotel", "Museum", "Restaurant", "Site", "Tour", "Visit", "Work Trip"];