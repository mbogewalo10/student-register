import React, { Component } from 'react'
import axios from "axios";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"


 class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            password:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }
  
    handleChange(event){
        const {name,value} = event.target
        this.setState({
              [name]: value
        })
    }
    handleSubmit(e){
        e.preventDefault();

        const userData = {
            firstname: this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password
        }
      axios
      .post("https://studentregisterapp.herokuapp.com/user/signup", userData)
      .then(result =>{
          console.log(result.data)
      })
      .catch(err =>{
          console.log(err)
      });
      this.props.history.push('/')
    
    }
     handleSend(){
     alert(`Registered Successfully `)
    }
    

    render() {
        return (
            <div className="form-wrapper" >
            <Form className="formClass" onSubmit={this.handleSubmit} >
                <Form.Group controlId="firstname" >
                     <Form.Label>FIRST NAME</Form.Label>
                     <Form.Control type="text" name="firstname"  placeholder="First Name" value={this.state.firstname}  onChange={this.handleChange}  /> 
                </Form.Group>
                <Form.Group controlId="lastname" >
                     <Form.Label>LAST NAME</Form.Label>
                     <Form.Control type="text" name="lastname"  placeholder="Last Name" value={this.state.lastname}  onChange={this.handleChange}  /> 
                </Form.Group>

                <Form.Group controlId="email" >
                     <Form.Label>EMAIL ADDRESS</Form.Label>
                     <Form.Control type="email" name="email" placeholder="Email"  value={this.state.email} onChange={this.handleChange}   /> 
                </Form.Group>
                <Form.Group controlId="password" >
                     <Form.Label>PASSWORD</Form.Label>
                     <Form.Control type="password" name="password" placeholder="Password"  value={this.state.password} onChange={this.handleChange}   /> 
                </Form.Group>

                

     <Button variant="danger" size="lg" block="block" type="submit"  onClick={this.handleSend}> REGISTER</Button>
     <p className="forgot-password text-right"> Already registered <a href="/login">Sign In?</a> </p>
            </Form>  
        </div>
        )
    }
}

export default Signup;
