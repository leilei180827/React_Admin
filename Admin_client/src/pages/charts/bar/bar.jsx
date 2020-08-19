import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

export default function Bar() {
  const barChartOption = () => {
    return {
      title: {
        text: "September",
      },
      tooltip: {},
      legend: {
        data: ["sell", "stock"],
      },
      xAxis: {
        data: ["laptop", "mobile", "tax", "printer", "router", "scanner"],
      },
      yAxis: {},
      series: [
        {
          name: "sell",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
        { name: "stock", type: "bar", data: [10, 25, 26, 3, 6, 17] },
      ],
    };
  };
  return (
    <Card title="An example for ECharts" bordered>
      <ReactEcharts option={barChartOption()} />
    </Card>
  );
}
