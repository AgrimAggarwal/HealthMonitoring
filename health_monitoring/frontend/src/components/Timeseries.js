import React, { useRef, useCallback } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Timeseries = () => {
  const refChart = useRef(null);

  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-healthmonitoring-irkwy",
  });

  const chart = sdk.createChart({
    chartId: "6407c021-5b50-45b7-b59c-36d3739e26a9",
    width: 640,
    height: 400,
    theme: "dark",
  });

  const renderChart = useCallback(
    async (ref) => {
      try {
        await chart.render(ref);
      } catch (e) {
        console.error(e);
      }
    },
    [chart]
  );

  const setRefChart = useCallback(
    (ref) => {
      if (ref) {
        renderChart(ref);
      }
      // Save a reference to the node
      refChart.current = ref;
    },
    [renderChart]
  );

  const RefreshButton = (e) => {
    chart.refresh();
  };
  return (
    <div>
      <div className="charts">
        <div id="barChart" ref={setRefChart}></div>
        <button onClick={RefreshButton}>Refresh</button>
      </div>
    </div>
  );
};

export default Timeseries;
