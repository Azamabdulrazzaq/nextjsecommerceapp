
// Note navigation Components;
"use client"

import React, { useEffect, useState } from 'react';
import styles from "@/app/styles/Page-module.css"
import Swal from 'sweetalert2'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
    MDBBtn,
    MDBInputGroup
} from 'mdb-react-ui-kit';
import Link from 'next/link';

const Navbar = () => {
    const [openNavColor, setOpenNavColor] = useState(false);
    const [getUsers, setGetUsers] = useState(null);
    const [currentData, setCurrentData] = useState([]);

    // Note Mounted Hook;
    useEffect(() => {
        if (localStorage.getItem("Authenticatedusers") !== null) {
            const fetchUsers = localStorage.getItem("Authenticatedusers");
            let actualUsers = JSON.parse(fetchUsers);
            console.log("Usersssss", actualUsers);
            if (fetchUsers) setGetUsers(actualUsers);
        }
    }, []);


    // Note : For Log out Function;

    const LogoutUsers = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The Account is Log Out Successfull",
            showConfirmButton: false,
            timer: 2000,
        });
        localStorage.setItem("Authenticatedusers", JSON.stringify(null));
        window.location.reload();
        // alert("You have Logged out sucessfully");
    }

    useEffect(() => {// for Shopping Card;

        if (localStorage.getItem("YourOrder") !== null) {
            const fetchCurrentOrder = localStorage.getItem("YourOrder");
            const jsonData = JSON.parse(fetchCurrentOrder);
            // console.log(jsonData)
            setCurrentData(jsonData);
        }
    }, []);

    return (
        <>
            <MDBNavbar sticky expand='lg' className='navbar'>
                <MDBContainer fluid>
                    <MDBNavbarBrand>
                        E-comerce App
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavColor(!openNavColor)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse open={openNavColor} navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink>
                                    <Link className='text-black' href={"/"}>Products</Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink 
                                    disabled={getUsers !== null}
                                >
                                    <Link className='text-black' href={"/signup"}>Sign Up</Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                (getUsers)
                                    ?
                                    (
                                        <button className='Btn' onClick={LogoutUsers}>
                                            Log out
                                        </button>
                                    )
                                    :
                                    (
                                        <MDBNavbarItem>
                                            <MDBNavbarLink>
                                                <Link className='text-black' href={"/login"}>Log In</Link>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    )
                            }

                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    disabled={getUsers == null}
                                >
                                    <Link className='text-black' href={"/cart"}>
                                        Your Cart {currentData.length > 0 ? (<sup>{currentData.length}</sup>) : (null)}
                                    </Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                    disabled={getUsers == null}
                                >
                                    <Link className='text-black' href={"/orders"}>Orders</Link>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                (getUsers && getUsers.email == "admin@gmail.com")
                                    ?
                                    (
                                        <MDBNavbarItem>
                                            <MDBNavbarLink>
                                                <Link className='text-black' href={"/productsAdd"}>ProductsAdd</Link>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    )
                                    :
                                    (null)
                            }
                        </MDBNavbarNav>
                    </MDBCollapse>
                    <MDBInputGroup 
                        tag="form"
                        className='text-black d-flex w-auto mb-3'
                        style={{
                            paddingTop: "15px"
                        }}
                    >
                        {getUsers ? getUsers.name : "No Users"}
                    </MDBInputGroup>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
};

export default Navbar;




// light bgColor='light'