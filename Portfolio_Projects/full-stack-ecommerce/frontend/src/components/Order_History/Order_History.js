import React, { useEffect } from "react";
import axios from "axios";
import { selectAllOrders } from "../../Redux/features/Slices/Orders/orders";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
const Order_History = () => {
  const orders = useSelector(selectAllOrders);
  return (
    <>
      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order id</th>
                <th scope="col">Total Price</th>
                <th scope="col">Placed At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr>
                    <td>
                      <div className="items">
                        <h3>{order.id}</h3>
                      </div>
                    </td>
                    <td>
                      <div className="items">
                        <h3>${order.amount_due}</h3>
                      </div>
                    </td>
                    <td>
                      <div className="items">
                        <h3>
                          {moment(order.placed_at).format("DD/MM/YYYY HH:MM")}
                        </h3>
                      </div>
                    </td>
                    <td>
                      <Link to={`/order-history/${order.id}`}>
                        More Details
                      </Link>
                    </td>

                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <h3>No Orders Yet</h3>
        </div>
      )}
    </>
  );
};

export default Order_History;
