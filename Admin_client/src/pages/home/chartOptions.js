export const lineChartOption = () => {
  return {
    // title: {
    //   text: "September",
    // },
    tooltip: {},
    legend: {
      x: "center",
      y: "bottom",
      data: ["laptop", "mobile"],
    },
    xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {},
    series: [
      {
        name: "laptop",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
      { name: "mobile", type: "line", data: [10, 25, 26, 3, 6, 17] },
    ],
  };
};

export const barChartOptionViews = () => {
  return {
    // title: {
    //   text: "September",
    // },
    tooltip: {},
    legend: {
      x: "center",
      y: "bottom",
      data: ["views"],
    },
    xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {},
    series: [
      {
        name: "views",
        type: "bar",
        data: [155, 201, 236, 210, 110, 220],
      },
    ],
  };
};
export const barChartOptionSales = () => {
  return {
    // title: {
    //   text: "September",
    // },
    tooltip: {},
    legend: {
      x: "center",
      y: "bottom",
      data: ["sales"],
    },
    xAxis: {
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [105, 102, 136, 110, 90, 120],
      },
    ],
  };
};
