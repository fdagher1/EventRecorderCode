export interface IEvent {
    id: number;
    eventName: string;
    eventType: string;
    eventStart: string;
    eventEnd: string;
    eventCity: string;
    eventState: string;
    eventCountry: string;
    eventCost: string;
    eventComment: string;
}

export const eventTypes: string[] = ["Activity", "Concert/Play", "Conference", "Hotel", "Museum", "Restaurant", "Site", "Tour", "Visit", "Work Trip"];