import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "./App.css";

function App() {
  // const [items, setItems] = useState([]);
  const [chartData, setChartData] = useState({});

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const result = await axios(
  //       "http://localhost:5000/devicetransaction/alert/safe"
  //     );
  //     console.log(result.data);
  //     setItems(result.data);
  //   };

  //   fetchItems();
  // }, []);

  const chart = () => {
    let safe = [];
    let unsafe = [];
    axios
      .get(
        "http://localhost:5000/devicetransaction/alert/safe/5fb4da5ffbe3f663ecfce703"
      )
      .then((res) => {
        console.log(res);
        for (const dataObj of res.data) {
          safe.push(dataObj.totalsafe);
          unsafe.push(dataObj.unsafe);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setChartData({
      labels: ["Safe", "Unsafe"],
      datasets: [
        {
          label: "Pie chart",
          data: [safe, unsafe],
          backgroundColor: ["#B21F00", "#C9DE00"],
          hoverBackgroundColor: ["#501800", "#4B5000"],
          borderWidth: 4,
        },
      ],
    }).catch((err) => {
      console.log(err);
    });
    console.log(safe, unsafe);
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <Pie data={chartData} />
    </div>
  );
}

export default App;
