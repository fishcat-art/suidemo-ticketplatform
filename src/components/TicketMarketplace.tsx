import { useCurrentWallet } from '@mysten/dapp-kit';
import TicketCard from './TicketCard';
import { events } from '../data/events';
import type { Event, EventCategory } from '../types/Event';

//export default function TicketMarketplace() {
export default function TicketMarketplace({
  onAddToCart,
}: {
  onAddToCart: (event: Event) => void;
}) {
  const { connectionStatus } = useCurrentWallet();

  if (connectionStatus !== 'connected') {
    return <div>Please connect wallet</div>;
  }

  // 依分類分組
  const groupedEvents = events.reduce<Record<EventCategory, Event[]>>(
    (acc, event) => {
      acc[event.category] = acc[event.category] || [];
      acc[event.category].push(event);
      return acc;
    },
    {} as Record<EventCategory, Event[]>,
  );

  // const handleAddToCart = (event: Event) => {
  //   console.log('Add to cart:', event);
  //   alert(`Added "${event.title}" to cart (demo)`);
  // };

  return (
    <div>
      {Object.entries(groupedEvents).map(([category, categoryEvents]) => (
        <section key={category} style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 16 }}>{category}</h2>

          <div
            style={{
              display: 'flex',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            {categoryEvents.map((event) => (
              <TicketCard
                key={event.id}
                event={event}
                onAddToCart={(onAddToCart)}
                //onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}