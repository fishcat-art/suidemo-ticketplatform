export type TicketMetadata = {
  version: number;

  event: {
    eventId: string;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    organizer: string;
  };

  ticket: {
    ticketType: string;
    priceMist: number;
    serialNumber: number;
  };

  owner: {
    wallet: string;
  };

  createdAt: string;
};