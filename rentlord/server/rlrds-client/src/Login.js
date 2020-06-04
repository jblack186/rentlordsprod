import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Register.css';
import GoogleButton from 'react-google-button'

const Login = (props) => {
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [token, setToken] = useState('');;

    const changeRole = (e) => {
        e.preventDefault();
        setRole(e.target.value)

    }

    const changePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)

    }

        
console.log(token)

        return (
            <div className='register-contain'>
                
                <div className='register-box'>
                    <h3>Welcome to RentLords</h3>
                    <form>
                        <div>
                         <a style={{listStyle: 'none', textDecoration: 'none'}} href="/auth/google"><GoogleButton
                            onClick={() => { console.log('Google button clicked') }}
                        />
                           </a>
                            {/* <button type='submit'>Add</button> */}
                        </div>
                    </form>
                </div>
            </div>
        )
    }


export default withRouter(Login);
