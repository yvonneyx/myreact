import React, { useEffect, useState } from "react";
import { Card, Button, Table, Popconfirm, message } from "antd";
import { listApi } from "../../../services/products";

// const dataSource = [
//   {
//     id: 1,
//     name: "soap",
//     price: 5,
//   },
//   {
//     id: 2,
//     name: "milk",
//     price: 6,
//   },
//   {
//     id: 3,
//     name: "noodle",
//     price: 3,
//   },
// ];

function List(props) {
  //定义局部状态
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    listApi().then((res) => {
      setDataSource(res.products);
    });
  }, []);
  const columns = [
    {
      title: "No.",
      key: "_id",
      width: 80,
      align: "center",
      render: (txt, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Operation",
      render: (txt, recoed, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
				  //跳转到edit页面，传递id为参数
                props.history.push(`/admin/products/edit/${recoed._id}`);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this item?"
              onCancel={() => message.info("Cancel operation")}
              onSubmit={
                () => console.log("Yes")
                //api
              }
            >
              <Button type="danger" size="small" style={{ margin: "0 1rem" }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Card
      title="Product List"
      extra={
        <Button
          type="primary"
          size="small"
          onClick={() => props.history.push("/admin/products/edit")}
        >
          Add
        </Button>
      }
    >
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        bordered
        dataSource={dataSource}
      />
    </Card>
  );
}

export default List;
