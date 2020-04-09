import React, { Component } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios";


 class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            token: localStorage.getItem("token") || "",
            user: localStorage.getItem("user") || ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }
  
handleChange(event){
    const {name,value} = event.target
    this.setState({
             [name]: value
    })
}

handleSubmit(e){
    e.preventDefault()
    const loginInfo = {
        email:this.state.email,
        password: this.state.password
    }

//Send loginInfo to the login route and store the resulting token in a local storege
    axios.post("https://studentregisterapp.herokuapp.com/user/login", loginInfo )
    .then(result =>{
        const {token,user} = result.data
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.firstname)
        this.setState({
            token,
            user
        })
    })
    .catch(err =>{
         console.log("Error at login" + err)
    })
    this.props.history.push('/student-list')
}

handleSend(){
    alert(`Welcome  ${this.state.user}`)
}
    render() {
        return (
            <div className="form-wrapper" >
            <Form className="formClass" onSubmit={this.handleSubmit} >
               
                <Form.Group controlId="price" >
                     <Form.Label>EMAIL ADDRESS</Form.Label>
                     <Form.Control type="email" name="email" placeholder="Email"  value={this.state.email} onChange={this.handleChange}   /> 
                </Form.Group>
                
                <Form.Group controlId="password" >
                     <Form.Label>PASSWORD</Form.Label>
                     <Form.Control type="password" name="password" placeholder="Password"  value={this.state.password} onChange={this.handleChange}   /> 
                </Form.Group>


                    <Button variant="danger" size="lg" block="block" type="submit"  onClick={this.handleSend}>LOGIN</Button>
                    <p className="forgot-password text-right"> FORGOT <a href="#">PASSWORD</a></p>
            
            </Form>  
        </div>
        )
    }
}

export default Login;
