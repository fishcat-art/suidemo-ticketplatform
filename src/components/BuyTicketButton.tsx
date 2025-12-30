import {
  useCurrentWallet,
  useSuiClient,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const TICKET_PRICE = 1_000_000; // 必須與 Move 常數一致

export default function BuyTicketButton() {
  const suiClient = useSuiClient();
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  if (connectionStatus !== 'connected' || !currentWallet) {
    return <button disabled>Connect Wallet</button>;
  }

  const account = currentWallet.accounts[0];
  if (!account) return null;

  const onBuy = async () => {
    // 1️⃣ 查詢使用者的 SUI coins
    const coins = await suiClient.getCoins({
      owner: account.address,
      coinType: '0x2::sui::SUI',
    });

    if (!coins.data.length) {
      alert('No SUI coins found');
      return;
    }

    const coin = coins.data[0];

    // 2️⃣ 建立交易
    const tx = new Transaction();

    // 從 gas / coin 拆出付款金額
    const [payment] = tx.splitCoins(tx.object(coin.coinObjectId), [
      tx.pure.u64(TICKET_PRICE),
    ]);

    // 3️⃣ event_id（vector<u8>）
    const eventIdBytes = new TextEncoder().encode('sui-dev-meetup');

    // 4️⃣ metadata_uri（暫時用假資料，之後會換成 Walrus）
    const metadataUrl = 'walrus://demo-ticket-metadata';

    // 5️⃣ 呼叫 Move buy_ticket
    tx.moveCall({
      target: `${PACKAGE_ID}::ticket_nft::buy_ticket`,
      arguments: [
        tx.pure.vector('u8', Array.from(eventIdBytes)),
        tx.pure.vector(
          'u8',
          Array.from(new TextEncoder().encode(metadataUrl))
        ),
        payment,
      ],
    });

    // 6️⃣ 簽名送出
    await signAndExecute({ transaction: tx });
  };

  return <button onClick={onBuy}>Buy Ticket</button>;
}