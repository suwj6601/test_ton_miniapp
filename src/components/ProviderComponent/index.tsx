import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import WebApp from "@twa-dev/sdk";

interface ProviderComponentProps {
  children: React.ReactNode;
}

const manifestUrl =
  "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json";

const ProviderComponent = ({ children }: ProviderComponentProps) => {
  useEffect(() => {
    if (WebApp.initDataUnsafe) {
      console.log("WebApp.initData", WebApp.initData);
      console.log("WebApp.initDataUnsafe.user", WebApp.initDataUnsafe.user);
    }
  }, []);
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Toaster position="top-right" />
      {children}
    </TonConnectUIProvider>
  );
};

export default ProviderComponent;
