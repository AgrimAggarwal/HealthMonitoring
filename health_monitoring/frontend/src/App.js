import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [select, setSelect] = useState("Select Device");
  const [chartData, setChartData] = useState();
  // const [dropsites, setDropSites] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        "http://localhost:5000/devicetransaction/alert/safe"
      );
      console.log(result.data);
      const devices = result.data.map((device) => ({
        device: device._id,
        count: device.count,
      }));
      console.log(devices);
      setItems(devices);
    };

    fetchItems();
  }, []);

  const onSelectChange = async (e) => {
    const deviceid = e.target.value;
    if (deviceid === "Select Device") {
      window.alert("Please choose a device.");
    } else {
      setSelect(deviceid);

      const url = `http://localhost:5000/devicetransaction/alert/safe/${deviceid}`;
      const devicedata = await axios(url);
      console.log(devicedata.data);
      const deviceslol = devicedata.data.map((dev) => ({
        device: dev._id,
        count: dev.count,
        safe: dev.totalsafe,
        unsafe: dev.unsafe,
      }));
      console.log(deviceslol);
      const pieSafe = deviceslol.map((plot) => {
        return plot.safe;
      });
      const pieUnsafe = deviceslol.map((plot) => {
        return plot.unsafe;
      });

      setChartData({
        labels: ["Safe", "Unsafe"],
        datasets: [
          {
            label: "Pie chart",
            data: [pieSafe, pieUnsafe],
            backgroundColor: ["#B21F00", "#C9DE00"],
            hoverBackgroundColor: ["#501800", "#4B5000"],
            borderWidth: 4,
          },
        ],
      });
      console.log(chartData);
    }
  };

  // useEffect(() => {
  //   const fetchItems1 = async () => {
  //     const result = await axios("http://localhost:5000/site");
  //     console.log(result.data);
  //     const sites = result.data.map((site) => ({
  //       site_name: site.sites.map((data) => {
  //         return data.name;
  //       }),
  //       // count: device.count,
  //     }));
  //     console.log(sites);
  //     setDropSites(sites);
  //   };

  //   fetchItems1();
  // }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={select} onChange={onSelectChange}>
          <MenuItem value="Select Device">Select Device</MenuItem>
          {items.map((item) => (
            <MenuItem value={item.device}>{item.device}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pie data={chartData} />
    </div>
  );
}

export default App;
