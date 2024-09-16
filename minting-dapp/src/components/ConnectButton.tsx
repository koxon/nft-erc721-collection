import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function ConnectButton() {
  const { openConnectModal } = useConnectModal();
  return (
    <div className="no-wallet">
      <button className="primary" onClick={openConnectModal}>
        Connect Wallets
      </button>
    </div>
  );
}
