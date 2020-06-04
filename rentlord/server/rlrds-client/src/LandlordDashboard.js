import React, {useState, useEffect, useCallback} from 'react';
import './Dashboard.css';
import { faComments, faPaperPlane, faToilet, faLightbulb, faHammer, faUserFriends, faExclamationTriangle, faExpand} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from'@fortawesome/react-fontawesome';
import Lanlord from './img/photo-of-man-taking-selfie-2406949.jpg';
import ProfilePic from './img/pic.png';
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { set } from 'mongoose';
import {Link} from 'react-router-dom';
import SideBar from './SideBar';

const LandlordDashboard = (props) => {
    const [message, setMessage] = useState('');
    const [plumbing, setPlumbing] = useState();
    const [electrical, setElectrical] = useState();
    const [dropPlumbing, setDropPlumbing] = useState(false)
    const [greenComplaints, setGreenComplaints] = useState('rgba(0, 255, 0, 0.1)');
    const [yellowComplaints, setYellowComplaints] = useState('rgba(255, 255, 0, 0.1)');
    const [redComplaints, setRedComplaints] = useState('rgba(255, 0, 0, 0.2)');
    const [name, setName] = useState([]);
    const [tenantName, setTenantName] = useState([]);
    const [toTenantmessage, setToTenantMessage] = useState('');
    const [fromTenantMessage, setFromTenantMessage] = useState('');
    const [tenantmessage, setTenantMessage] = useState('');
    const [tenId, setTenId] = useState('');
    const [tempMessage, setTempMessage] = useState('');
    const [click, setClick] = useState(false);

    console.log('props', props)
    const changeMessage = (e) => {
        e.preventDefault();
        setMessage(e.target.value)

    }

    useEffect(() => {
        localStorage.setItem('Role', 'Landlord')
    }, [])


    const dropdownPlumbing = e => {
        e.preventDefault();
        setDropPlumbing(!dropPlumbing);
        if(dropPlumbing === true) {
       e.target.innerHTML = 'Expand'
        } else {
            e.target.innerHTML = 'Hide'
        }
        console.log('yo', e.target.innerHTML)
    }




 async function tenantMessage(e) {
    const nameId = e.target.value.split(',')
    const messArr = [];
    console.log('nameId', nameId)
    setTenId(nameId[1])
    try {
        await setTenantName(nameId[0])
        for (var i = 0; i < nameId.length; i++) {
            if (i >= 2) {
               await messArr.push(nameId[i])
                console.log('arr',messArr)
            }
        }
    
     } catch(error) {
        console.log(error)
     }
     await setFromTenantMessage(messArr)

}
console.log('messages', fromTenantMessage)
console.log(props)

console.log('name', tenId)

const sendMessage = e => {
    e.preventDefault();
    if (message.length > 0) {
    axios.put('/api/toTenantMessage', {message: message, id: tenId})
        .then((response) => {
            setClick(!click)
            setTempMessage([...tempMessage, response.data])
        })
        .catch(err => {
            console.log(err)
        })
        setMessage('')
    }

}

const close = e => {
    e.preventDefault();
    setTenantName('');
    setFromTenantMessage('');
}

    return (
        <div>
        <div className='dash-contain'>
            <SideBar />
            <div className='dash'>
                <div className='top-bar'>
                    <div className='message-logo'>
                        <FontAwesomeIcon icon={faComments} style={{color: 'darkGray', fontSize: '40px'}}/>          
                    </div>
                    <div className='message'>
                        <input onChange={changeMessage} value={message} type='text' placeholder={tenantName.length > 0 ? `Message ${tenantName}` : 'Choose tenant to message'}/>
                        <div  className={click  ? 'paper-click' : 'paper' }>
                            <li><FontAwesomeIcon onClick={sendMessage} icon={faPaperPlane} style={{color: 'darkGray', fontSize: '40px'}}/></li>    
                        </div>      
                    </div>
                    <div className='lanlord'>
                        <div className='landlord-info'>
                        <div className='landlord-user-only'>
                        {props ? <img className="landlord-img" src={`https://res.cloudinary.com/drgfyozzd/image/upload/${props.landlord.picture}`} alt=''/> : null}
                            <div className='landlord-profile-box'>
                                <p>Hey {props.landlord.username}!</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className='button-box'>
                <DropdownButton className='tenant-button' id="dropdown-item-button" title={tenantName.length > 0 ? `Messaging ${tenantName}` : "Choose Tenant Here"}>
                    {props.issues ? props.issues.map(item => { return <Dropdown.Item as="button" onClick={tenantMessage} value={[item._userName, item._user, item.fromTenantMessage]}>{item._userName}</Dropdown.Item>}) :  null}
                </DropdownButton>
                <div>
                <div className={fromTenantMessage ? 'message-box' : null}>
                    <div className='messaging'>
                        {fromTenantMessage ? fromTenantMessage.map(item => {
                            return <p style={item.includes('Tenant') ? {backgroundColor: 'lightgray'} : item.includes('You:') ? {color: 'white', backgroundColor: 'blue', alignSelf: 'flex-end'} : null}>{item.replace('Landlord:', 'You') && item.replace('Tenant', `${tenantName}:`)}</p>
                        }) : null} 
                        {tempMessage && tenantName ? tempMessage.map(mess => {
                            return <div style={{alignSelf: 'flex-end'}}> <p style={{color: 'white', backgroundColor: 'blue', paddingBottom: '0px;' }}>You: {mess} </p></div>
                        }) : null}
                    </div>
                </div>
                <button onClick={close} style={fromTenantMessage ? {borderRadius: '5px', backgroundColor: 'rgb(73, 95, 93)', width: '300px', border: 'none'} : {display: 'none'}}>Close</button> 
                </div>
                </div>
                <div className='user-info-contain'>
                    <div className='issues-profile'>
                        <div className='landlord-notifications'>
                        <button className='show-hide-button' onClick={dropdownPlumbing}>Expand</button> 

                               { props.issues ? props.issues.map(iss => { return <div className={dropPlumbing ? 'tenant-issues-expand' : 'tenant-issues'}>
                
                    <div>{iss.plumbing.length > 0 || iss.electrical.length > 0 || iss.carpentry.length > 0 || iss.complaints.length > 0 ? <h3><span>Alert</span><FontAwesomeIcon icon={faExclamationTriangle} style={{color: 'white', fontSize: '15px'}}/>{iss._userName} has {iss.carpentry.length + iss.plumbing.length + iss.electrical.length + iss.complaints.length} issues</h3> : null}</div>
                    <div className={dropPlumbing === true ? 'shows' : 'hide'}>
                    <div className='iss-list-container'>
                    {iss.plumbing.length > 0 ? <div className='ten-issues'><h3>Plumbing:</h3>{iss.plumbing.map(ish => {return <div className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'plumbing']} onClick={props.changeSituation} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'plumbing']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'plumbing']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.electrical.length > 0 ? <div className='ten-issues'><h3>Electrical:</h3>{iss.electrical.map(ish => {return <div className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'electrical']} onClick={props.changeSituation} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'electrical']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'electrical']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.carpentry.length > 0 ? <div className='ten-issues'><h3>Carpentry:</h3>{iss.carpentry.map(ish => {return <div className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'carpentry']} onClick={props.changeSituation} style={ish.pending === true ? {backgroundColor: 'red'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'carpentry']} style={ish.recieved === true ? {backgroundColor: 'yellow'} : {backgroundColor: 'rgba(255,255,0, 0.1)'}}>Recieved</button>
                    <button onClick={props.changeCompleted} value={[ish._id, ish.completed, iss._user, 'carpentry']} style={ish.completed === true ? {backgroundColor: 'green'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                    {iss.complaints.length > 0 ? <div className='ten-issues'><h3>Complaints:</h3>{iss.complaints.map((ish, index) => {return <div className='ten-issues'><p>{ish.body}</p><div className='issue-buttons'>
                    
                    <button onClick={props.changeSituation} value={[ish._id, ish.pending, iss._user, 'complaints']} onClick={props.changeSituation} style={ish.pending === true ? {backgroundColor: 'red'} : ish.recieved === true && ish.completed === true ? {backgroundColor: 'rgba(255, 0, 0, 0.2)'} : {backgroundColor: 'rgba(255, 0, 0, 0.2)'}}>Pending</button>
                    <button onClick={props.changeRecieved} value={[ish._id, ish.recieved, iss._user, 'complaints']} className={ish.recieved === true ? "yellow" : ish.completed ===  true && ish.pending === true ? "dimYellow" : "dimYellow"} >Recieved</button>
                    <button onClick={props.changeCompleted}  value={[ish._id, ish.completed, iss._user, 'complaints', true]} style={ish.completed === true ? {backgroundColor: 'green'} : ish.pending === true && ish.recieved === true ? {backgroundColor: 'rgba(0, 255, 0, 0.1)'} : {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}>Completed</button></div></div>})}</div> : null}
                </div>
                </div>

                </div>
                })
                :null
                }

                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default LandlordDashboard;