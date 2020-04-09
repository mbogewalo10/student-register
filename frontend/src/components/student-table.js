import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class StudentTable extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('https://studentregisterapp.herokuapp.com/student/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr >
                <td>{this.props.obj.firstname}</td>
                <td>{this.props.obj.lastname}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.rollno}</td>
                <td>
                    <Link className="editBtn" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}