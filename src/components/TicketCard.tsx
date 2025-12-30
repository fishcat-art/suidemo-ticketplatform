interface TicketCardProps {
  ticketObject: any;
}

export default function TicketCard({ ticketObject }: TicketCardProps) {
  const fields = ticketObject.data?.content?.fields;

  return (
    <div style={{ border: '1px solid #ccc', padding: 12 }}>
      <p><strong>Ticket ID</strong></p>
      <p>{ticketObject.data?.objectId}</p>

      <p><strong>Event ID</strong></p>
      <p>
        {fields?.event_id
          ? new TextDecoder().decode(new Uint8Array(fields.event_id))
          : 'N/A'}
      </p>

      <p><strong>Owner</strong></p>
      <p>{fields?.owner}</p>
    </div>
  );
}