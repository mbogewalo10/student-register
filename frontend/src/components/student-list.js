import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTable from './student-table'


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      student: []
    };
  }

  componentDidMount() {
    axios.get('https://studentregisterapp.herokuapp.com/student/')
      .then(res => {
        console.log(res)
        this.setState({
          student: res.data.createdStudent.students
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.student.map((res, i) => {
      return <StudentTable obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead className="tableHead">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="tableRow">
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}