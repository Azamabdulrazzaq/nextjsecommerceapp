"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
// Note : Login Components;

const Login = () => {
    // useRouter;

    const router = useRouter();

    // States;

    const [formStates, setFormStates] = useState({
        email: "",
        password: "",
    })
    const [users, setUsers] = useState([]);
    // Clear Feild;
    const clearStates = () => {
        setFormStates({
            email: "",
            password: "",
        })
    }
    // Note: loginuser Function;
    const loginUsers = () => {
        // console.log("All Users", users);
        // console.log("Form Users", formStates);

        let userFound = false;
        let isUserFound = null;
        // Note : Searching For Users;
        for (let i = 0; i < users.length; i++) {
            // console.log(users[i]);
            if (users[i].email == formStates.email) {
                userFound = true;
                isUserFound = users[i];
                break;
            }
        }
        // Note User Found;
        if (!userFound) alert("User Does Not Exist")
        else if (isUserFound.password !== formStates.password) alert("Pasword Did Not Match")
        else {
            console.log("Finaly Users Found", isUserFound)
            localStorage.setItem("Authenticatedusers", JSON.stringify(isUserFound));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The Account is Logged In Successfull",
                showConfirmButton: false,
                timer: 1500
            });
            clearStates();
            router.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }

    };

    // Note: Mounted Hook for login;
    useEffect(() => {
        const fetchUsers = localStorage.getItem("UserList");
        const JsonData = JSON.parse(fetchUsers);
        setUsers(JsonData);
    }, []);
    return (
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0'>

                    <MDBCol md='6'>
                        <MDBCardImage src='https://shorturl.at/bxAL7' alt="login form" className='rounded-start w-100 h-100' />
                    </MDBCol>

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>

                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Logo</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                            <MDBInput value={formStates.email} onChange={(e) => setFormStates({ ...formStates, email: e.target.value })} wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                            <MDBInput value={formStates.password} onChange={(e) => setFormStates({ ...formStates, password: e.target.value })} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />

                            <MDBBtn onClick={loginUsers} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>  Don,t have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>

                        </MDBCardBody>
                    </MDBCol>

                </MDBRow>
            </MDBCard>

        </MDBContainer>
    );
}

export default Login;