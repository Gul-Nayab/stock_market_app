import React, { useState, useEffect } from "react";
//import Fetch from "./fetch";

function GetInput() {
  //states to manage input
  const [ticker, setTicker] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  //list of the input for the stock
  const [inputInfo, setinputInfo] = useState([]);
  //from the API
  const [interval, setInterval] = useState(null);

  //manage user input
  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  };
  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };
  const handleSecondChange = (event) => {
    setSecond(event.target.value);
  };

  //compile input
  const handleSubmit = (event) => {
    event.preventDefault();
    if (setTicker !== "" && setMinute !== "" && setSecond !== "") {
      setinputInfo([...inputInfo, { ticker, minute, second }]);

      //   if (intervalId) {
      //     clearInterval(intervalId);
      //   }
      //   const newIntervalId = setInterval(
      //     fetchStockData,
      //     (parseInt(minute) * 60 + parseInt(second)) * 1000
      //   );
      //   setIntervalId(newIntervalId);
      setTicker("");
      setMinute("");
      setSecond("");
    }
  };

  let totalTime = 0;
  const calculateInterval = () => {
    setMinute = minute * 60;
    totalTime = setMinute + setSecond;
  };

  //   const [time, setTime] = useState(new Date());
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setTime(new Date());
  //     }, totalTime * 1000);

  //     return () => clearInterval(interval);
  //   }, []);

  return (
    <div className="Input from user">
      <header>
        <h1>Enter Information of Stock</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ticker}
            onChange={handleTickerChange}
            placeholder="Ticker"
          />
          <input
            type="text"
            value={minute}
            onChange={handleMinuteChange}
            placeholder="Minute"
          />
          <input
            type="text"
            value={second}
            onChange={handleSecondChange}
            placeholder="Second"
          />
          <button type="submit">Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Minute</th>
              <th>Second</th>
            </tr>
          </thead>
          <tbody>
            {inputInfo.map((stock, index) => (
              <tr key={index}>
                <td>{stock.ticker}</td>
                <td>{stock.minute}</td>
                <td>{stock.second}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
      console.log({totalTime});
    </div>
  );
}

export default GetInput;
