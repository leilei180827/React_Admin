import React from "react";
import { Row, Col } from "antd";
import LinkButton from "../../components/link_button/link_button";
import "./not_found.less";
export default function Not_Found(props) {
  return (
    <Row className="not-found">
      <Col span={12} className="left"></Col>
      <Col span={12} className="right">
        <h2>Site Not Found</h2>
        <p>
          site not found well,this is awkward.The site you're looking for is not
          here.
        </p>
        <LinkButton onClick={() => props.history.replace("/home")}>
          Back Home
        </LinkButton>
      </Col>
    </Row>
  );
}
