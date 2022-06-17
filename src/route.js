
import Login from "./login";
import Home from "./home";
import EmployeeDetails from "./employeedetails";

const routes = [
    // { path: "/login", exact: true, component: Login },
    { path: "/home", name: "", component: Home },
    { path: "/employeedetails:id", name: "", component: EmployeeDetails },

    { path: "/login", name: "", component: Login },
];

export default routes;