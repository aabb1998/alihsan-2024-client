import React, { useEffect } from "react";
import * as echarts from "echarts";

const IncomeChart = ({ data }) => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);
    const daysArray = data?.map(item => item.day);
    const totalAmountsArray = data?.map(item => item.totalAmount);

    // ECharts option
    const option = {
      xAxis: {
        type: "category",
        data: daysArray,
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        position: function (pt) {
          return [pt[0], 130];
        },
      },
      grid: {
        left: '3%',
        right: '0%',
        bottom: '0%',
        containLabel: true
      },
      series: [
        {
          data: totalAmountsArray,
          type: "bar",
          itemStyle: {
            color: "#f1c40f",
          },
        },
      ],
    };

    // Set ECharts option
    myChart.setOption(option);

    // Clean up on component unmount
    return () => {
      myChart.dispose();
    };
  }, [data]); // Empty dependency array means this effect will only run once after initial render

  return <div id="main" className="w-full dashboard-canvas" style={{  width: "100%", height: "400px" }}></div>;
};

export default IncomeChart;
