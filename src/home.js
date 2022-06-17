import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import avatar2 from "../src/image/avatar-2.jpg";
import { reactLocalStorage } from "reactjs-localstorage";


import {
    Card,
    CardBody,
    Col,
    Row,
    Container,
    FormGroup,
    Label,
    Input,
    CustomInput,
    Button,
    UncontrolledAlert,
    InputGroup,
    InputGroupAddon,
} from "reactstrap";



export default function App() {

    const [employeeData, setemployeeData] = useState([]);
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const username = reactLocalStorage.getObject("userData");
    console.log("username", username.name);

    useEffect(() => {

        GetEmployeeList()
    }, []);

    const GetEmployeeList = async () => {
        axios.get("https://retoolapi.dev/GFHqAV/getemployees")
            .then(response => {
                console.log(response);
                let i = 1;
                let arr = [];
                response.data.forEach(element => {
                    let rows = {
                        sl: i,
                        id: element.id,
                        name: element.name,
                        company: element.company,
                        designation: element.designation,
                        company_logo: <img src={element.company_logo} alt=""
                            height="80px"
                            width="80px"
                        />,
                        action: (

                            // <Link to="/home">
                            //     <h6>Start App </h6>
                            // </Link>

                            <Button color="primary"
                                onClick={() => {
                                    window.location.href = "/employeedetails" + element.id
                                }}


                            >View More</Button>

                        ),

                    }
                    i++;
                    arr.push(rows)

                });
                setemployeeData(arr);

            })
            .catch(error =>
                console.log(error)
            )
            ;
    }





    const data = {
        columns: [
            {
                label: "Sl no",
                field: "sl",
                sort: "asc",
                width: 150,
            },
            // {
            //     label: "Id",
            //     field: "id",
            //     sort: "asc",
            //     width: 150,
            // },
            {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 150,
            },

            {
                label: "Office",
                field: "company",
                sort: "asc",
                width: 200,
            },
            {
                label: "Designation",
                field: "designation",
                sort: "asc",
                width: 100,
            },
            {
                label: "Company Logo",
                field: "company_logo",
                sort: "asc",
                width: 150,
            },
            {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 100,
            },

        ],
        rows: employeeData

    };


    const toggle = async () => {
        setdropdownOpen(!dropdownOpen)

    }

    return (
        <React.Fragment>
            <div className="page-content">
                <br></br>

                <FormGroup row>

                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            <img src={avatar2} className="avatar-xs rounded-circle" alt="" height="50px" width="50px" />

                            {username.name}
                        </DropdownToggle>
                        <DropdownMenu>
                            {/* <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem> */}
                            <DropdownItem
                                onClick={() => {
                                    reactLocalStorage.setObject("userData", null);
                                    window.location.href = "/login"
                                }}
                            >

                                Logout
                            </DropdownItem>
                            {/* <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem> */}
                        </DropdownMenu>
                    </Dropdown>




                </FormGroup>
                <b>
                    <center>
                        {" "}
                        <h2>All EMPLOYEE LIST</h2>

                    </center>
                </b>
                <br></br>
                <Container fluid>

                    <Row>
                        <Col xl={12}>
                            <div className="card p-3">
                                <MDBDataTable responsive bordered data={data} />
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
}
