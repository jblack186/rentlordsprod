import React, {useState, useEffect, useCallback} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './Register';
import Login from './Login';
import { Route } from 'react-router-dom';
import TenantDashboard from './TenantDashboard';
import LandlordDashboard from './LandlordDashboard';
import Role from './Role';
import LandlordPick from './LandlordPick';
import Setting from './Setting';
import axios from 'axios';



const App = e => {
    const [landlord, setLandlord] = useState('');
    const [issues, setIssues] = useState([]);
    const [tenant, setTenant] = useState();
 

  useEffect(() => {

    axios.get('/api/landlord-info')

        .then(res => {
            setLandlord(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    axios.get('/api/tenants-issues')
        .then(res => {
            setIssues(res.data)
    
        })
        .catch(err => {
            console.log(err)
        })
    axios.get('/api/tenant')
        .then(res => {
            console.log(res.data)
            setTenant(res.data)
        })



}, [])
console.log('landlord', landlord)
const changeRecieved = e => {
  // e.persist();
  const idStatus = e.target.value.split(',')
  var status = null
  if (idStatus[1] === 'true') {
      status = true
  } else {
      status = false
  }
  axios.put('/api/recieved', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then((res)=> {


          console.log(res)
      })
      .catch(err => {
          console.log(err)
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
          console.log(err)
      })

}

const changeCompleted = (e) => {
  // e.persist();
  const idStatus = e.target.value.split(',')
  var status = null
  if (idStatus[1] === 'true') {
      status = true
  } else {
      status = false
  }
  axios.put('/api/completed', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then(res => {
          console.log(res)

      })
      .catch(err => {
          console.log(err)
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
          console.log(err)
      })

}

const changeSituation = e => {

  e.persist();
  const idStatus = e.target.value.split(',')
  var status = null
  if (idStatus[1] === 'true') {
      status = true
  } else {
      status = false
  }
  axios.put('/api/pending', {ids: idStatus[0], _user: idStatus[2], situation: idStatus[3]})
      .then(res => {


          console.log(res)

      })
      .catch(err => {
          console.log(err)
      })
      axios.get('/api/tenants-issues')
      .then(res => {
          setIssues(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  
}


  return (
    <div>
            <Route exact path='/register' render= {(props) => { return <Register  {...props} />}} />
            <Route exact path='/login' render= {(props) => { return <Login  {...props}  />}} />
            <Route exact path='/tenant-dashboard' render= {(props) => { return <TenantDashboard tenant={tenant} {...props}  />}} />
            <Route exact path='/landlord-dashboard' render= {(props) => { return <LandlordDashboard changeSituation={changeSituation} changeCompleted={changeCompleted} changeRecieved={changeRecieved} landlord={landlord} issues={issues} {...props}  />}} />
            <Route exact path='/role' render= {(props) => { return <Role  {...props}  />}} />
            <Route exact path='/landlord-pick' render= {(props) => { return <LandlordPick  {...props}  />}} />
            <Route exact path='/settings' render= {(props) => { return <Setting {...props} />}} />

    </div>
  );
}

export default App;
