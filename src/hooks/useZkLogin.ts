import { useWallet } from '@suiet/wallet-kit';
import { client, SPONSOR_KEYPAIR } from '../services/suiClient';
import { Transaction } from '@mysten/sui/transactions';

export const useZkLogin = () => {
  const { wallets } = useWallet();

  const buyTicket = async (ticketId: string, price: bigint) => {
    const tx = new Transaction();
    tx.moveCall({
      target: `TICKET_PACKAGE_ID::ticket_nft::buy_ticket`,
      arguments: [tx.object(ticketId), tx.pure(price)],
    });

    // Sponsored transaction (platform pays gas)
    const sponsorTx = new Transaction();
    sponsorTx.setSender(SPONSOR_KEYPAIR.toSuiAddress());
    sponsorTx.setGasPayment(SPONSOR_KEYPAIR.toSuiAddress(), 10000000);

    const result = await client.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      signer: SPONSOR_KEYPAIR,
    });
    return result.digest;
  };

  return { buyTicket, wallets };
};