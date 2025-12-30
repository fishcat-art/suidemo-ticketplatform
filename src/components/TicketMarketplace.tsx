import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import TicketCard from './TicketCard';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;

export default function TicketMarketplace() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account) return;

    const loadTickets = async () => {
      setLoading(true);

      const res = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: {
          StructType: `${PACKAGE_ID}::ticket_nft::Ticket`,
        },
        options: {
          showContent: true,
        },
      });

      setTickets(res.data);
      setLoading(false);
    };

    loadTickets();
  }, [account, suiClient]);

  if (!account) {
    return <p>Please connect your wallet</p>;
  }

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (tickets.length === 0) {
    return <p>You don’t own any tickets yet.</p>;
  }

  return (
    <div>
      <h2>My Tickets</h2>
      <div style={{ display: 'grid', gap: 16 }}>
        {tickets.map((obj) => (
          <TicketCard
            key={obj.data?.objectId}
            ticketObject={obj}
          />
        ))}
      </div>
    </div>
  );
}