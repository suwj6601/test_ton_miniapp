import {  TonConnectUIProvider } from "@tonconnect/ui-react";
import { Toaster } from "react-hot-toast";

interface ProviderComponentProps {
  children: React.ReactNode;
}

const manifestUrl =
  "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

const ProviderComponent = ({ children }: ProviderComponentProps) => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Toaster position="top-right" />
      {children}
    </TonConnectUIProvider>
  );
};

export default ProviderComponent;
