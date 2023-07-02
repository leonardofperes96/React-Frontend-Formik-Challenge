import Header from "./components/Header";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import { Route, Routes } from "react-router-dom";
import appStore from "./store/vehicleStore";

function App() {
  
  useEffect(() => {
    appStore.fetchVehicles();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
