import { useWallet } from '@mysten/wallet-standard';
import { Transaction } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { getFullnodeUrl } from '@mysten/sui/utils';

export const useSuiWallet = () => {
  const walletState = useWallet();
  const client = new SuiClient({ url: getFullnodeUrl('testnet') });

  const connected = walletState.accounts.length > 0;
  const currentAccount = walletState.accounts[0]?.address || null;

  const connectWallet = async () => {
    const wallet = walletState.wallets[0];
    if (wallet?.features['sui:connect']) {
      await wallet.features['sui:connect']!();
    }
  };

  const buyTicket = async (escrowId: string, price: bigint) => {
    const wallet = walletState.wallets[0];
    if (!wallet?.features['sui:signAndExecuteTransaction']) {
      console.error('No wallet available');
      return null;
    }

    const tx = new Transaction();
    const [payment] = tx.splitCoins(tx.gas, [tx.pure.u64(Number(price))]);
    
    tx.moveCall({
      target: `${import.meta.env.VITE_PACKAGE_ID}::ticket_nft::buy_ticket`,
      arguments: [tx.object(escrowId), payment],
    });

    try {
      const result = await wallet.features['sui:signAndExecuteTransaction']!({
        transaction: tx,
      });
      return result.digest;
    } catch (error) {
      console.error('Transaction failed:', error);
      return null;
    }
  };

  return { connected, currentAccount, connectWallet, buyTicket, client };
};