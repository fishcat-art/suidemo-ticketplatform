import { ConnectButton } from '@mysten/dapp-kit';
import TicketMarketplace from './components/TicketMarketplace';
import BuyTicketButton from './components/BuyTicketButton';

export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Sui Ticket Platform</h1>
      <ConnectButton />

      <BuyTicketButton />
      <hr />
      <TicketMarketplace />
    </div>
  );
}