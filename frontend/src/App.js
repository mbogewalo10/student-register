import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateStudent from "./components/create-student";
import EditStudent from "./components/edit-student";
import StudentList from "./components/student-list";
import Signup from "./components/signup"
import Login from "./components/login"
import Home from "./components/home"



// const styles = {
//   header: {
//     backgroundImage: 'url(https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?cs=srgb&dl=white-painted-wall-1939485.jpg&fm=jpg)',
//     height: '100%',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover'
//   },

//   content: {
//     height: '100vh',
//     width: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     color: 'white'
//   }
// }


function App() {
 
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-student"} className="nav-link">
                STUDENT REGISTER
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav className="logout">
                <Link to={"/home"} className="nav-link ">
                  HOME
                </Link>
              </Nav>
              
              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}
               <Nav className="logout">
                <Link to={"/create-student"} className="nav-link">
                  CREATE-STUDENT
                </Link>
              </Nav>

              <Nav className="logout">
                <Link to={"/student-list"} className="nav-link">
                  STUDENT-LIST
                </Link>
              </Nav>
              <Nav className="logout">
                <Link to={"/signup"} className="nav-link">
                  SIGN-UP
                </Link>
              </Nav>
              <Nav className="logout">
                <Link  to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </Nav>
               <button className="logout" onClick={function(){localStorage.removeItem("token" ,"user")}} >LOGOUT</button>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/create-student" component={CreateStudent} />
                <Route path="/edit-student/:id" component={EditStudent} />
                <Route path="/student-list" component={StudentList} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;