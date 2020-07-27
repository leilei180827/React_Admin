const menus = [
  {
    title: "home", //
    key: "/home", // path router
    icon: "home", // icon HomeOutlined
    isPublic: true,
  },
  {
    title: "products",
    key: "/products",
    icon: "appstore", //<AppstoreOutlined />
    children: [
      // sub menu
      {
        title: "category",
        key: "/category",
        icon: "bars", //<TagsOutlined />
      },
      {
        title: "product",
        key: "/product",
        icon: "tool", //<ShoppingOutlined />
      },
    ],
  },

  {
    title: "user",
    key: "/user",
    icon: "user", //UserOutlined,
  },
  {
    title: "role",
    key: "/role",
    icon: "safety", //TeamOutlined,
  },

  {
    title: "charts",
    key: "/charts",
    icon: "area-chart", //<AreaChartOutlined />
    children: [
      {
        title: "bar",
        key: "/charts/bar",
        icon: "bar-chart", //<BarChartOutlined />
      },
      {
        title: "line",
        key: "/charts/line",
        icon: "line-chart", //<LineChartOutlined />
      },
      {
        title: "pie",
        key: "/charts/pie",
        icon: "pie-chart", //<PieChartOutlined />
      },
    ],
  },
];

export default menus;
