import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserList from './components/usersList'
import { baseURL } from './utils/constants'

const App = () => {

  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    email: '',
    name: '',
    password: '',
    role: '',
  });
  const [updateUI, setUpdateUI] = useState(false);  
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/users`)
    .then((res) => {
      setUsers(res.data);
    })
  }, [updateUI])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value }
    });
  };

  const addUser = () => {
    axios.post(`${baseURL}/register`, 
    {
      email: input.email, 
      name: input.name, 
      password: input.password, 
      role: input.role
    })
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setInput({
        email: '',
        name: '',
        password: '',
        role: ''
      });
    });
  }

  const updateMode = (id, email, name, password, role) => {
    setInput({ email, name, password, role });
    setUpdateId(id);
  }

  const updateUser = () => {
    axios.put(`${baseURL}/update/${updateId}`, {
      email: input.email,
      name: input.name,
      password: input.password,
      role: input.role
    })
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput({
        email: '',
        name: '',
        password: '',
        role: ''
      });
    })
  }
  
  return (
    <div>
      <h1>MERN CRUD</h1>
      <div className="input__holder">
        <input 
          type="text"
          name='email'
          value={ input.email } 
          placeholder='email'
          onChange={handleChange}
        />
        <input 
          type="text" 
          name='name'
          value={ input.name } 
          placeholder='name'
          onChange={handleChange}
        />
        <input 
          type="text"
          name='password'
          value={ input.password } 
          placeholder='password'
          onChange={handleChange}
        />
        <input 
          type="text"
          name='role'
          value={ input.role } 
          placeholder='role'
          onChange={handleChange}
        />
        <button 
          type='submit'
          onClick={updateId ? updateUser : addUser}>
          {updateId ? 'Update User' : 'Add User'}
        </button>
      </div>

      <ul>
        { users.map((user) => (
          <UserList 
            key={user._id}
            id={user._id}
            email={user.email}
            name={user.name}
            password={user.password}
            role={user.role}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </div>
  )
}

export default App