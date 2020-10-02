import React, { useEffect, useState } from "react";
import { Card, Button, Table, Popconfirm, message } from "antd";
import { listApi, deleteOne } from "../../../services/products";

function List(props) {
  //定义局部状态
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    listApi().then((res) => {
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
  }, []);

  const per = 5;

  const loadData = (page, per) => {
    listApi(page, per).then((res) => {
      setDataSource(res.products);
      setCurrentIndex(page);
    });
  };

  const columns = [
    {
      title: "No.",
      key: "_id",
      width: 80,
      align: "center",
      render: (txt, record, index) => {
        return <span>{(currentIndex - 1) * per + (index + 1)}</span>;
      },
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
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                //跳转到edit页面，传递id为参数
                props.history.push(`/admin/products/edit/${record._id}`);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this item?"
              onCancel={() => message.info("Cancel operation")}
              onConfirm={() => {
                deleteOne(record._id)
                  .then((res) => {
                    loadData(1, per);
                    message.success("Delete success.");
                  })
                  .catch((err) => console.log(err));
              }}
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
        pagination={{
          total,
          defaultPageSize: per,
          onChange: loadData,
        }}
      />
    </Card>
  );
}

export default List;
