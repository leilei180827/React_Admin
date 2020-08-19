import React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";

export default function Bar() {
  const barChartOption = () => {
    return {
      backgroundColor: "#2c343c",

      title: {
        text: "Customized Pie",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "September",
          type: "pie",
          radius: "60%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "laptop" },
            { value: 310, name: "mobile" },
            { value: 274, name: "printer" },
            { value: 235, name: "scanner" },
            { value: 400, name: "tax" },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };
  };
  return (
    <Card title="An example for ECharts" bordered>
      <ReactEcharts option={barChartOption()} />
    </Card>
  );
}
