import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

const users = {
    JProfile: "",
    CompanyName: "",
    JobLocation:"",
    JobExperience:"",
    JobDescription:"",
    JobSkills:"",
    JobRole:"",
    ApplyLink:"",


 }


 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`https://letscodings.onrender.com/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update user</h3>
        <form className='addUserForm' onSubmit={submitForm}>
        <div className="inputGroup">
                <label htmlFor="fname">Job Profile</label>
                <input type="text" onChange={inputChangeHandler} id="JProfile" name="JProfile" autoComplete='off' placeholder='Job Role' />
            </div>
            <div className="inputGroup">
                <label htmlFor="Cname">Company Name</label>
                <input type="text" onChange={inputChangeHandler} id="CompanyName" name="CompanyName" autoComplete='off' placeholder='Company Name' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Location</label>
                <input type="text" onChange={inputChangeHandler} id="JobLocation" name="JobLocation" autoComplete='off' placeholder='Job Location' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Experience</label>
                <input type="text" onChange={inputChangeHandler} id="JobExperience" name="JobExperience" autoComplete='off' placeholder='Job Experience' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Type</label>
                <input type="text" onChange={inputChangeHandler} id="JobType" name="JobType" autoComplete='off' placeholder='Job Type' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Description</label>
                <input type="text" onChange={inputChangeHandler} id="JobDescription" name="JobDescription" autoComplete='off' placeholder='Job Description' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Skills</label>
                <input type="text" onChange={inputChangeHandler} id="JobSkills" name="JobSkills" autoComplete='off' placeholder='Job Skills' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Job Role</label>
                <input type="text" onChange={inputChangeHandler} id="JobRole" name="JobRole" autoComplete='off' placeholder='Job Role' />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Apply Link</label>
                <Link to="#"> <input type="text" onChange={inputChangeHandler} id="ApplyLink" name="ApplyLink" autoComplete='off' placeholder='Apply Link' /></Link>
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Edit
