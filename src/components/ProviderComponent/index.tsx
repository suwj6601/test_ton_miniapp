import { sha256 } from "@ton/crypto";
import { Contract, TonClient } from "@ton/ton";
import { TonConnect, toUserFriendlyAddress } from "@tonconnect/ui-react";
import React, { useEffect, useState } from "react";
import { WalletContractV4 } from "ton";

interface ProviderComponentProps {
  children: React.ReactNode;
}

const manifestUrl =
  "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

const connector = new TonConnect({ manifestUrl });

const tonClient = new TonClient({
  endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
});

const ProviderComponent = ({ children }: ProviderComponentProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
    const handleConnection = async (walletInfo: any) => {
      try {
        console.log("Wallet Info:", walletInfo);
        setWalletAddress(toUserFriendlyAddress(walletInfo.account.address));

        // Config ton
        const workchain = 0;
        const walletPublicKeyHex = walletInfo.account.publicKey;

        const publicKeyBuffer = await sha256(walletPublicKeyHex.toString());

        const wallet = WalletContractV4.create({
          workchain,
          publicKey: publicKeyBuffer,
        });
        setContractAddress(wallet.address.toString());

        const newWallet = {
          ...wallet,
          address: toUserFriendlyAddress(walletInfo.account.address),
        };
        let contract = tonClient.open(wallet as any);

        let balance: bigint = await contract.getBalance();
        console.log("balance: ", balance);
      } catch (error) {
        console.error("Error creating wallet instance:", error);
      }
    };

    connector.onStatusChange(handleConnection);
  }, []);

  const connectWallet = async () => {
    try {
      const connectWalletLink = connector.connect({
        universalLink: "https://t.me/wallet?attach=wallet&mode=compact",
        bridgeUrl: "https://bridge.ton.space/bridge",
      });

      window.open(connectWalletLink);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      connector.disconnect();
      setWalletAddress(null);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <div>
      {children}
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={disconnectWallet}>Disconnect Wallet</button>
      {walletAddress && (
        <p>
          Connected Wallet Address: <strong>{walletAddress}</strong>
        </p>
      )}

      {contractAddress && <p>{contractAddress}</p>}
    </div>
  );
};

export default ProviderComponent;
