import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.handleChange= this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      rollno: ''
    }
  }

  handleChange(event){
    const {name,value} = event.target
    this.setState({
        [name]: value
    })
}

  componentDidMount() {
    axios.get('https://studentregisterapp.herokuapp.com/student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          firstname: res.data.student.firstname,
          lastname: res.data.student.lastname,
          email: res.data.student.email,
          rollno: res.data.student.rollno
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }



  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      rollno: this.state.rollno
    };

  


    axios.put('https://studentregisterapp.herokuapp.com/student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit} className="formClass " >
        <Form.Group controlId="First Name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId=" Last Name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" name="rollno" value={this.state.rollno} onChange={this.handleChange} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}
