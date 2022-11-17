import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Complete_Order = () => {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const { orderid } = useParams();
  const getcompleteOrder = async () => {
    console.log("get complete order");
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orders/${orderid}`,
      { withCredentials: true }
    );
    setProducts(response.data.products);
    console.log("state of products in frontend", products);
    setOrder(response.data.order);
    console.log("state of orders in frontend", order);
  };
  useEffect(() => {
    getcompleteOrder();
  }, []);

  return (
    <>
      <div className="order-card">
        <p>{order.id}</p>
        <p>$ {order.amount_due}</p>
        {order.shipping_address ? (
          <p>order.shipping_address</p>
        ) : (
          <p>No address Provided</p>
        )}
        <p>{moment(order.placed_at).format("DD/MM/YYYY HH:MM")}</p>
      </div>
      <div>
        {products.map((product) => {
          return (
            <>
              <p>{product.product_name}</p>;
              <img src={product.product_image} />
              <p>{product.product_category}</p>;<p>{product.product_price}</p>;
            </>
          );
        })}
      </div>
    </>
  );
};

export default Complete_Order;
