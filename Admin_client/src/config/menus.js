import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShoppingOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
const menus = [
  {
    title: "home", //
    key: "/home", // path router
    icon: <HomeOutlined />, // icon HomeOutlined
    isPublic: true,
  },
  {
    title: "products",
    key: "/products",
    icon: <AppstoreOutlined />,
    children: [
      // sub menu
      {
        title: "category",
        key: "/category",
        icon: <TagsOutlined />,
      },
      {
        title: "product",
        key: "/product",
        icon: <ShoppingOutlined />,
      },
    ],
  },

  {
    title: "user",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "role",
    key: "/role",
    icon: <TeamOutlined />,
  },

  {
    title: "charts",
    key: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "bar",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "line",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "pie",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];

export default menus;
