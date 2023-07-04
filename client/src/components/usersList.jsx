import React from 'react'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import { BsTrash } from 'react-icons/bs'
import { BiEditAlt } from 'react-icons/bi'

const usersList = ({id, email, name, password, role, setUpdateUI, updateMode}) => {

    const removeUser = () => {
        axios.delete(`${baseURL}/delete/${id}`).then((res) => {
            console.log(res);
            setUpdateUI((prevState) => !prevState)
        });
    }

  return (
    <li>
        {email}
        <div className="icon__holder">
            <BiEditAlt 
                className='icon'
                onClick={() =>updateMode(id, email, name, password, role)}
            />
            <BsTrash 
                className='icon'
                onClick={removeUser}
            />
        </div>
    </li>
  )
}

export default usersList