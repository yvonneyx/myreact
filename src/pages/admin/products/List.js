import React, { useEffect, useState } from "react";
import { Card, Button, Table, Popconfirm, message } from "antd";
import { listApi, deleteOne, modifyOne } from "../../../services/products";
import { serverUrl } from "../../../utils/config";
import "./list.css";

function List(props) {
  //定义局部状态
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    listApi().then((res) => {
      setDataSource(res.products);
      setTotal(res.totalCount);
    });
  }, []);

  const per = 2;

  const loadData = (page, per) => {
    listApi(page, per).then((res) => {
      setDataSource(res.products);
      setCurrentPage(page);
    });
  };

  const columns = [
    {
      title: "No.",
      key: "_id",
      width: 80,
      align: "center",
      render: (txt, record, index) => {
        return <span>{(currentPage - 1) * per + (index + 1)}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Photo",
      dataIndex: "coverImg",
      render: (txt, record) =>
        record.coverImg ? (
          <img
            src={serverUrl + record.coverImg}
            alt={record.name}
            style={{ width: "120px" }}
          />
        ) : (
          "Not set"
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "On Sale",
      dataIndex: "onSale",
      render: (txt, record) => (record.onSale ? "On Sale" : "Out of Stock"),
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
                    loadData(currentPage, per);
                    message.success("Delete success.");
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <Button type="danger" size="small" style={{ margin: "0 1rem" }}>
                Delete
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => {
                modifyOne(record._id, { onSale: !record.onSale }).then(
                  (res) => {
                    loadData(currentPage, per);
                  }
                );
                console.log("Change stock status");
              }}
            >
              {record.onSale ? "Out of Stock" : "In Stock"}
            </Button>
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
        rowClassName={(record) => (record.onSale ? "" : "bg_red")}
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
