// Note Products Components;
"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/app/styles/Page-module.css"
import Swal from 'sweetalert2'

import {
  MDBBtn,
  MDBCardImage
} from 'mdb-react-ui-kit';

const Products = () => {

  // states...!
  const [allProducts, setAllProducts] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [bukketData, setBukketData] = useState([]);

  // Note Mounted Hook;

  useEffect(() => { // for Users;

    if (localStorage.getItem("Authenticatedusers") !== null) {
      const fetchUsers = localStorage.getItem("Authenticatedusers");
      let jsonData = JSON.parse(fetchUsers);
      setAuthUser(jsonData);
      console.log("getUsers", jsonData);
    }

    else {
      localStorage.setItem("Authenticatedusers", JSON.stringify(null));
    }
  }, []);

  useEffect(() => {// for Products;

    if (localStorage.getItem("Products") !== null) {
      const fetchProducts = localStorage.getItem("Products");
      const jsonData = JSON.parse(fetchProducts);
      setAllProducts(jsonData);
      // console.log(jsonData)
    }

    else {
      localStorage.setItem("Products", JSON.stringify([]));
    }
  }, []);

  // Note Add Shopping Cart;

  const addShoppingcart = (productItems) => {
    // console.log("Shopping Cart");

    if (!authUser) {
      Swal.fire({
        title: "Oops Something Went Wrong",
        text: "USER IS NOT LOGIN PLEASE LOGIN FIRST",
        icon: "question"
      });
    }
    else if (authUser.email == "admin@gmail.com") {
      Swal.fire({
        icon: "error",
        title: "Oops... Something went wrong!",
        text: "You cannot place an order From Admin Account",
      });
    }

    else {
      console.log("Product Data", productItems);

      let isAlreadyData = false;
      let bukketClone = [...bukketData];

      for (let i = 0; i < bukketClone.length; i++) {

        if (productItems.productName == bukketClone[i].productName) {
          isAlreadyData = true;
          break;
        }

      }
      if (isAlreadyData) {
        alert(productItems.productName + "is Already Added");
      }

      else {
        bukketClone.push(productItems);
        setBukketData(bukketClone);

        // Saving orders in DB by LocalStorage;

        localStorage.setItem("YourOrder", JSON.stringify(bukketClone));


        console.log(bukketClone);
      }


    }
  }

  useEffect(() => {// for Shopping Card;

    if (localStorage.getItem("YourOrder") !== null) {
      const fetchCurrentOrder = localStorage.getItem("YourOrder");
      const jsonData = JSON.parse(fetchCurrentOrder);
      setBukketData(jsonData);
    }
  }, []);

  return (

    <>
        <div className='container  container-fluid'>
          <div className='row mt-20'>
            {
              (allProducts && allProducts.length > 0)
                ?
                (
                  allProducts.map((item, index) => {
                    return (
                      <div className="col-4" key={index}>
                        <div className="card Box-size">
                          <div class="bg-image hover-overlay" data-mdb-ripple-init data-mdb-ripple-color="light">
                            <MDBCardImage
                              src={item.productImage}
                              width={"100px"}
                              height={"250px"}
                              position='top'
                              alt='Image' />
                            <a href="#!">
                              <div className="mask" style={{ background: "rgba(251, 251, 251, 0.15)" }}></div>
                            </a>
                          </div>
                          <div className="card-body card-body1">
                            <h5 class="card-title">{item.productName}</h5>
                            <p class="card-text">{item.productDescription}</p>
                            <h5 class="card-title">{item.productPrice}</h5>
                            <div>
                              <MDBBtn onClick={() => addShoppingcart(item)}>Add To Cart</MDBBtn>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )
                :
                (
                  <h1>No Data Found</h1>
                )
            }
          </div>
        </div>
    </>
  )
}

export default Products;






// alert("You cannot place an order \n From Admin Account");