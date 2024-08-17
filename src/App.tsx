import ProviderComponent from "./components/ProviderComponent";
import MainPage from "./view/MainPage";

function App() {
  return (
    <ProviderComponent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <MainPage />
      </div>
    </ProviderComponent>
  );
}

export default App;
