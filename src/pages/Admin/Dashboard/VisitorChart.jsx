import React, { useEffect } from "react";
import * as echarts from "echarts";

const VisitorChart = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById("visitor");
    const myChart = echarts.init(chartDom);
    const monthArray = data?.map((item) => item.label);
    const countArray = data?.map((item) => item.count);
    const itemArray = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    const colorArray = ["#80FFA5"];

    const option = {
      color: colorArray,

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: itemArray,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: monthArray,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgb(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: countArray,
        },
      ],
    };

    option && myChart.setOption(option);

    // Clean up the chart when the component is unmounted
    return () => {
      myChart.dispose();
    };
  }, [data]); // Empty dependency array to run the effect only once on mount

  return (
    <div
      id="visitor"
      className="w-full "
      style={{ height: "400px" }}
    ></div>
  );
};

export default VisitorChart;
