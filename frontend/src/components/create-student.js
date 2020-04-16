import React, { Component } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios";
import "./Stylesheets.css"



 class CreateStudent extends Component {

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this)
// Initiate a state with the following properties
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            rollno: '',
            title:"student",
            contact:"",
            school:"",
            studentimage:null
        };
    
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleFileUpload(event){
      this.setState({studentimage: event.target.files[0]});
    }
 
    onSubmit(e) {
        e.preventDefault()
    

        // Update the state with new values
        const formData = new FormData();
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
        formData.append("email", this.state.email);
        formData.append("rollno", this.state.rollno);
        formData.append("title", this.state.title);
        formData.append("contact", this.state.contact);
        formData.append("school", this.state.school);
        formData.append("studentimage", this.state.studentimage);
      
    // axios call to /students and pass the formData object to send them to the backend route
        axios.post('https://studentregisterapp.herokuapp.com/student/', formData)
          .then(res => console.log(res.data));

    // Cleat the imput fields with the code below after yu sent a form data
        this.setState({
          firstname: '',
          lastname: '',
          email: '',
          rollno: '',
          school:'Select school',
          contact:'',
          title:'Select title',
          studentimage:''
        });
      }


    render() {
        return (
              
    <div>
         
                <form  className="createStudent" onSubmit={this.onSubmit}>

                    <div className="row">
                            <div className="col">
                            <label htmlFor="firstname">First Name</label>
                                    <input type="text"  name="firstname" value={this.state.firstname} onChange={this.handleChange} className="form-control" placeholder="First name" />
                            </div>

                            <div className="col">
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} className="form-control" placeholder="Last name"/>
                            </div>
                    </div> <br/>
                    <div className="row">
                            <div className="col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Email address" />
                            </div>
                            
                            <div className="col">
                                <label htmlFor="school">School</label>
                                <select name="school" value={this.state.school} onChange={this.handleChange} className="form-control" >
                                        <option value="Business and public administration">Business and public administration</option>
                                        <option value="School of Arts and Sciences">School of Arts and Sciences</option>
                                        <option value="School of Nursing">School of Nursing</option>
                                        <option value="Information and Communication Technology">Information Communication and Technology</option>
                                   </select>
                            </div>
                    </div> <br/>
                    <div className="row">
                            <div className="col">
                                    <label htmlFor="rollno">Roll Number</label>
                                    <input type="number" name="rollno" value={this.state.rollno} onChange={this.handleChange} className="form-control" placeholder="Roll number" />
                            </div>
                            
                            <div className="col">
                                <label htmlFor="title">Title</label>
                                    <select name="title" value={this.state.title} onChange={this.handleChange} className="form-control" >
                                        <option value="student">Student</option>
                                        <option value="lecturer">Lecturer</option>
                                   </select>
        
                            </div>
                    </div> <br/>
                    <div className="row">
                            <div className="col">
                                    <label htmlFor="contact">Contact</label>
                                    <input type="text" name="contact" value={this.state.contact} onChange={this.handleChange} className="form-control" placeholder="Contact" />
                            </div>
                            
                            <div className="col">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="studentimage" onChange={this.handleFileUpload} className="form-control" placeholder="Image"/>
                            </div>
                    </div> <br/>
                    <Button variant="danger" size="lg" block="block" type="submit">Create Student </Button>
             </form>
     </div>

                  
                
        
        )
    }
}

export default CreateStudent;
