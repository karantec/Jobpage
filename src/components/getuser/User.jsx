import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from 'react-router-dom'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("https://letscodings.onrender.com/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`https://letscodings.onrender.com/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add Job</Link>
        <table border={1} cellPadding={10} cellSpacing={5}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th width={"10"}>Job Profile</th>
                    <th width={"10"}>Company Name</th>
                    <th width={"10"}>Job Location</th>
                    <th width={"10"}>Experience</th>
                    <th width={"10"}>Job Type</th>
                    <th width={"10"}>Job Description</th>
                    <th width={"10"}>Job Skills </th>
                    <th width={"10"}>Job Role</th>
                    <th width={"10"}>Apply Link</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.JProfile}</td>
                            <td>{user.CompanyName}</td>
                            <td>{user.JobLocation}</td>
                            <td>{user.JobExperience}</td>
                            <td>{user.JobType}</td>
                            <td>{user.JobDescription}</td>
                            <td>{user.JobSkills}</td>
                            <td>{user.JobRole}</td>
                            <td><Link to={user.ApplyLink}>
                              Apply
                                </Link></td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default User