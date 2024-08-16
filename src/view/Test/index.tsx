import { useTonWallet, TonConnectUIContext } from "@tonconnect/ui-react";
import { useContext, useEffect, useState } from "react";
import { Address, ProviderRpcClient } from "ton-inpage-provider";

const Test = () => {
  const tonConnectUI = useContext(TonConnectUIContext);
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = async () => {
    if (tonConnectUI?.wallet) {
      try {
        const provider = new ProviderRpcClient();
        const address = new Address(tonConnectUI.wallet.account.address);
        const accountState = await provider.getFullContractState({ address });
        console.log("accountState: ", accountState);
        // const balanceTon = parseFloat(accountState.balance) / 1e9; // Convert from nanotons to tons
        // setBalance(balanceTon);
        setBalance(0);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  useEffect(() => {
    if (tonConnectUI?.wallet) {
      getBalance();
    }
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <p>Balance: {balance} TON</p>
      <button onClick={getBalance}>get</button>
    </div>
  );
};

export default Test;
