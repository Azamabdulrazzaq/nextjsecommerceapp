"use client"
import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}

  from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';

const SignUp = () => {

  // States;
  const [formStates, setFormStates] = useState({
    name: "",
    email: "",
    password: "",
    repeatpassword: "",
  })
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const clearStates = () => {
    setFormStates({
      name: "",
      email: "",
      password: "",
      repeatpassword: "",
    })
  }
  const duplicatedUsers = (email) => {
    let duplicatFound = false;

    let allUsers = [...users];
    for (let items of allUsers) {
      // console.log("AllUsers", items);

      if (items.email == email) {
        duplicatFound = true;
        break;

      }
    }

    return duplicatFound;
  }


  const saveUser = () => {
    console.log(formStates);
    const isduplicat = duplicatedUsers(formStates.email);
    console.log(isduplicat);

    if (isduplicat) {
      alert(`User Email is ${formStates.email} alraedy Exist`);

    }
    else {
      let fetchUsers = [...users];
      fetchUsers.push(formStates);
      localStorage.setItem("UserList", JSON.stringify(fetchUsers));
      setUsers(fetchUsers);
      clearStates();
      alert(`This Email is ${formStates.email} Sign in Succesfully`);
      router.push("/login");
    }

  }


  useEffect(() => { // for UsersList;

    if (localStorage.getItem("UserList") != null) {
      let fetchUsers = localStorage.getItem("UserList");
      let jsonData = JSON.parse(fetchUsers);
      setUsers(jsonData)
      console.log("Users", jsonData);

    }
    else {
      localStorage.setItem("UserList", JSON.stringify([]));
    }
  }, []);

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://shorturl.at/fpZ05)' }}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput value={formStates.name} onChange={(e) => setFormStates({ ...formStates, name: e.target.value })} wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' />
          <MDBInput value={formStates.email} onChange={(e) => setFormStates({ ...formStates, email: e.target.value })} wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' />
          <MDBInput value={formStates.password} onChange={(e) => setFormStates({ ...formStates, password: e.target.value })} wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' />
          <MDBInput value={formStates.repeatpassword} onChange={(e) => setFormStates({ ...formStates, repeatpassword: e.target.value })} wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' />
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn onClick={saveUser} className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;