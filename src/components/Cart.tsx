import type { Event } from '../types/Event';

interface CartProps {
  items: Event[];
  onRemove: (eventId: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onRemove, onCheckout }: CartProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        width: 280,
        padding: 16,
        borderRadius: 12,
        border: '1px solid #ddd',
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>🛒 Cart</h3>

      {items.length === 0 && (
        <p style={{ fontSize: 13, color: '#666' }}>Cart is empty</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: 13,
          }}
        >
          <span>{item.title}</span>
          <button
            onClick={() => onRemove(item.id)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            ❌
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <button
          onClick={onCheckout}
          style={{
            marginTop: 12,
            width: '100%',
            padding: '8px 0',
            borderRadius: 6,
            border: 'none',
            background: '#111',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Checkout
        </button>
      )}
    </div>
  );
}