import React from "react";
import { updateOrderStatus } from "../actions/orderActions";
import { useDispatch } from "react-redux";

export default function Order({ order }) {
  const dispatch = useDispatch();
  const submit = (e, id) => {
    dispatch(updateOrderStatus(id, e.target.value));
  };

  return (
    <tr>
      <td>
        <p>{order._id}</p>
        <div>
          {order.orderItems.map((item) => {
            return (
              <>
                <p>
                  {item.name}-{item.quantity} Kg
                </p>
              </>
            );
          })}
        </div>
      </td>
      <td>{order.user && order.user.name}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.shippingAddress.address}</td>
      <td>₹{order.orderTotal}</td>

      <td>
        <select name="status" onChange={(e) => submit(e, order._id)}>
          <option value="Placed" selected={order.status === "Placed"}>
            Placed
          </option>
          <option value="Confirmed" selected={order.status === "Confirmed"}>
            Confirmed
          </option>
          <option value="Prepared" selected={order.status === "Prepared"}>
            Prepared
          </option>
          <option value="Delivered" selected={order.status === "Delivered"}>
            Delivered
          </option>
          <option value="Completed" selected={order.status === "Completed"}>
            Completed
          </option>
        </select>
      </td>
    </tr>
  );
}
