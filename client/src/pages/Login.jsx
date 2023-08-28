import React, { useEffect, useRef, useState, useContext } from 'react'
import AuthContext from '../context/authProvider'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

const Login = () => {

    // const signIn = useSignIn();
    // const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const { setAuth } = useContext(AuthContext);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [input.email, input.password])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => {
          return { ...prev, [name]: value }
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData =  {
            email: input.email,
            password: input.password
        };

        try {
            await axios.post(`${baseURL}/login`, userData, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            .then((res) => {
                const accessToken = res?.data?.accessToken;
                const roles = res?.data?.role;
                setAuth({ roles, accessToken});
                setSuccess(true);
                console.log('you are logged in')
                // signIn({
                //     token: res.data.accessToken,
                //     expiresIn: 3600, // 1 Hour cookie expires
                //     tokenType: "Bearer",
                //     authState: {email: userData.email},
                // });
            })

            // if(!(isAuthenticated())) navigate('/login');
            // navigate('/');

        } catch(e) {
            console.log(e);
        }
    }

  return (
    <div>
        <h1>Login Page</h1>
        <p 
            ref={errRef} 
            className={errMsg ? 'errmsg':'offscreen'} 
            aria-live='assertive'>{errMsg}
        </p>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                type="text" 
                name='email'
                ref={userRef}
                value={ input.email }
                onChange={handleChange}
                required />
            <label htmlFor="password">Password</label>
            <input 
                type="text" 
                name='password'
                value={ input.password }
                onChange={handleChange} 
                required/>

            <button>Log In</button>
        </form>
    </div>
  )
}

export default Login