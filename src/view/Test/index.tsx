import {
  CHAIN,
  THEME,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { shortenAddress } from "../../utils";
import { Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";

const Test = () => {
  const walletAddress = useTonAddress();
  const [tonConnectUI, setOption] = useTonConnectUI();
  const [refreshBalance, setRefreshBalance] = useState<boolean>(false);
  // send token
  const [walletAddressReceiver, setWalletAddressReceiver] =
    useState<string>("");
  const [amount, setAmount] = useState<string>("0");

  const [walletBalance, setWalletBalance] = useState<number>(0);
  const getWalletBalance = async (address: string) => {
    try {
      const response = await fetch(
        `https://testnet.toncenter.com/api/v2/getAddressInformation?address=${
          address || walletAddress
        }`
      );

      const data = await response.json();

      if (data.ok) {
        setWalletBalance(Number(data.result.balance) / 1e9);
      }
    } catch (error) {
      console.log("getWalletBalance error", error);
    }
  };

  // Send TON token
  const onSendToken = async () => {
    const amountSend = Number(amount);
    if (
      !walletAddressReceiver ||
      !amount ||
      amountSend <= 0 ||
      amountSend > walletBalance
    ) {
      toast.error("Invalid address or amount");
    }
    try {
      const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
          {
            address: walletAddressReceiver,
            amount: (amountSend * 1e9).toString(),
          },
        ],
        network: CHAIN.TESTNET, // make it on testnet
      };

      const txBoc = await tonConnectUI.sendTransaction(myTransaction);

      if (txBoc.boc) {
        setRefreshBalance((pre) => !pre);
        setAmount("0");
        setWalletAddressReceiver("");
      }
    } catch (error) {
      console.log("onSendToken error", error);
    }
  };

  useEffect(() => {
    tonConnectUI.connector.onStatusChange((walletInfo) => {
      if (!walletInfo) {
        setWalletBalance(0);
        setWalletAddressReceiver("");
        setAmount("0");
      }
    });
  }, []);

  useEffect(() => {
    walletAddress && getWalletBalance(walletAddress);
  }, [walletAddress, refreshBalance]);

  useEffect(() => {
    setOption({
      uiPreferences: {
        theme: THEME.LIGHT,
      },
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TonConnectButton />
      <p>Wallet address: {shortenAddress(walletAddress)}</p>
      <p>Wallet balance: {walletBalance} TON</p>

      {/* send transaction */}

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField
          placeholder="Address..."
          onChange={(e) => setWalletAddressReceiver(e.target.value)}
          size="small"
          value={walletAddressReceiver}
        />
        <TextField
          placeholder="Amount..."
          onChange={(e) => setAmount(e.target.value)}
          size="small"
          value={amount}
        />

        <Button onClick={onSendToken} variant="contained">
          Send token
        </Button>
      </div>
    </div>
  );
};

export default Test;
