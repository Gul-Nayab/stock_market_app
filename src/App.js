import React, { useEffect } from "react";
import { useState } from "react";

const API_KEY = "cplgg09r01qjtk549ht0cplgg09r01qjtk549htg";
const API_ENDPOINT = "https://finnhub.io/api/v1";

const App = () => {
  const [ticker, setTicker] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  //for the API
  const [stockInfo, setStockInfo] = useState([]);
  //for the interval
  const [intervalTime, setIntervalTime] = useState(null);

  const fetchData = async () => {
    if (ticker) {
      try {
        const url = `${API_ENDPOINT}/quote?symbol=${ticker}&token=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        setStockInfo((prevData) => [...prevData, data]);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    }
  };

  const handleTickerChange = (event) => {
    setTicker(event.target.value.toUpperCase());
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
    fetchData();
    if (intervalTime) {
      clearInterval(intervalTime);
    }
    const newIntervalTime = setInterval(
      fetchData,
      (parseInt(minute) * 60 + parseInt(second)) * 1000
    );
    setIntervalTime(newIntervalTime);
    //clear();
  };

  const clear = () => {
    if (setTicker !== "" && setMinute !== "" && setSecond !== "") {
      //setTicker("");
      setMinute("");
      setSecond("");
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  // function convertDate(timestamp) {
  //   var millisecondTimestamp = new Date(timestamp * 1000);
  //   var year = millisecondTimestamp.getFullYear();
  //   var month = millisecondTimestamp.getMonth() + 1;
  //   var date = millisecondTimestamp.getDate();
  //   var hour = millisecondTimestamp.getHours();
  //   var min = millisecondTimestamp.getMinutes();
  //   var sec = millisecondTimestamp.getSeconds();
  //   var time =
  //     month + "-" + date + "-" + year + " " + hour + ":" + min + ":" + sec;
  //   return time;
  // }
  function convertDate(timestamp) {
    //const [dateString, setDateString] = useState('');

    const myDate = new Date(timestamp * 1000);
    var time = `${myDate.toLocaleString()}`;

    return time;
  }
  // const [time, setTime] = useState();
  //

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(new Date());
  //   }, intervalTime);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="App">
      <div className="Input">
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
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <div className="Data Table">
        <table>
          <thead>
            <tr>
              <th>Current Price</th>
              <th>Highest</th>
              <th>Lowest</th>
              <th>Open</th>
              <th>Previous Close</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {stockInfo.map((data, index) => (
              <tr key={index}>
                <td>{data.c}</td>
                <td>{data.h}</td>
                <td>{data.l}</td>
                <td>{data.o}</td>
                <td>{data.pc}</td>
                <td>{convertDate(data.t)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
