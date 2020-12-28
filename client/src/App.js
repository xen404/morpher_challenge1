import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./styles.css";
import CryptoInput from "./CryptoInput";

function App() {
  const [assets, setAssets] = useState([]);
  const [quote, setQuote] = useState("BTC");
  const [base, setBase] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  var [isAmountQuote, setIsAmountQuote] = useState(true);


  var baseAmount, qouteAmount;
  if (isAmountQuote) {
    qouteAmount = amount;
    baseAmount = amount * exchangeRate;
  } else {
    baseAmount = amount;
    qouteAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios
      .get("/api/assets")
      .then((res) => res.data)
      .then((data) => {
        const base = data[1].asset_id;
        const quote = data[0].asset_id;
        setAssets(data);
        setBase(base);
        setQuote(quote);
      });
    getExchangeRates("USD", "BTC");
  }, []);

  function getExchangeRates(base, quote) {
    axios.get(`/api/convert/${base}/${quote}`).then((res) => {
      setExchangeRate(parseFloat(res.data.rate));
    });
  }

  function handleQuoteAmountChange(e) {
    setAmount(e.target.value);
    setIsAmountQuote(true);
  }

  function handleBaseAmountChange(e) {
    setAmount(e.target.value);
    setIsAmountQuote(false);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Crypto Converter</h1>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <CryptoInput
          amount={qouteAmount}
          onChangeAmount={handleQuoteAmountChange}
          onChangeCurrency={(e) => {
            setQuote(e.asset_id);
            getExchangeRates(base, e.asset_id);
          }}
          assets={assets}
          defaultAsset={quote}
        />
        <p>
          <b>=</b>
        </p>
        <CryptoInput
          amount={baseAmount}
          onChangeAmount={handleBaseAmountChange}
          onChangeCurrency={(e) => {
            setBase(e.asset_id);
            getExchangeRates(e.asset_id, quote);
          }}
          assets={assets}
          defaultAsset={base}
        />
      </div>
      
    </div>
  );
}

export default App;
