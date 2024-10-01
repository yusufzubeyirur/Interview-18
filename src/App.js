import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const useBitcoin = () => {
  const [price, setPrice] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const price = response.data.bpi.USD.rate_float;
        setPrice(price);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Hatası", error);
        setLoading(false);
      }
    };
    fetchBitcoinPrice();

    const intervalId = setInterval(fetchBitcoinPrice, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { price, loading };
};

function App() {
  const { price, loading } = useBitcoin();
  return (
    <div className="App">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <p className="price">Bitcoin Fiyatı: ${price.toFixed(2)}</p>
      )}
    </div>
  );
}

export default App;
