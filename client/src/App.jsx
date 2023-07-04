import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserList from './components/usersList'
import { baseURL } from './utils/constants'

const App = () => {

  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [updateUI, setUpdateUI] = useState(false);  
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/users`)
    .then((res) => {
      setUsers(res.data);
    })
  }, [updateUI])

  const addUser = () => {
    axios.post(`${baseURL}/register`, 
    {
      email: email, 
      name: name, 
      password: password, 
      role: role
    })
    .then((res) => {
      console.log(res.data);
      setEmail('');
      setName('');
      setPassword('');
      setRole('');
      setUpdateUI((prevState) => !prevState);
    });
  }

  const updateMode = (id, email, name, password, role) => {
    setEmail(email);
    setName(name);
    setPassword(password);
    setRole(role);
    setUpdateId(id)
  }

  const updateUser = () => {
    axios.put(`${baseURL}/update/${updateId}`, {
      email: email,
      name: name,
      password: password,
      role: role
    })
    .then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setEmail('');
      setName('');
      setPassword('');
      setRole('');
    })
  }
  
  return (
    <div>
      <h1>MERN CRUD</h1>
      <div className="input__holder">
        <input 
          type="text" 
          value={ email } 
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="text" 
          value={ name } 
          placeholder='name'
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          value={ password } 
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="text" 
          value={ role } 
          placeholder='role'
          onChange={(e) => setRole(e.target.value)}
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