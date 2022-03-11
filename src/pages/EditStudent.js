import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

export default function EditStudent() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState([]);

  const { id } = useParams();

  useEffect( async () => {
    
    const res = await axios.get(`http://127.0.0.1:8000/api/students/${id}/edit`);

    setName(res.data.students.name);
    setEmail(res.data.students.email);
    setAge(res.data.students.age);
    setAddress(res.data.students.address);
    setImage(res.data.students.image);

    console.log(res.data.students);

  },[]);

  const submitForm = async e => {
    e.preventDefault();


    const data = new FormData();

    data.append('name',name);
    data.append('email',email);
    data.append('age',age);
    data.append('address',address);
    data.append('image',image);

    const res = await axios.post(`http://127.0.0.1:8000/api/students/${id}?_method=PUT`,data);

    if(res.data.error){
      setErrors(res.data.error);
    }

    if(res.status === 200){
        swal({
            title: 'Updated!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'OK!'
          })
    }

  }

  return (
    <div className='row'>
      <div className="col-8 mx-auto">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h2>Edit Student</h2>

            <Link to="/" className='btn btn-dark'>Back</Link>
          </div>
          <div className="card-body">
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="name" className='form-label'>Name</label>
                <input type="text" name="name" id='name' className="form-control" onChange={e => setName(e.target.value)} value={name} />
                <span className="text-danger">{errors.name}</span>
              </div>
              <div className="mb-3">
                <label  className='form-label' htmlFor="name">Email</label>
                <input type="email" name="email" id='email' className="form-control" onChange={e => setEmail(e.target.value)} value={email} />
                <span className="text-danger">{errors.email}</span>
              </div>
              <div className="mb-3">
                <label  className='form-label' htmlFor="age">Age</label>
                <input type="text" name="age" id='age' className="form-control" onChange={e => setAge(e.target.value)} value={age} />
                <span className="text-danger">{errors.age}</span>
              </div>
              <div className="mb-3">
                <label  className='form-label' htmlFor="name">Address</label>
                <input type="text" name="address" id='address' className="form-control" onChange={e => setAddress(e.target.value)} value={address} />
                <span className="text-danger">{errors.address}</span>
              </div>
              <div className="mb-3">
                <label  className='form-label' htmlFor="image">Photo</label>
                <input type="file" name="image" id='image' className="form-control" onChange={e => setImage(e.target.files[0])} />
                <span className="text-danger">{errors.image}</span>
              </div>  

              <div className="mb-3">
                <button className="btn btn-dark">Update</button>  
              </div>
            </form>  
          </div>
        </div>  
      </div>
    </div>
  )
}
