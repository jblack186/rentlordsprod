import React, {Component} from 'react';
import axios from 'axios';
import './Register.css';

export default class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            
        }
        console.log(this.state)
       
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    // register = (e) => {
    //     localStorage.removeItem('store')

    //     e.preventDefault();
    //     axios.post('https://shirt-store123.herokuapp.com/api/register', this.state)
    //     .then(response => {
    //         console.log(response.data)
    //         localStorage.setItem('token', response.data.token)
    //         this.props.history.push('/') 
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
     



    // }

    

    test = e => {
        e.preventDefault();
        axios.get('https://shirt-store123.herokuapp.com/test',)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    testTwo = e => {
        e.preventDefault();
        axios.get('https://shirt-store123.herokuapp.com/usr')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }


    


    render() {
        console.log(this.state.username)
        console.log(this.state.password)
        return (
            <div className='register-contain'>
                <div className='register-box'>
                <h3>REGISTER FORM</h3>
                <form onSubmit={this.props.register}>
                <div className='username'> 
                    <input 
                    type='text'
                    onChange={this.props.changeUsername}
                    placeholder='Enter username'
                    value={this.props.username}
                    name='username'
                    />
                    </div>
                    <div className='password'>
                    <input 
                    onChange={this.props.changePassword}
                    onFocus='none'
                    placeholder='Password'
                    value={this.props.password}
                    name='password'
                    />
                    </div>
                    <div>
                    <button type='submit'>Add</button>
                    </div>
                    <span>Are you already a RentLords' member?</span><span>Login here</span>
                </form>
                </div>
            </div>
        )
    }
}