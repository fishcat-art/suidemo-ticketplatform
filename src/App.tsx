import { useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import TicketMarketplace from './components/TicketMarketplace';
import BuyTicketButton from './components/BuyTicketButton';
import Cart from './components/Cart';
import type { Event } from './types/Event';

export default function App() {
  const [cart, setCart] = useState<Event[]>([]);
  const [checkoutEvent, setCheckoutEvent] = useState<Event | null>(null);


  const addToCart = (event: Event) => {
    setCart((prev) =>
      prev.find((e) => e.id === event.id) ? prev : [...prev, event],
    );
  };

  const removeFromCart = (eventId: string) => {
    setCart((prev) => prev.filter((e) => e.id !== eventId));
  };

  const checkout = () => {
  if (cart.length === 0) return;
  setCheckoutEvent(cart[0]); // demo：一次買一張
  setCart([]); // 清空購物車
  };

  // const checkout = () => {
  //   alert(
  //     `Checkout demo:\n\n${cart.map((e) => e.title).join('\n')}`,
  //   );
  // };

  return (
    <div style={{ padding: 40 }}>
      <h1>Sui Ticket Platform</h1>
      <ConnectButton />
      <hr />

      <TicketMarketplace onAddToCart={addToCart} />

      <Cart
        items={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
      {checkoutEvent && (
        <div
          style={{
            marginTop: 40,
            padding: 24,
            border: '2px dashed #aaa',
            borderRadius: 12,
            background: '#fafafa',
          }}
        >
          <h3>🧾 Checkout</h3>

          <p>
            <strong>Event:</strong> {checkoutEvent.title}
          </p>

          <BuyTicketButton event={checkoutEvent} />

          <button
            style={{ marginTop: 12 }}
            onClick={() => setCheckoutEvent(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}