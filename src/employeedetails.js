import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
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



export default function App(props) {

    const [employeeData, setemployeeData] = useState([]);
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

                let arr1 = response.data.filter(it => it.id == props.match.params.id);
                console.log("arr", arr1);
                arr1.forEach(element => {
                    let rows = {
                        sl: i,
                        id: element.id,
                        name: element.name,
                        company: element.company,
                        designation: element.designation,
                        company_logo: <img src={element.company_logo} alt=""
                            height="80px"
                            width="80px"
                        />
                    }
                    arr.push(rows);

                });

                setemployeeData(arr[0]);

            })
            .catch(error =>
                console.log(error)
            )
            ;
    }










    return (
        <React.Fragment>
            <div className="page-content">


                <br></br>
                <b>
                    <center>
                        {" "}
                        <h2>EMPLOYEE DETAILS</h2>

                    </center>
                </b>
                <br></br>
                <Container fluid>

                    <Row>
                        <Col xl={12}>
                            <div className="card p-3">
                                {/* <MDBDataTable responsive bordered data={data} /> */}
                                <MDBTable borderless>
                                    <MDBTableHead>
                                        <tr>
                                            {/* <th>Id</th> */}
                                            <th>Name</th>
                                            <th>Office</th>
                                            <th>Designation</th>
                                            <th>Company Logo</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            {/* <td>{employeeData.id}</td> */}
                                            <td>{employeeData.name}</td>
                                            <td>{employeeData.company}</td>
                                            <td>{employeeData.designation}</td>
                                            <td>{employeeData.company_logo}</td>
                                        </tr>

                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
}
