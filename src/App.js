import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  const [walletBalance, setWalletBalance] = useState(10000); // Initial hardcoded wallet balance
  const [ethPrice, setEthPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  useEffect(() => {
    // Fetch real-time Ethereum price from Coingecko API
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };

    // Fetch Ethereum price on component mount and then every 10 seconds
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 10000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleBuy = () => {
    if (ethPrice <= buyPrice) {
      setWalletBalance(walletBalance - buyPrice);
      console.log(`Bought Ethereum at ${buyPrice} USDT`);
    } else {
      console.log(`Buy order not fulfilled. Current price: ${ethPrice} USDT`);
    }
  };

  const handleSell = () => {
    if (ethPrice >= sellPrice) {
      setWalletBalance(walletBalance + sellPrice);
      console.log(`Sold Ethereum at ${sellPrice} USDT`);
    } else {
      console.log(`Sell order not fulfilled. Current price: ${ethPrice} USDT`);
    }
  };

  return (
    <div className="card">
  <h1>Crypto Stock Market POC</h1>
  <div>
    <p>Wallet Balance: {walletBalance} USDT</p>
    <p>Current Ethereum Price: {ethPrice} USDT</p>
  </div>
  <div>
    <label>Buy Ethereum at:</label>
    <input type="number" value={buyPrice} onChange={(e) => setBuyPrice(parseFloat(e.target.value))} />
    <button onClick={handleBuy}>Buy</button>
  </div>
  <div>
    <label>Sell Ethereum at:</label>
    <input type="number" value={sellPrice} onChange={(e) => setSellPrice(parseFloat(e.target.value))} />
    <button onClick={handleSell}>Sell</button>
  </div>
</div>

  );
};

export default App;
