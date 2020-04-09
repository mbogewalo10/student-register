
import React, {Component} from 'react';
import Profilecard from "./profilecard"
import axios from 'axios';
import "./Stylesheets.css"

// Simple Search Function that filters based on the firstName
function searchingFor(search){
    return function(x){
        return x.firstname.toLowerCase().includes(search.toLowerCase()) ||
        x.lastname.toLowerCase().includes(search.toLowerCase()) ||
        x.title.toLowerCase().includes(search.toLowerCase());
        
    }
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [],
            search: ""
        };
   this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
    
        axios.get("https://studentregisterapp.herokuapp.com/student/")
        .then(res => {
            console.log(res.data.createdStudent.students)
            this.setState({students: res.data.createdStudent.students});  
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }



render(){
     
    const allstudents = this.state.students.filter(searchingFor(this.state.search)).map((student)=>{

        return(
            
            <Profilecard key={student._id} 
            studentimage={student.studentimage}
            firstname={student.firstname}  
            lastname={student.lastname} 
            title={student.title} 
            contact={student.contact}
            school={student.school}   />
        )
    })

    
    return(
        <div>
             <div className="searchDiv">
             <input  type="search"  name="search" value={this.state.search} onChange={this.handleChange} class="form-control" placeholder="Search"/>
             {/* <button onClick={this.handleSearch}>Search</button> */}
             </div>
             {allstudents}
        </div>
    )
}
}

export default Home;