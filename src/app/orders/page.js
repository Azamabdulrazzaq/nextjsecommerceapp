"use client"
import React, {useEffect} from 'react'

const Orders = () => {

  useEffect(() => {// for Shopping Card;

    if (localStorage.getItem("OrderList") !== null) {
      const fetchOrders = localStorage.getItem("OrderList");
      const jsonData = JSON.parse(fetchOrders);
      console.log(jsonData)
    }

    else {
      localStorage.setItem("OrderList" , JSON.stringify([]));
    }
  }, []);
  return (
    <div>
      <h1>wellcome to Orders Screen!</h1>
    </div>
  )
}

export default Orders;