import React, { useState } from "react";
import {
  Statistic,
  Card,
  Row,
  Col,
  DatePicker,
  Space,
  Descriptions,
} from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ReactEcharts from "echarts-for-react";
import {
  lineChartOption,
  barChartOptionSales,
  barChartOptionViews,
} from "./chartOptions";
import LinkButton from "../../components/link_button/link_button";
import moment from "moment";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
export default function Home() {
  const [views, setViews] = useState(true);
  const cartTitle = (
    <Space>
      <LinkButton onClick={() => setViews(true)}>ViewsWithin</LinkButton>
      <LinkButton onClick={() => setViews(false)}>Sales</LinkButton>
    </Space>
  );
  const cardExtra = (
    <RangePicker
      defaultValue={[
        moment("2020/01/01", dateFormat),
        moment("2020/07/01", dateFormat),
      ]}
      format={dateFormat}
    />
  );
  return (
    <div style={{ minHeight: "100%", backgroundColor: "white" }}>
      <Row gutter={16}>
        <Col span={9}>
          <Card title="Total Sales">
            <Statistic value={112893} />
            <Statistic
              title="Compared to last week"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
              title="Compared to yesterday"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={15}>
          <ReactEcharts option={lineChartOption()} />
        </Col>
      </Row>
      <Card title={cartTitle} extra={cardExtra}>
        <Row gutter={16}>
          <Col span={15}>
            {views ? (
              <Card title="Statistic of Views">
                <ReactEcharts option={barChartOptionViews()} />
              </Card>
            ) : (
              <Card title="Total Sales">
                <ReactEcharts option={barChartOptionSales()} />
              </Card>
            )}
          </Col>
          <Col span={9}>
            <Card title="Popularity">
              <Descriptions layout="horizontal" column={1} bordered>
                <Descriptions.Item label="Jan">
                  Laptop ThinkPad
                </Descriptions.Item>
                <Descriptions.Item label="Feb">
                  Mobile Apple 11
                </Descriptions.Item>
                <Descriptions.Item label="Mar">
                  Mobile Apple 11 Pro
                </Descriptions.Item>
                <Descriptions.Item label="Apr">
                  Printer Brothers X57
                </Descriptions.Item>
                <Descriptions.Item label="May">
                  Plane Boeing 777
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
