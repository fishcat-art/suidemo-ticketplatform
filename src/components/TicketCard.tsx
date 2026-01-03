import type { Event } from '../types/Event';

interface TicketCardProps {
  event: Event;
  onAddToCart?: (event: Event) => void;
}

export default function TicketCard({
  event,
  onAddToCart,
}: TicketCardProps) {
  return (
    <div
      style={{
        width: 240,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #ddd',
        background: '#fff',
      }}
    >
      {/* Image */}
      <img
        src={event.image}
        alt={event.title}
        style={{
          width: '100%',
          height: 140,
          objectFit: 'cover',
        }}
      />

      {/* Content */}
      <div style={{ padding: 12 }}>
        <h4 style={{ margin: '4px 0' }}>{event.title}</h4>

        <p style={{ margin: '4px 0', fontSize: 13, color: '#666' }}>
          {event.date}
        </p>

        <p style={{ margin: '4px 0', fontSize: 12, color: '#999' }}>
          {event.category}
        </p>

        <button
          style={{
            marginTop: 8,
            width: '100%',
            padding: '8px 0',
            borderRadius: 6,
            border: 'none',
            background: '#111',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => onAddToCart?.(event)}
        >
          ➕ Add to Cart
        </button>
      </div>
    </div>
  );
}