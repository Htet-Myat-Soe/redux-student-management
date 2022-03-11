import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default function Student() {

  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);

  useEffect(async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/students');

      setStudents(res.data.students);
      setLoading(false);

  },[]);

  const deleteStd = async (e,id) => {

    const current = e.currentTarget;
    current.innerText = 'Deleting';

    const res = await axios.post(`http://127.0.0.1:8000/api/students/${id}?_method=DELETE`);

    if(res.status === 200){
      current.closest('tr').remove();
      swal({
        title: 'Deleted!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'OK!'
      })
    }
  }


  return (
    <div className='row'>
        <div className='col-12 mx-auto'>
          <div className="d-flex my-2 justify-content-between align-items-center">
            <h2 className="text-bolder">All Students</h2>  
            <Link to={`/add-students`} className='btn btn-dark'>Add Student</Link>
          </div>
          <table className='table table-striped table-hover table-dark'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { loading ? 

              <tr>
                <td colSpan={7}><h3>Loading...</h3></td>
              </tr>

              :
              students.map(std =>{
                return (
                  <tr key={std.id}>
                  <td>{std.id}</td>
                  <td><img src={`http://127.0.0.1:8000/images/students/${std.image}`} width="100px" height="100px" alt="" /></td>
                  <td>{std.name}</td>
                  <td>{std.email}</td>
                  <td>{std.age}</td>
                  <td>{std.address}</td>
                  <td>
                    <Link to={`/edit-students/${std.id}`} className='btn btn-primary'>Edit</Link>
                    <button className='btn btn-danger' onClick={(e) => deleteStd(e,std.id)}>Delete</button>
                  </td>
                </tr>
                )
              })                          
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}
