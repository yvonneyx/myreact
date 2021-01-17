import React from "react";
import { Card, List, Typography, Button } from "antd";
import { connect } from "react-redux";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function Notice(props) {
  return (
    <Card
      title="Notification Center"
      extra={
        !props.isAllRead && (
          <Button onClick={() => props.dispatch({ type: "READ_ALL" })}>
            Mark all as read
          </Button>
        )
      }
    >
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ display: "flex", alignContent: "space-between" }}>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
            <Button size="small">Mark as read</Button>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default connect((state) => state)(Notice);
