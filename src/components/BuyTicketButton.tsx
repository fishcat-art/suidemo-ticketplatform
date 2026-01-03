import {
  useCurrentWallet,
  useSuiClient,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { uploadTicketMetadata } from '../services/uploadTicketMetadata';
import type { TicketMetadata } from '../types/TicketMetadata';
import type { Event } from '../types/Event';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const TICKET_PRICE = 1_000_000; // 必須與 Move 合約一致

interface Props {
  event?: Event;
}

export default function BuyTicketButton({ event }: Props) {
  const suiClient = useSuiClient();
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  if (connectionStatus !== 'connected' || !currentWallet) {
    return <button disabled>Connect Wallet</button>;
  }

  const account = currentWallet.accounts[0];
  if (!account) return null;

  const onBuy = async () => {
    console.log('1. onBuy clicked');

    if (!event) {
      alert('Event data is missing');
      return;
    }

    // 1️⃣ 組 metadata（依活動動態產生）
    const metadata: TicketMetadata = {
      version: 1,
      event: {
        eventId: event.id,
        title: event.title,
        description: `${event.category} event`,
        location: 'Taipei',
        startTime: event.date,
        endTime: event.date,
        organizer: 'Ticket Platform',
      },
      ticket: {
        ticketType: 'General',
        priceMist: TICKET_PRICE,
        serialNumber: Date.now(),
      },
      owner: {
        wallet: account.address,
      },
      createdAt: new Date().toISOString(),
    };

    console.log('2. metadata ready');

    // 2️⃣ 上傳到 backend → Walrus
    const metadataUri = await uploadTicketMetadata(metadata);

    console.log('3. metadata uploaded:', metadataUri);

    // 3️⃣ 找一顆 SUI coin
    const coins = await suiClient.getCoins({
      owner: account.address,
      coinType: '0x2::sui::SUI',
    });

    if (!coins.data.length) {
      alert('No SUI coins found');
      return;
    }

    const coin = coins.data[0];

    // 4️⃣ 建立交易
    const tx = new Transaction();

    const [payment] = tx.splitCoins(tx.object(coin.coinObjectId), [
      tx.pure.u64(TICKET_PRICE),
    ]);

    const eventIdBytes = new TextEncoder().encode(event.id);
    const metadataUriBytes = new TextEncoder().encode(metadataUri);

    tx.moveCall({
      target: `${PACKAGE_ID}::ticket_nft::buy_ticket`,
      arguments: [
        tx.pure.vector('u8', Array.from(eventIdBytes)),
        tx.pure.vector('u8', Array.from(metadataUriBytes)),
        payment,
      ],
    });

    await signAndExecute({ transaction: tx });
  };

  return <button onClick={onBuy}>Buy Ticket</button>;
}

// Original GOOD CODE <Before modifying UI>
// import {
//   useCurrentWallet,
//   useSuiClient,
//   useSignAndExecuteTransaction,
// } from '@mysten/dapp-kit';
// import { Transaction } from '@mysten/sui/transactions';
// import { uploadTicketMetadata } from '../services/uploadTicketMetadata';
// import type { TicketMetadata } from '../types/TicketMetadata';

// const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
// const TICKET_PRICE = 1_000_000; // 必須與 Move 合約一致

// export default function BuyTicketButton() {
//   const suiClient = useSuiClient();
//   const { currentWallet, connectionStatus } = useCurrentWallet();
//   const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

//   if (connectionStatus !== 'connected' || !currentWallet) {
//     return <button disabled>Connect Wallet</button>;
//   }

//   const account = currentWallet.accounts[0];
//   if (!account) return null;

//   const onBuy = async () => {
//     console.log('1. onBuy clicked');

//     // 1️⃣ 組 metadata
//     const metadata: TicketMetadata = {
//       version: 1,
//       event: {
//         eventId: 'sui-dev-meetup',
//         title: 'Sui Dev Meetup',
//         description: 'Sui × Walrus Workshop',
//         location: 'Taipei',
//         startTime: new Date().toISOString(),
//         endTime: new Date().toISOString(),
//         organizer: 'Sui Taiwan',
//       },
//       ticket: {
//         ticketType: 'General',
//         priceMist: TICKET_PRICE,
//         serialNumber: Date.now(),
//       },
//       owner: {
//         wallet: account.address,
//       },
//       createdAt: new Date().toISOString(),
//     };

//     console.log('2. metadata ready');

//     // 2️⃣ 上傳到 backend → Walrus
//     const metadataUri = await uploadTicketMetadata(metadata);

//     console.log('3. metadata uploaded:', metadataUri);

//     // 3️⃣ 找一顆 SUI coin
//     const coins = await suiClient.getCoins({
//       owner: account.address,
//       coinType: '0x2::sui::SUI',
//     });

//     if (!coins.data.length) {
//       alert('No SUI coins found');
//       return;
//     }

//     const coin = coins.data[0];

//     // 4️⃣ 建立交易
//     const tx = new Transaction();

//     const [payment] = tx.splitCoins(tx.object(coin.coinObjectId), [
//       tx.pure.u64(TICKET_PRICE),
//     ]);

//     const eventIdBytes = new TextEncoder().encode('sui-dev-meetup');
//     const metadtaUriBytes = new TextEncoder().encode(metadataUri);

//     tx.moveCall({
//       target: `${PACKAGE_ID}::ticket_nft::buy_ticket`,
//       arguments: [
//         tx.pure.vector('u8', Array.from(eventIdBytes)),
//         tx.pure.vector('u8', Array.from(metadtaUriBytes)),
//         payment,
//       ],
//     });

//     await signAndExecute({ transaction: tx });
//   };

//   return <button onClick={onBuy}>Buy Ticket</button>;
// }