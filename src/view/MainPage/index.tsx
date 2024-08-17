import { useIsConnectionRestored } from "@tonconnect/ui-react";
import Test from "../Test";

const MainPage = () => {
  const connectionRestored = useIsConnectionRestored();

  if (!connectionRestored) {
    return <div>Please wait to restore connection...</div>;
  }

  return <Test />;
};

export default MainPage;
