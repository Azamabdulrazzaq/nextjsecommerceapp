"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/app/styles/Page-module.css"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
  from 'mdb-react-ui-kit';

const AddProduct = () => {
  // states...!
  const [formStates, setFormStates] = useState({
    productName: "",
    productImage: "",
    productDescription: "",
    productPrice: "",
  });

  const [getProduct, setGetProduct] = useState([]);

  // Note Function to clear states...!
  const clearStates = () => {
    setFormStates({
      productName: "",
      productImage: "",
      productDescription: "",
      productPrice: "",
    })
  }
  // Note Function to Add products...!
  const addProductHandler = () => {
    // console.log(formStates);
    clearStates();
    const cloneProducts = [...getProduct];
    let objClone = {
      ...formStates,
      Quantity: 1,
    }
    cloneProducts.push(objClone);
    setGetProduct(cloneProducts);

    // Update DataBase...!

    localStorage.setItem("Products", JSON.stringify(cloneProducts));
  }

  useEffect(() => {
    const fetchProducts = localStorage.getItem("Products");
    const jsonData = JSON.parse(fetchProducts);
    setGetProduct(jsonData);
  }, []);

  return (
    <MDBContainer fluid className='container1'>

      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='9' className='my-5'>

          <h1 class="text-black mb-4">Add Products Cart</h1>

          <MDBCard>
            <MDBCardBody className='px-4'>

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 text-white">Products name</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                  <MDBInput
                    label='Product Name' size='lg' id='form1' type='text'
                    value={formStates.productName}
                    onChange={(e) => setFormStates({ ...formStates, productName: e.target.value })}
                  />
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 text-white">Product Image</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                  <MDBInput
                    label='Image Url' size='lg' id='form2' type='text'
                    value={formStates.productImage}
                    onChange={(e) => setFormStates({ ...formStates, productImage: e.target.value })}
                  />
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 text-white">Product Description</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                  <MDBTextArea
                    label='Description' id='textArea' rows={3}
                    value={formStates.productDescription}
                    onChange={(e) => setFormStates({ ...formStates, productDescription: e.target.value })}
                  />
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0 text-white">Product Price</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5 text-black'>
                  <MDBInput
                    label='Product Price' size='lg' id='form2' type="text"
                    value={formStates.productPrice}
                    onChange={(e) => setFormStates({ ...formStates, productPrice: e.target.value })}
                  />
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBBtn className='my-4' size='lg' onClick={addProductHandler} >Add Product Cart</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default AddProduct;