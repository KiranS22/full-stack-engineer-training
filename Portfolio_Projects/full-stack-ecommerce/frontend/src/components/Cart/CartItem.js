import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFromCart,
  updateQty,
  selectCartTotal,
} from "../../Redux/features/Slices/Cart/Cart";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(item.quantity);

  const updateCartQuantity = (e, id) => {
    setItemQuantity(e.target.value);
    dispatch(updateQty({ id: id, value: e.target.value }));
  };
  const deleteSingleItemInDb = async (id) => {
    const respponse = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/cart/${id}`,
      { withCredentials: true }
    );
  };

  const deleteItem = (id) => {
    deleteSingleItemInDb(id);
    dispatch(deleteFromCart(id));
  };
  return (
    <tr>
      <td>
        <div className="items">
          <h3>{item.name}</h3>
          {item.image ? (
            <img src={item.image} style={{ maxWidth: "140px" }} />
          ) : (
            <img
              src="https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6"
              alt={item.description}
              style={{ maxWidth: "140px" }}
            />
          )}
        </div>
      </td>
      <td>
        {" "}
        <div className="inner_container">
          <input
            type="number"
            min={1}
            onChange={(e) => updateCartQuantity(e, item.id)}
            className="form-control w-50"
            value={itemQuantity}
          />
        </div>
      </td>
      <td>
        <h4>${(Number(item.price) * itemQuantity).toFixed(2)}</h4>
      </td>
      <td>
        <i
          className="far fa-trash-alt"
          onClick={() => deleteItem(item.id)}
          type="button"
          style={{ color: "red", fontSize: "25px" }}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
