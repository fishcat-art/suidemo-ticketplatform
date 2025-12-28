interface Ticket {
  id: string;
  event: string;
  artist: string;
  date: string;
  price: bigint;
  image: string;
  escrowId: string;
}

interface Props {
  ticket: Ticket;
  userAddress: string | null;
  onBuy: (escrowId: string, price: bigint) => Promise<string | null>;
}

export default function TicketCard({ ticket, userAddress, onBuy }: Props) {
  const handleBuy = async () => {
    const digest = await onBuy(ticket.escrowId, ticket.price);
    if (digest) {
      alert(`🎉 Ticket purchased! Tx: ${digest.slice(0, 20)}...`);
    }
  };

  const priceSui = Number(ticket.price) / 1e9;

  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative overflow-hidden rounded-2xl h-64 mb-6">
        <img 
          src={ticket.image} 
          alt={ticket.event}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          FOR SALE
        </div>
      </div>
      
      <h3 className="text-2xl font-black mb-3 line-clamp-1">{ticket.event}</h3>
      <p className="text-purple-300 text-lg font-semibold mb-2">🎤 {ticket.artist}</p>
      <p className="text-gray-300 mb-6">{ticket.date}</p>
      
      <div className="flex items-center justify-between mb-8">
        <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
          {priceSui} SUI
        </span>
        {userAddress && (
          <span className="text-xs text-gray-400">
            Owned by: {userAddress.slice(0,6)}...
          </span>
        )}
      </div>

      <button
        onClick={handleBuy}
        disabled={!userAddress}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-black text-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
      >
        {userAddress ? `Buy for ${priceSui} SUI` : 'Connect Wallet First'}
      </button>
    </div>
  );
}