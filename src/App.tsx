import { TonConnectButton } from "@tonconnect/ui-react";
import ProviderComponent from "./components/ProviderComponent";
import Test from "./view/Test";

function App() {
  return (
    <ProviderComponent>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <TonConnectButton /> */}
        <Test />
      </div>
    </ProviderComponent>
  );
}

export default App;
