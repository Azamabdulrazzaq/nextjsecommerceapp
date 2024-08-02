"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBCardTitle,
  MDBTextArea
} from "mdb-react-ui-kit";
const YourCart = () => {
  // UseRouter;
  const router = useRouter();
  // states ...!

  const [currentOrderData, setCurrentOrderData] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [user, setUsers] = useState(null);
  const [otherDetails, setOtherDetails] = useState("");

  const clearStates = () => {
    setCurrentOrderData([]);
    setOrderTotal(0);
    setOtherDetails("")

    localStorage.setItem("YourOrder", JSON.stringify([]));
  }


  useEffect(() => {// for Shopping Card;

    if (localStorage.getItem("YourOrder") !== null) {
      const fetchOrder = localStorage.getItem("YourOrder");
      const jsonData = JSON.parse(fetchOrder);
      setCurrentOrderData(jsonData);
      console.log(jsonData)
    }

    else {
      localStorage.setItem("YourOrder", JSON.stringify([]));
    }

    // Note : Fetching User;
    let fetchUser = localStorage.getItem("Authenticatedusers");
    let jsonData = JSON.parse(fetchUser);
    setUsers(jsonData);
    // console.log(jsonData);
  }, []);

  const deleteItemToShoppingCart = (productIndex) => {
    // console.log("Products Index" , productIndex);

    let fetchCurrentOrderData = [...currentOrderData];
    fetchCurrentOrderData.splice(productIndex, 1);
    setCurrentOrderData(fetchCurrentOrderData);

    // Updating DB in Local storage;
    localStorage.setItem("YourOrder", JSON.stringify(fetchCurrentOrderData));

  };

  const decreaseQuantityValue = (item, key) => {
    // console.log("Items", item, key)

    let objClone = { ...item }
    objClone.Quantity = objClone.Quantity - 1;

    let fetchOrderData = [...currentOrderData];
    fetchOrderData.splice(key, 1, objClone);
    setCurrentOrderData(fetchOrderData);

  }

  const increaseQuantityValue = (item, key) => {
    // console.log("Items", item, key)

    let objClone = { ...item }
    objClone.Quantity = objClone.Quantity + 1;

    let fetchOrderData = [...currentOrderData];
    fetchOrderData.splice(key, 1, objClone);
    setCurrentOrderData(fetchOrderData);

  }

  useEffect(() => {
    let fetchOrderData = [...currentOrderData];
    // console.log(fetchOrderData);

    let total = 0;
    for (let item of fetchOrderData) {
      // console.log("items", item);

      total = total + Number(item.productPrice * item.Quantity);
      setOrderTotal(total);
    }

    console.log("Total", total);
  }, [currentOrderData]);

  const placeAnOrder = () => {
    // console.log("Other Details");

    let fetchOrders = localStorage.getItem("OrderList");
    let jsonOrders = JSON.parse(fetchOrders);
    // console.log("All Orders" , fetchOrders);

    let bukketClone = {
      bukket: currentOrderData,
      orderTotal: orderTotal,
      otherDetails: otherDetails,
      userId: user.email,
    }
    console.log(bukketClone);

    jsonOrders.push(bukketClone);
    localStorage.setItem("OrderList", JSON.stringify(jsonOrders));
    // alert("Your order  place successfully");

    setTimeout(() => {
      router.push("/orders");
      clearStates();
    }, 1000);
  }

  return (
    <>
      <div className="d-flex justify-content-around align-items-center mt-20">
        <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
          Shopping Cart
        </MDBTypography>
        <div>
          <p className="mb-0">
            <span className="text-muted">Sort by:</span>
            <a href="#!" className="text-body">
              price <i className="fas fa-angle-down mt-1"></i>
            </a>
          </p>
        </div>
      </div>
      {
        (currentOrderData && currentOrderData.length > 0)
          ?
          (
            currentOrderData.map((item, index) => {
              return (
                <MDBContainer className="py-5 h-100" key={index}>
                  <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="10">
                      <MDBCard className="rounded-3 mb-1" >
                        <MDBCardBody className="p-4">
                          <MDBRow className="justify-content-between align-items-center">
                            <MDBCol md="2" lg="2" xl="2">
                              <MDBCardImage className="rounded-3" fluid
                                src={item.productImage}
                                alt="Cotton T-shirt" />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3">
                              <p className="lead fw-normal mb-2">{item.productName}</p>
                              <p>
                                <span className="text-muted">{item.productDescription} Size: </span>M{" "}
                                <span className="text-muted">Color: </span>Grey
                              </p>
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="2"
                              className="d-flex align-items-center justify-content-around">
                              <MDBBtn color="link" className="px-2" onClick={() => decreaseQuantityValue(item, index)}
                                disabled={item.Quantity < 2}
                              >
                                <MDBIcon fas icon="minus" />
                              </MDBBtn>

                              <MDBInput min={0} value={item.Quantity} size="sm" />
                              <MDBBtn color="link" className="px-2" onClick={() => increaseQuantityValue(item, index)}>
                                <MDBIcon fas icon="plus" />
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                              <MDBTypography tag="h5" className="mb-0" type="number">
                                {item.Quantity * Number(item.productPrice)}
                              </MDBTypography>
                            </MDBCol>
                            <MDBCol md="1" lg="1" xl="1" className="text-end" onClick={() => deleteItemToShoppingCart(index)}>
                              <a href="#!" className="text-danger"  >
                                <MDBIcon fas icon="trash text-danger" size="lg" />
                              </a>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              )
            })
          )
          :
          (<h1>Item is Not in Your Cart</h1>)
      }
      <hr />
      <MDBCard alignment='center'>
        <MDBCardBody>
          <MDBCardTitle><h2>This is a section of Total Amount</h2></MDBCardTitle>
          <MDBCardTitle><h1>Total Amount : {orderTotal} </h1></MDBCardTitle>
          <MDBCardTitle>
            <MDBTextArea
              label='Message' placeholder='Enter Your Important Details About Cart' id='textAreaExample' rows={4}
              value={otherDetails}
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </MDBCardTitle>
          <MDBCard>
            <MDBCardBody>
              <MDBBtn onClick={placeAnOrder}
                disabled={otherDetails.trim().length < 1}
                className="ms-3" color="warning" block size="lg">
                Place an Order
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCardBody>
      </MDBCard>
    </>
  )
}

export default YourCart;







