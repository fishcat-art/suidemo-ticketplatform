import { useSuiWallet } from '../hooks/useWallet';

interface Props {
  onLogin: (address: string) => void;
}

export default function ZkLoginButton({ onLogin }: Props) {
  const { connected, connectWallet, currentAccount } = useSuiWallet();

  const handleLogin = async () => {
    await connectWallet();
    if (currentAccount) {
      onLogin(currentAccount);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleLogin}
        disabled={connected}
        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl"
      >
        {connected 
          ? `✅ Connected: ${currentAccount?.slice(0,6)}...${currentAccount?.slice(-4)}`
          : 'Connect Sui Wallet'
        }
      </button>
    </div>
  );
}