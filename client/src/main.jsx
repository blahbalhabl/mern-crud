import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { AuthProvider } from './context/authProvider'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <AuthProvider
    // authType={'cookie'}
    // authName={'_auth'}
    // cookieDomain={window.location.hostname}
    // cookieSecure={false} //Change this in implementation.
    // >
    <AuthProvider>
        <Router>
            <Routes>
                
                    <Route path='/login' element={<Login />}/>
                    <Route path='/' element={
                        // <RequireAuth loginPath='/login'>
                            <App />
                        // </RequireAuth>
                        }/> 
                    <Route path='/dashboard' element={<Dashboard />}/>
                
                
            </Routes>
        </Router>
        </AuthProvider>
    // </AuthProvider>
)
