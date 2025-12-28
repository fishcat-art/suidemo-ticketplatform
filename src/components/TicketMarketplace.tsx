import { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import { useSuiWallet } from '../hooks/useWallet';

interface Props {
  userAddress: string | null;
}

interface Ticket {
  id: string;
  event: string;
  artist: string;
  date: string;
  price: bigint;
  image: string;
  escrowId: string;
}

const mockTickets: Ticket[] = [
  {
    id: '0x1',
    event: 'Sui Jazz Festival',
    artist: 'Miles Davis Tribute',
    date: '2026-01-15',
    price: 5000000000n, // 5 SUI
    image: 'https://images.unsplash.com/photo-1511671782779-cb56e135bd39?w=400',
    escrowId: '0xescrow1'
  },
  {
    id: '0x2',
    event: 'Electronic Night',
    artist: 'DJ SUI',
    date: '2026-01-20',
    price: 3000000000n, // 3 SUI
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef374e73c2?w=400',
    escrowId: '0xescrow2'
  }
];

export default function TicketMarketplace({ userAddress }: Props) {
  const [tickets, setTickets] = useState(mockTickets);
  const { buyTicket } = useSuiWallet();

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        🎟️ Available Tickets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            userAddress={userAddress}
            onBuy={buyTicket}
          />
        ))}
      </div>
    </div>
  );
}